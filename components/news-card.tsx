'use client';

import { Calendar, ExternalLink } from 'lucide-react';
import { TechNews } from '@/lib/news-api';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

interface NewsCardProps {
  news: TechNews;
}

export default function NewsCard({ news }: NewsCardProps) {
  const date = new Date(news.publishedAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Also show time if available
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-neutral-800 bg-neutral-900/50 backdrop-blur transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10">
      {news.imageUrl && (
        <div className="relative aspect-video flex-shrink-0 overflow-hidden">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              // Hide image on error
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
        </div>
      )}

      <CardHeader className="flex-shrink-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {news.category && (
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
              {news.category}
            </Badge>
          )}
          {news.source && (
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
              {news.source}
            </Badge>
          )}
        </div>

        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-white transition-colors group-hover:text-emerald-500"
        >
          <h3 className="line-clamp-2 text-xl leading-tight">{news.title}</h3>
        </a>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="line-clamp-3 text-sm text-neutral-400">{news.description}</p>
      </CardContent>

      <CardFooter className="mt-auto flex-shrink-0 items-center justify-between border-t border-neutral-800 pt-4">
        <div className="flex flex-col text-xs text-neutral-500">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {formattedDate}
          </div>
          <div className="ml-4 text-[10px] text-neutral-600">{formattedTime}</div>
        </div>

        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm font-medium text-emerald-500 transition-transform group-hover:translate-x-1"
        >
          Read more <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      </CardFooter>
    </Card>
  );
}

