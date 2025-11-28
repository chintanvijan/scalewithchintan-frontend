'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import BlogCard from '@/components/blog-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAllPosts, searchPosts, getAllCategories, getAllTags } from '@/lib/blog-api';
import { BlogPost, Category, Tag } from '@/lib/supabase';
import { trackSearch, trackCategoryClick, trackTagClick } from '@/lib/analytics';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [allPosts, allCategories, allTags] = await Promise.all([
          getAllPosts(),
          getAllCategories(),
          getAllTags(),
        ]);
        setPosts(allPosts);
        setCategories(allCategories);
        setTags(allTags);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLoading(true);
      trackSearch(searchQuery);
      try {
        const results = await searchPosts(searchQuery);
        setPosts(results);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory && post.category?.slug !== selectedCategory) return false;
    if (selectedTag && !post.tags?.some((tag) => tag.slug === selectedTag)) return false;
    return true;
  });

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug === selectedCategory ? null : slug);
    trackCategoryClick(categories.find((c) => c.slug === slug)?.name || slug);
  };

  const handleTagClick = (slug: string) => {
    setSelectedTag(slug === selectedTag ? null : slug);
    trackTagClick(tags.find((t) => t.slug === slug)?.name || slug);
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Technical Articles
          </h1>
          <p className="text-lg text-neutral-400">
            Explore in-depth guides on system design, architecture, and scalability
          </p>
        </div>

        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search articles by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 border-neutral-800 bg-neutral-900/50 pl-12 text-white placeholder:text-neutral-500 focus:border-emerald-500"
            />
          </form>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.slug ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryClick(category.slug)}
              className={
                selectedCategory === category.slug
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'border-neutral-700 text-neutral-300 hover:border-emerald-500 hover:text-emerald-500'
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        {selectedTag && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-neutral-400">Filtered by tag:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
            >
              #{tags.find((t) => t.slug === selectedTag)?.name}
            </Button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-500" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-neutral-400">
              No articles found. Try adjusting your filters.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
