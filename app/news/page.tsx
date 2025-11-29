import { Metadata } from 'next';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import LazyNewsCard from '@/components/lazy-news-card';
import { getLatestTechNews, TechNews } from '@/lib/news-api';
import { RefreshCw } from 'lucide-react';

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'Latest Tech News | Scale with Chintan',
  description: 'Stay updated with the latest technology news, trends, and updates from the tech world.',
};

export default async function NewsPage() {
  let news: TechNews[] = [];
  let error: string | null = null;

  try {
    news = await getLatestTechNews(200);
  } catch (err) {
    console.error('Error fetching news:', err);
    error = err instanceof Error ? err.message : 'Failed to fetch news';
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Latest Tech News
          </h1>
          <p className="text-lg text-neutral-400">
            Stay updated with the latest technology news, trends, and updates from around the world
          </p>
        </div>

        {error && (
          <div className="mb-8 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-center">
            <p className="text-red-400">
              Error loading news: {error}
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              Please check your Redis connection and ensure news data is available.
            </p>
          </div>
        )}

        {!error && news.length === 0 && (
          <div className="py-20 text-center">
            <RefreshCw className="mx-auto mb-4 h-12 w-12 animate-spin text-neutral-400" />
            <p className="text-lg text-neutral-400">
              No news available at the moment.
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              News data will appear here once it&apos;s available in Redis.
            </p>
          </div>
        )}

        {news.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <LazyNewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

