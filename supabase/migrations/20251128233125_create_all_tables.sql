/*
  # Complete Blog Platform Schema

  ## Overview
  Complete blog schema for a technical blog platform featuring system design,
  software architecture, and scalability content.

  ## Tables Created

  ### `categories`
  - `id` (uuid, primary key)
  - `name` (text, unique) - Category name (e.g., "System Design")
  - `slug` (text, unique) - URL-friendly slug
  - `description` (text) - Category description
  - `created_at` (timestamptz) - Creation timestamp

  ### `tags`
  - `id` (uuid, primary key)
  - `name` (text, unique) - Tag name
  - `slug` (text, unique) - URL-friendly slug
  - `created_at` (timestamptz) - Creation timestamp

  ### `blog_posts`
  - `id` (uuid, primary key)
  - `title` (text) - Post title
  - `slug` (text, unique) - URL-friendly slug
  - `excerpt` (text) - Short description for SEO
  - `content` (text) - Full markdown/HTML content
  - `cover_image` (text) - Cover image URL
  - `author_name` (text) - Author name
  - `author_bio` (text) - Author bio
  - `author_avatar` (text) - Author avatar URL
  - `category_id` (uuid, foreign key) - Category reference
  - `reading_time` (integer) - Estimated reading time in minutes
  - `published` (boolean) - Publication status
  - `featured` (boolean) - Featured post flag
  - `views` (integer) - View count
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `meta_title` (text) - SEO meta title
  - `meta_description` (text) - SEO meta description
  - `meta_keywords` (text[]) - SEO keywords array

  ### `post_tags`
  - `post_id` (uuid, foreign key) - Blog post reference
  - `tag_id` (uuid, foreign key) - Tag reference
  - Primary key: (post_id, tag_id)

  ### `post_views`
  - `id` (uuid, primary key)
  - `post_id` (uuid, foreign key) - Blog post reference
  - `viewed_at` (timestamptz) - View timestamp
  - `user_agent` (text) - User agent string
  - `ip_hash` (text) - Hashed IP for analytics

  ## Security
  - Enable RLS on all tables
  - Public read access for published content
  - Authenticated write access for content management

  ## Important Notes
  1. All tables use UUID primary keys with automatic generation
  2. Timestamps default to current time
  3. Indexes added for common query patterns
  4. Full-text search capabilities on blog posts
*/

-- Ensure we're using the public schema
SET search_path TO public;

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS public.tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  cover_image text DEFAULT '',
  author_name text DEFAULT 'Chintan',
  author_bio text DEFAULT '',
  author_avatar text DEFAULT '',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  reading_time integer DEFAULT 5,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  views integer DEFAULT 0,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  meta_title text DEFAULT '',
  meta_description text DEFAULT '',
  meta_keywords text[] DEFAULT '{}'::text[]
);

-- Create post_tags junction table
CREATE TABLE IF NOT EXISTS public.post_tags (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create post_views table for analytics
CREATE TABLE IF NOT EXISTS public.post_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  viewed_at timestamptz DEFAULT now(),
  user_agent text DEFAULT '',
  ip_hash text DEFAULT ''
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_tags_post ON post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON post_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_post_views_post ON post_views(post_id);

-- Add full-text search index
CREATE INDEX IF NOT EXISTS idx_blog_posts_search ON blog_posts 
  USING gin(to_tsvector('english', title || ' ' || excerpt || ' ' || content));

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Categories can be managed by authenticated users"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for tags
CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Tags can be managed by authenticated users"
  ON tags FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for blog_posts
CREATE POLICY "Published posts are viewable by everyone"
  ON blog_posts FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "All posts are viewable by authenticated users"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Posts can be inserted by authenticated users"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Posts can be updated by authenticated users"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Posts can be deleted by authenticated users"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for post_tags
CREATE POLICY "Post tags are viewable by everyone"
  ON post_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Post tags can be managed by authenticated users"
  ON post_tags FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for post_views
CREATE POLICY "Post views can be created by everyone"
  ON post_views FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Post views are viewable by authenticated users"
  ON post_views FOR SELECT
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to increment post views
CREATE OR REPLACE FUNCTION increment_post_views(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
  ('System Design', 'system-design', 'Architecture and design patterns for scalable systems'),
  ('Software Architecture', 'software-architecture', 'Best practices and patterns in software architecture'),
  ('Scalability', 'scalability', 'Techniques and strategies for building scalable applications'),
  ('Tech Stack', 'tech-stack', 'Deep dives into technologies and frameworks'),
  ('Best Practices', 'best-practices', 'Industry best practices and coding standards')
ON CONFLICT (slug) DO NOTHING;

-- Insert default tags
INSERT INTO tags (name, slug) VALUES
  ('Microservices', 'microservices'),
  ('Distributed Systems', 'distributed-systems'),
  ('Cloud Architecture', 'cloud-architecture'),
  ('Performance', 'performance'),
  ('Database', 'database'),
  ('API Design', 'api-design'),
  ('DevOps', 'devops'),
  ('Kubernetes', 'kubernetes'),
  ('Load Balancing', 'load-balancing'),
  ('Caching', 'caching')
ON CONFLICT (slug) DO NOTHING;

-- IMPORTANT: After running this migration, refresh the PostgREST schema cache
-- Go to: Supabase Dashboard > Settings > API > Restart API
-- Or wait 10-30 seconds for automatic refresh
