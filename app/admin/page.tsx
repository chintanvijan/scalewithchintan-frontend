'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, LogOut } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/supabase';

export default function AdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    loadPosts();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      loadPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="mt-2 text-neutral-400">
              Manage your blog posts
              {user?.email && (
                <span className="ml-2 text-xs text-neutral-500">
                  ({user.email})
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => (window.location.href = '/admin/new')}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-neutral-700 text-white hover:bg-neutral-900"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-500" />
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/50 p-6"
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {post.title}
                    </h3>
                    <Badge
                      variant={post.published ? 'default' : 'secondary'}
                      className={
                        post.published
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-neutral-700 text-neutral-300'
                      }
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </Badge>
                    {post.featured && (
                      <Badge className="bg-amber-500/10 text-amber-500">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-neutral-400">{post.excerpt}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-neutral-500">
                    <span>
                      Category: {post.category?.name || 'Uncategorized'}
                    </span>
                    <span>Views: {post.views}</span>
                    <span>
                      Created: {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="ml-4 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                    className="text-neutral-400 hover:text-emerald-500"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      (window.location.href = `/admin/edit/${post.id}`)
                    }
                    className="text-neutral-400 hover:text-emerald-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePublished(post.id, post.published)}
                    className="text-neutral-400 hover:text-emerald-500"
                  >
                    {post.published ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deletePost(post.id)}
                    className="text-neutral-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="mb-4 text-lg text-neutral-400">No posts yet</p>
            <Button
              onClick={() => (window.location.href = '/admin/new')}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Create your first post
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
