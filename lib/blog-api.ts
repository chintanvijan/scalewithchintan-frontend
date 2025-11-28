import { supabase, BlogPost, Category, Tag } from './supabase';

export async function getAllPosts(published: boolean = true): Promise<BlogPost[]> {
  const query = supabase
    .from('blog_posts')
    .select(`
      *,
      category:categories(*),
      tags:post_tags(tag:tags(*))
    `)
    .order('published_at', { ascending: false });

  if (published) {
    query.eq('published', true);
  }

  const { data, error } = await query;

  if (error) throw error;

  return (data || []).map((post: any) => ({
    ...post,
    tags: post.tags?.map((pt: any) => pt.tag) || [],
  }));
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:categories(*),
      tags:post_tags(tag:tags(*))
    `)
    .eq('published', true)
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(3);

  if (error) throw error;

  return (data || []).map((post: any) => ({
    ...post,
    tags: post.tags?.map((pt: any) => pt.tag) || [],
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:categories(*),
      tags:post_tags(tag:tags(*))
    `)
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    ...data,
    tags: data.tags?.map((pt: any) => pt.tag) || [],
  };
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .maybeSingle();

  if (!category) return [];

  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:categories(*),
      tags:post_tags(tag:tags(*))
    `)
    .eq('category_id', category.id)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((post: any) => ({
    ...post,
    tags: post.tags?.map((pt: any) => pt.tag) || [],
  }));
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  const { data: tag } = await supabase
    .from('tags')
    .select('id')
    .eq('slug', tagSlug)
    .maybeSingle();

  if (!tag) return [];

  const { data: postTags, error } = await supabase
    .from('post_tags')
    .select(`
      post:blog_posts(
        *,
        category:categories(*),
        tags:post_tags(tag:tags(*))
      )
    `)
    .eq('tag_id', tag.id);

  if (error) throw error;

  return (postTags || [])
    .map((pt: any) => pt.post)
    .filter((post: any) => post && post.published)
    .map((post: any) => ({
      ...post,
      tags: post.tags?.map((pt: any) => pt.tag) || [],
    }));
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:categories(*),
      tags:post_tags(tag:tags(*))
    `)
    .eq('published', true)
    .textSearch('title', query, { type: 'websearch' })
    .order('published_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((post: any) => ({
    ...post,
    tags: post.tags?.map((pt: any) => pt.tag) || [],
  }));
}

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function getAllTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function incrementPostViews(postId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_post_views', { post_id: postId });
  if (error) console.error('Error incrementing views:', error);
}

export async function trackPostView(postId: string, userAgent: string, ipHash: string): Promise<void> {
  const { error } = await supabase
    .from('post_views')
    .insert({
      post_id: postId,
      user_agent: userAgent,
      ip_hash: ipHash,
    });

  if (error) console.error('Error tracking view:', error);
}
