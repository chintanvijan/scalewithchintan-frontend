# Database Migration Instructions

## Quick Fix: Apply Migration via Supabase Dashboard

The error `Could not find the table 'public.categories' in the schema cache` means either:
1. The tables haven't been created yet, OR
2. PostgREST's schema cache needs to be refreshed (most common after creating tables)

### Steps:

1. **Open your Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Copy the Migration SQL**
   - Open the file: `supabase/migrations/20251128233125_create_all_tables.sql`
   - Copy ALL the contents (Ctrl+C / Cmd+C)

4. **Paste and Run**
   - Paste the SQL into the SQL Editor
   - Click the "Run" button (or press Ctrl+Enter / Cmd+Enter)

5. **Refresh PostgREST Schema Cache** (IMPORTANT!)
   - After running the migration, you MUST refresh the API schema cache
   - Go to: **Settings** → **API** → Click **"Restart API"** button
   - OR wait 10-30 seconds for automatic refresh
   - This fixes the "Could not find the table in the schema cache" error

6. **Verify**
   - Go to "Table Editor" in the left sidebar
   - You should see these tables:
     - `categories`
     - `tags`
     - `blog_posts`
     - `post_tags`
     - `post_views`

## What This Migration Creates

- ✅ 5 tables (categories, tags, blog_posts, post_tags, post_views)
- ✅ All necessary indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Default categories and tags
- ✅ Helper functions (update_updated_at_column, increment_post_views)

## Alternative: Using Supabase CLI (if installed)

If you have Supabase CLI installed:

```bash
supabase db push
```

This will apply all migrations in the `supabase/migrations/` folder.

