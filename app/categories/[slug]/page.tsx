import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import BlogCard from '@/components/blog-card';
import { Button } from '@/components/ui/button';
import { getPostsByCategory, getAllCategories } from '@/lib/blog-api';

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const posts = await getPostsByCategory(params.slug);
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return (
      <div className="flex min-h-screen flex-col bg-neutral-950">
        <Navigation />
        <div className="flex-grow mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">Category Not Found</h1>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
            <Link href="/categories">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950">
      <Navigation />

      <main className="flex-grow mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-neutral-400 hover:text-emerald-500"
        >
          <Link href="/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Categories
          </Link>
        </Button>

        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            {category.name}
          </h1>
          <p className="text-lg text-neutral-400">{category.description}</p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-neutral-400">
              No articles in this category yet.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
