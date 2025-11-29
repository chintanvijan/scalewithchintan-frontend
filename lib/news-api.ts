import { getRedisClient } from './redis';

export interface NewsArticle {
  article_id: string;
  link: string;
  title: string;
  description: string;
  content?: string;
  keywords?: string[];
  creator?: string[];
  language?: string;
  country?: string[];
  category?: string[];
  datatype?: string;
  pubDate: string;
  pubDateTZ?: string;
  image_url?: string | null;
  video_url?: string | null;
  source_id?: string;
  source_name?: string;
  source_priority?: number;
  source_url?: string;
  source_icon?: string;
  sentiment?: string;
  sentiment_stats?: string;
  ai_tag?: string;
  ai_region?: string;
  ai_org?: string;
  ai_summary?: string;
  duplicate?: boolean;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage?: string | null;
}

export interface TechNews {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string | null;
  category?: string;
  keywords?: string[];
  creator?: string[];
}

/**
 * Convert NewsArticle to TechNews format for display
 */
function convertArticleToTechNews(article: NewsArticle): TechNews {
  return {
    id: article.article_id,
    title: article.title,
    description: article.description,
    url: article.link,
    source: article.source_name || article.source_id || 'Unknown',
    publishedAt: article.pubDate,
    imageUrl: article.image_url || undefined,
    category: article.category?.[0] || article.category?.join(', ') || undefined,
    keywords: article.keywords,
    creator: article.creator,
  };
}

/**
 * Fetch latest tech news from Redis
 * Expects news to be stored as a JSON response with structure:
 * { status: "success", totalResults: number, results: NewsArticle[], nextPage: string | null }
 */
export async function getLatestTechNews(limit: number = 200): Promise<TechNews[]> {
  const redis = await getRedisClient();
  
  try {

    // Try multiple strategies to fetch news from Redis
    let news: TechNews[] = [];

    // Strategy 1: Check for news stored as a JSON response object with key 'tech_news'
    const newsDataKey = 'newsdata:technology:latest200';
    const newsData = await redis.get(newsDataKey);
    if (newsData) {
      try {
        const parsed = JSON.parse(newsData) as NewsResponse;
        if (parsed.status === 'success' && parsed.results && Array.isArray(parsed.results)) {
          news = parsed.results
            .slice(0, limit)
            .map(convertArticleToTechNews);
        } else if (Array.isArray(parsed)) {
          // Fallback: if it's just an array of articles
          news = parsed
            .slice(0, limit)
            .map((item: NewsArticle) => convertArticleToTechNews(item));
        }
      } catch (error) {
        console.error('Error parsing news data:', error);
      }
    }

    // Strategy 2: Check if news is stored as a sorted set (by timestamp)
    if (news.length === 0) {
      const sortedSetKey = 'tech_news:sorted';
      const sortedNews = await redis.zRange(sortedSetKey, 0, limit - 1, { REV: true });
      if (sortedNews && sortedNews.length > 0) {
        news = sortedNews
          .map((item) => {
            try {
              const parsed = JSON.parse(item as string);
              // Check if it's a NewsResponse or NewsArticle
              if (parsed.results && Array.isArray(parsed.results)) {
                return parsed.results.map(convertArticleToTechNews);
              } else if (parsed.article_id || parsed.link) {
                return convertArticleToTechNews(parsed as NewsArticle);
              }
              return null;
            } catch {
              return null;
            }
          })
          .filter((item): item is TechNews | TechNews[] => item !== null)
          .flat()
          .slice(0, limit);
      }
    }

    // Strategy 3: Check if news is stored as a list
    if (news.length === 0) {
      const listKey = 'tech_news:list';
      const listNews = await redis.lRange(listKey, 0, limit - 1);
      if (listNews && listNews.length > 0) {
        news = listNews
          .map((item) => {
            try {
              const parsed = JSON.parse(item as string);
              if (parsed.results && Array.isArray(parsed.results)) {
                return parsed.results.map(convertArticleToTechNews);
              } else if (parsed.article_id || parsed.link) {
                return convertArticleToTechNews(parsed as NewsArticle);
              }
              return null;
            } catch {
              return null;
            }
          })
          .filter((item): item is TechNews | TechNews[] => item !== null)
          .flat()
          .slice(0, limit);
      }
    }

    // Strategy 4: Check if news is stored as individual keys with pattern 'news:*'
    if (news.length === 0) {
      const newsKeys = await redis.keys('news:*');
      if (newsKeys && newsKeys.length > 0) {
        const newsDataArray = await redis.mGet(newsKeys.slice(0, limit));
        news = newsDataArray
          .map((item) => {
            if (!item) return null;
            try {
              const parsed = JSON.parse(item);
              if (parsed.results && Array.isArray(parsed.results)) {
                return parsed.results.map(convertArticleToTechNews);
              } else if (parsed.article_id || parsed.link) {
                return convertArticleToTechNews(parsed as NewsArticle);
              }
              return null;
            } catch {
              return null;
            }
          })
          .filter((item): item is TechNews | TechNews[] => item !== null)
          .flat()
          .slice(0, limit);
      }
    }

    if (news.length === 0) {
      console.warn('No news found in Redis. Returning empty array.');
      return [];
    }

    return news;
  } catch (error) {
    console.error('Error fetching news from Redis:', error);
    throw error;
  }
}

/**
 * Store tech news in Redis
 * This can be used by a background job or API to populate news
 * Accepts either NewsResponse format or array of NewsArticle
 */
export async function storeTechNews(
  news: NewsResponse | NewsArticle[],
  key: string = 'tech_news'
): Promise<void> {
  const redis = await getRedisClient();
  
  try {
    // Convert to NewsResponse format if needed
    let newsResponse: NewsResponse;
    if (Array.isArray(news)) {
      newsResponse = {
        status: 'success',
        totalResults: news.length,
        results: news,
        nextPage: null,
      };
    } else {
      newsResponse = news;
    }

    // Store as JSON string
    await redis.set(key, JSON.stringify(newsResponse));

    // Also store as sorted set for time-based queries
    const sortedSetKey = 'tech_news:sorted';
    const multi = redis.multi();

    // Clear existing news
    multi.del(sortedSetKey);

    // Add news items with timestamp as score
    for (const article of newsResponse.results) {
      const score = new Date(article.pubDate).getTime();
      multi.zAdd(sortedSetKey, {
        score,
        value: JSON.stringify(article),
      });
    }

    await multi.exec();
  } catch (error) {
    console.error('Error storing news in Redis:', error);
    throw error;
  }
}

