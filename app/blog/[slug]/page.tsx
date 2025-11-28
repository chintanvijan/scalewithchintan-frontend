import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import BlogPostClient from '@/components/blog-post-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getPostBySlug, getAllPosts } from '@/lib/blog-api';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/markdown-content';

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.meta_keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
      images: post.cover_image ? [post.cover_image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scalewithchintan.com';
  const shareUrl = `${baseUrl}/blog/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.author_name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Scale with Chintan',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-neutral-400 hover:text-emerald-500"
        >
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {post.cover_image && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <img
              src={
                post.cover_image.startsWith('data:image/') ||
                post.cover_image.startsWith('http://') ||
                post.cover_image.startsWith('https://')
                  ? post.cover_image
                  : `data:image/png;base64,${post.cover_image}`
              }
              alt={post.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center gap-3">
          {post.category && (
            <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
              {post.category.name}
            </Badge>
          )}
          {post.featured && (
            <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
              Featured
            </Badge>
          )}
        </div>

        <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
          {post.title}
        </h1>

        <p className="mb-8 text-xl text-neutral-400">{post.excerpt}</p>

        <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-t border-neutral-800 py-4 text-sm text-neutral-400">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {formattedDate}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {post.reading_time} min read
          </div>
          <div className="ml-auto">
            <BlogPostClient
              postId={post.id}
              slug={post.slug}
              title={post.title}
              readingTime={post.reading_time}
              shareUrl={shareUrl}
              shareTitle={shareTitle}
            />
          </div>
        </div>

        <div className="markdown-content">
          <MarkdownContent content={post.content} />
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 border-t border-neutral-800 pt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tags/${tag.slug}`}
                  className="rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-emerald-500 hover:text-emerald-500"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {post.author_name && (
          <div className="mt-12 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
            <div className="flex items-start gap-4">
              {post.author_avatar && (
                <img
                  src={post.author_avatar}
                  alt={post.author_name}
                  className="h-16 w-16 rounded-full"
                />
              )}
              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Written by {post.author_name}
                </h3>
                {post.author_bio && (
                  <p className="text-sm text-neutral-400">{post.author_bio}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
