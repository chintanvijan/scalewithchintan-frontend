'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase, Category } from '@/lib/supabase';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    category_id: '',
    reading_time: 5,
    published: false,
    featured: false,
    meta_title: '',
    meta_description: '',
  });
  const [publishedAt, setPublishedAt] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
    loadPost();
  }, [postId]);

  const loadCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories(data || []);
  };

  const loadPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          cover_image: data.cover_image || '',
          category_id: data.category_id || '',
          reading_time: data.reading_time || 5,
          published: data.published || false,
          featured: data.featured || false,
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
        });
        setPublishedAt(data.published_at || null);
        
        // Set image preview if cover_image exists
        if (data.cover_image) {
          if (data.cover_image.startsWith('data:image/') || data.cover_image.startsWith('http://') || data.cover_image.startsWith('https://')) {
            setImagePreview(data.cover_image);
          }
        }
      }
    } catch (error) {
      console.error('Error loading post:', error);
      alert('Failed to load post');
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
      meta_title: formData.meta_title || title,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData({ ...formData, cover_image: base64String });
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, cover_image: url });
    // Check if it's a base64 string or URL
    if (url.startsWith('data:image/')) {
      setImagePreview(url);
    } else if (url.startsWith('http://') || url.startsWith('https://')) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const clearImage = () => {
    setFormData({ ...formData, cover_image: '' });
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updateData: any = {
        ...formData,
        updated_at: new Date().toISOString(),
      };

      // Only update published_at if publishing for the first time
      if (formData.published && !publishedAt) {
        updateData.published_at = new Date().toISOString();
      } else if (!formData.published) {
        updateData.published_at = null;
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', postId);

      if (error) throw error;

      alert('Post updated successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950">
        <Navigation />
        <main className="mx-auto flex max-w-4xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-500" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-neutral-400 hover:text-emerald-500"
        >
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <h1 className="mb-10 text-3xl font-bold text-white">Edit Post</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="border-neutral-800 bg-neutral-900/50 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-white">
              Slug
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="border-neutral-800 bg-neutral-900/50 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-white">
              Excerpt
            </Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
              rows={3}
              className="border-neutral-800 bg-neutral-900/50 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-white">
              Content (HTML or Markdown)
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={15}
              className="border-neutral-800 bg-neutral-900/50 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover_image" className="text-white">
              Cover Image
            </Label>
            <div className="space-y-3">
              <div className="flex gap-3">
                <label className="flex flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-neutral-700 text-white hover:bg-neutral-900"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </label>
                {imagePreview && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearImage}
                    className="border-neutral-700 text-white hover:bg-neutral-900"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Input
                id="cover_image"
                value={formData.cover_image}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                placeholder="Or paste image URL or base64 string"
                className="border-neutral-800 bg-neutral-900/50 text-white"
              />
              {imagePreview && (
                <div className="relative mt-3 overflow-hidden rounded-lg border border-neutral-800">
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-white">
              Category
            </Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            >
              <SelectTrigger className="border-neutral-800 bg-neutral-900/50 text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="border-neutral-800 bg-neutral-900">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id} className="text-white">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reading_time" className="text-white">
              Reading Time (minutes)
            </Label>
            <Input
              id="reading_time"
              type="number"
              value={formData.reading_time}
              onChange={(e) => setFormData({ ...formData, reading_time: parseInt(e.target.value) || 5 })}
              className="border-neutral-800 bg-neutral-900/50 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description" className="text-white">
              Meta Description (SEO)
            </Label>
            <Textarea
              id="meta_description"
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              rows={2}
              className="border-neutral-800 bg-neutral-900/50 text-white"
            />
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
            />
            <Label htmlFor="published" className="text-white cursor-pointer">
              Published
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            />
            <Label htmlFor="featured" className="text-white cursor-pointer">
              Featured post
            </Label>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={saving}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin')}
              className="border-neutral-700 text-white hover:bg-neutral-900"
            >
              Cancel
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

