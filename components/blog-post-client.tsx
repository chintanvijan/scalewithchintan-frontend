'use client';

import { useEffect } from 'react';
import { Twitter, Linkedin, Facebook } from 'lucide-react';
import { Button } from './ui/button';
import { trackBlogView, trackShareClick, trackBlogRead } from '@/lib/analytics';
import { trackPostView } from '@/lib/blog-api';

interface BlogPostClientProps {
  postId: string;
  slug: string;
  title: string;
  readingTime: number;
  shareUrl: string;
  shareTitle: string;
}

export default function BlogPostClient({
  postId,
  slug,
  title,
  readingTime,
  shareUrl,
  shareTitle,
}: BlogPostClientProps) {
  useEffect(() => {
    trackBlogView(slug, title);

    const userAgent = navigator.userAgent;
    const ipHash = 'anonymous';
    trackPostView(postId, userAgent, ipHash);

    const readTimeout = setTimeout(() => {
      trackBlogRead(slug, title, readingTime);
    }, readingTime * 60 * 1000);

    return () => clearTimeout(readTimeout);
  }, [postId, slug, title, readingTime]);

  const handleShare = (platform: string, url: string) => {
    trackShareClick(platform, slug);
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-neutral-500">Share:</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          handleShare(
            'Twitter',
            `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`
          )
        }
        className="h-8 w-8 text-neutral-400 hover:text-emerald-500"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          handleShare(
            'LinkedIn',
            `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
          )
        }
        className="h-8 w-8 text-neutral-400 hover:text-emerald-500"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          handleShare(
            'Facebook',
            `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
          )
        }
        className="h-8 w-8 text-neutral-400 hover:text-emerald-500"
      >
        <Facebook className="h-4 w-4" />
      </Button>
    </div>
  );
}
