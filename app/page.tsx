import Link from 'next/link';
import { ArrowRight, Code2, Database, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import BlogCard from '@/components/blog-card';
import { getFeaturedPosts, getAllCategories } from '@/lib/blog-api';

export const revalidate = 3600;

export default async function Home() {
  const [featuredPosts, categories] = await Promise.all([
    getFeaturedPosts(),
    getAllCategories(),
  ]);

  const features = [
    {
      icon: Code2,
      title: 'System Design',
      description:
        'Deep dives into architectural patterns and design principles for building robust systems.',
    },
    {
      icon: Database,
      title: 'Software Architecture',
      description:
        'Explore best practices, patterns, and strategies for scalable software architecture.',
    },
    {
      icon: TrendingUp,
      title: 'Scalability',
      description:
        'Learn techniques to scale applications from thousands to millions of users.',
    },
    {
      icon: Zap,
      title: 'Performance',
      description:
        'Optimize your systems for speed, efficiency, and resource utilization.',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navigation />

      <main>
        <section className="relative overflow-hidden border-b border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-500">
                <Zap className="mr-2 h-4 w-4" />
                Engineering at Scale
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Master System Design &{' '}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Software Architecture
                </span>
              </h1>

              <p className="mb-10 text-lg text-neutral-400 sm:text-xl">
                Technical insights and practical guides for building scalable,
                reliable, and high-performance systems. Join thousands of
                engineers leveling up their architecture skills.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  <Link href="/blog">
                    Explore Articles <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-neutral-700 text-white hover:border-emerald-500 hover:bg-neutral-900"
                >
                  <Link href="/categories">Browse Topics</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-800 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
                >
                  <feature.icon className="mb-4 h-10 w-10 text-emerald-500 transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {featuredPosts.length > 0 && (
          <section className="border-b border-neutral-800 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Featured Articles
                  </h2>
                  <p className="mt-2 text-neutral-400">
                    Handpicked in-depth guides on system design and architecture
                  </p>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400"
                >
                  <Link href="/blog">
                    View all <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    featured={index === 0}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {categories.length > 0 && (
          <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-white">
                  Explore by Category
                </h2>
                <p className="mt-2 text-neutral-400">
                  Find articles organized by technical domain
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="group rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
                  >
                    <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-emerald-500">
                      {category.name}
                    </h3>
                    <p className="text-sm text-neutral-400">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-emerald-500">
                      Explore <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-neutral-800 bg-gradient-to-b from-neutral-950 to-neutral-900 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Level Up Your Architecture Skills?
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Join the community and get the latest articles delivered to your
              inbox.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-emerald-500 text-white hover:bg-emerald-600"
            >
              <Link href="/blog">
                Start Reading <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
