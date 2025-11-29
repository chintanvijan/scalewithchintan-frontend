'use client';

import { useEffect, useRef, useState } from 'react';
import NewsCard from './news-card';
import { TechNews } from '@/lib/news-api';
import { Skeleton } from './ui/skeleton';
import { Card } from './ui/card';

interface LazyNewsCardProps {
  news: TechNews;
}

export default function LazyNewsCard({ news }: LazyNewsCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Mark as loaded immediately when visible
            setHasLoaded(true);
            // Unobserve after loading to improve performance
            if (cardRef.current) {
              observer.unobserve(cardRef.current);
            }
          }
        });
      },
      {
        // Start loading when the card is 200px away from viewport
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={cardRef} className="flex h-full w-full">
      {isVisible && hasLoaded ? (
        <div className="h-full w-full animate-in fade-in duration-300">
          <NewsCard news={news} />
        </div>
      ) : (
        <Card className="flex h-full w-full flex-col overflow-hidden border-neutral-800 bg-neutral-900/50">
          <div className="relative aspect-video flex-shrink-0 overflow-hidden bg-neutral-800">
            <Skeleton className="h-full w-full bg-neutral-800" />
          </div>
          <div className="flex-shrink-0 p-6">
            <div className="mb-3 flex gap-2">
              <Skeleton className="h-6 w-20 bg-neutral-800" />
              <Skeleton className="h-6 w-16 bg-neutral-800" />
            </div>
            <Skeleton className="mb-2 h-6 w-full bg-neutral-800" />
            <Skeleton className="mb-2 h-6 w-3/4 bg-neutral-800" />
          </div>
          <div className="flex-grow p-6 pt-0">
            <Skeleton className="mb-2 h-4 w-full bg-neutral-800" />
            <Skeleton className="mb-2 h-4 w-full bg-neutral-800" />
            <Skeleton className="h-4 w-2/3 bg-neutral-800" />
          </div>
          <div className="mt-auto flex-shrink-0 border-t border-neutral-800 p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 bg-neutral-800" />
              <Skeleton className="h-4 w-20 bg-neutral-800" />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

