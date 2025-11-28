# Troubleshooting: Tables Not Getting Created

## Quick Diagnostic

First, test your Supabase connection:

```bash
npm run test:supabase
```

This will tell you:
- ✅ If your environment variables are set correctly
- ✅ If you can connect to Supabase
- ✅ Which tables exist and which don't

## Common Issues & Solutions

### Issue 1: "Could not find the table in schema cache"

**Cause:** Tables were created but PostgREST cache wasn't refreshed.

**Solution:**
1. Go to Supabase Dashboard → **Settings** → **API**
2. Click **"Restart API"** button
3. Wait 30 seconds
4. Try again

### Issue 2: Migration SQL fails with errors

**Possible causes:**
- Permission issues
- Syntax errors
- Tables already partially exist

**Solution - Use the simplified migration:**
1. Open `supabase/migrations/20251128233927_initial_schema_simple.sql`
2. Copy and run **ONE STEP AT A TIME** in Supabase SQL Editor
3. If a step fails, check the error message
4. Continue with the next step only if the previous one succeeded

### Issue 3: Environment variables not set

**Check:**
```bash
# Make sure you have .env.local file
cat .env.local
```

**Should contain:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Get these from:**
- Supabase Dashboard → **Settings** → **API**
- Copy the "Project URL" and "anon public" key

### Issue 4: Wrong Supabase project

**Verify:**
1. Check your `.env.local` file
2. Make sure the URL matches your current Supabase project
3. If you created a new project, update the credentials

### Issue 5: RLS Policies blocking access

**If tables exist but you can't query them:**
1. Go to Supabase Dashboard → **Table Editor**
2. Check if tables are visible
3. If visible, the issue is RLS policies
4. Run the RLS policy section of the migration again

## Step-by-Step Manual Fix

### Option A: Run Full Migration (Recommended)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Copy Migration SQL**
   - Open: `supabase/migrations/20251128233927_initial_schema.sql`
   - Copy **ALL** content (Ctrl+A, Ctrl+C)

4. **Paste and Run**
   - Paste into SQL Editor
   - Click "Run" button
   - **Check for errors** - if you see red errors, note them

5. **If errors occur:**
   - Try the simplified migration instead (see Option B)

6. **Restart API** (CRITICAL!)
   - Go to **Settings** → **API**
   - Click **"Restart API"**
   - Wait 30 seconds

7. **Verify**
   - Go to **Table Editor**
   - You should see: categories, tags, blog_posts, post_tags, post_views

### Option B: Run Simplified Migration (If Option A Fails)

1. Open `supabase/migrations/20251128233927_initial_schema_simple.sql`
2. Copy **STEP 1** only
3. Run it in SQL Editor
4. If successful, continue with STEP 2
5. Repeat for each step
6. This helps identify which step is failing

### Option C: Check What Already Exists

Run this in SQL Editor to see what tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

## Still Not Working?

1. **Check Supabase Dashboard Logs**
   - Go to **Logs** → **Postgres Logs**
   - Look for error messages

2. **Verify Database Connection**
   - Run: `npm run test:supabase`
   - Share the output if it shows errors

3. **Check Migration History**
   - In Supabase Dashboard, go to **Database** → **Migrations**
   - See if any migrations were applied

4. **Try Creating a Table Manually**
   - In SQL Editor, run:
   ```sql
   CREATE TABLE test_table (id uuid PRIMARY KEY DEFAULT gen_random_uuid());
   ```
   - If this fails, you have a permission issue
   - Contact Supabase support or check your project settings

## Getting Help

If nothing works, provide:
1. Output of `npm run test:supabase`
2. Any error messages from SQL Editor
3. Screenshot of Table Editor showing what tables exist
4. Your Supabase project region and plan (free/paid)

