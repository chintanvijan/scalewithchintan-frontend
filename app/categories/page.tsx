import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { getAllCategories } from '@/lib/blog-api';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600;

export const metadata = {
  title: 'Categories',
  description: 'Browse technical articles by category',
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const { count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id)
        .eq('published', true);

      return { ...category, postCount: count || 0 };
    })
  );

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950">
      <Navigation />

      <main className="flex-grow mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Browse by Category
          </h1>
          <p className="text-lg text-neutral-400">
            Explore technical articles organized by domain
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesWithCounts.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group rounded-lg border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="mb-4 flex items-start justify-between">
                <FileText className="h-8 w-8 text-emerald-500 transition-transform group-hover:scale-110" />
                <span className="text-sm text-neutral-500">
                  {category.postCount} {category.postCount === 1 ? 'article' : 'articles'}
                </span>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-emerald-500">
                {category.name}
              </h2>

              <p className="mb-4 text-neutral-400">{category.description}</p>

              <div className="flex items-center text-sm font-medium text-emerald-500">
                Explore articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
