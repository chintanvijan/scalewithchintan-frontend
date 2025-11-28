-- Simplified Migration - Run this step by step if the full migration fails
-- Copy and run each section separately in Supabase SQL Editor

-- ============================================
-- STEP 1: Create Categories Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- STEP 2: Create Tags Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- STEP 3: Create Blog Posts Table
-- ============================================
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

-- ============================================
-- STEP 4: Create Post Tags Junction Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.post_tags (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- ============================================
-- STEP 5: Create Post Views Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.post_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  viewed_at timestamptz DEFAULT now(),
  user_agent text DEFAULT '',
  ip_hash text DEFAULT ''
);

-- ============================================
-- STEP 6: Create Indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_tags_post ON post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON post_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_post_views_post ON post_views(post_id);

-- ============================================
-- STEP 7: Enable Row Level Security
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 8: Create RLS Policies
-- ============================================
-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Categories can be managed by authenticated users"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Tags policies
CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Tags can be managed by authenticated users"
  ON tags FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog posts policies
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

-- Post tags policies
CREATE POLICY "Post tags are viewable by everyone"
  ON post_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Post tags can be managed by authenticated users"
  ON post_tags FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Post views policies
CREATE POLICY "Post views can be created by everyone"
  ON post_views FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Post views are viewable by authenticated users"
  ON post_views FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- STEP 9: Create Functions and Triggers
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION increment_post_views(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- STEP 10: Insert Default Data
-- ============================================
INSERT INTO categories (name, slug, description) VALUES
  ('System Design', 'system-design', 'Architecture and design patterns for scalable systems'),
  ('Software Architecture', 'software-architecture', 'Best practices and patterns in software architecture'),
  ('Scalability', 'scalability', 'Techniques and strategies for building scalable applications'),
  ('Tech Stack', 'tech-stack', 'Deep dives into technologies and frameworks'),
  ('Best Practices', 'best-practices', 'Industry best practices and coding standards')
ON CONFLICT (slug) DO NOTHING;

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

