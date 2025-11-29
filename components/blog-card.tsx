import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/supabase';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card
      className={`group flex h-full flex-col overflow-hidden border-neutral-800 bg-neutral-900/50 backdrop-blur transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {post.cover_image && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
        </div>
      )}

      <CardHeader className="flex-shrink-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {post.category && (
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
              {post.category.name}
            </Badge>
          )}
          {post.featured && (
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
              Featured
            </Badge>
          )}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3
            className={`font-bold text-white transition-colors group-hover:text-emerald-500 ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
          >
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className={`text-neutral-400 ${featured ? 'text-base' : 'text-sm'}`}>
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="text-xs text-neutral-500 transition-colors hover:text-emerald-500"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between border-t border-neutral-800 pt-4">
        <div className="flex items-center space-x-4 text-xs text-neutral-500">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {formattedDate}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {post.reading_time} min read
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="flex items-center text-sm font-medium text-emerald-500 transition-transform group-hover:translate-x-1"
        >
          Read more <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
