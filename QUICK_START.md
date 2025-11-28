# Quick Start - Database Setup

## ⚠️ Error: "Could not find the table 'public.blog_posts'"

This error means the database tables haven't been created yet. Follow these steps:

## Step 1: Run the Migration

1. **Open your Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click on **SQL Editor** in the left sidebar
   - Click **New Query**

3. **Run the Migration**
   - Open the file: `supabase/migrations/20251128233927_initial_schema.sql`
   - Copy **ALL** the SQL content (from `/*` to the end)
   - Paste it into the SQL Editor
   - Click **Run** (or press Cmd/Ctrl + Enter)
   - Wait for "Success" message

## Step 2: Refresh API Cache

**IMPORTANT:** After running the migration, you MUST refresh the PostgREST schema cache:

1. In Supabase Dashboard, go to **Settings** (gear icon)
2. Click on **API** in the left menu
3. Scroll down and click **Restart API** button
4. Wait 10-30 seconds for it to restart

## Step 3: Verify Tables Were Created

1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - ✅ `categories` (with 5 default categories)
   - ✅ `tags` (with 10 default tags)
   - ✅ `blog_posts`
   - ✅ `post_tags`
   - ✅ `post_views`

## Step 4: Restart Your Dev Server

After the migration is complete and API is restarted:

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## Troubleshooting

If you still see the error after following these steps:

1. **Double-check the migration ran successfully** - Look for any error messages in the SQL Editor
2. **Verify API restart** - Make sure you clicked "Restart API" and waited for it to complete
3. **Check environment variables** - Ensure your `.env.local` has:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. **Wait a bit longer** - Sometimes it takes 30-60 seconds for changes to propagate

