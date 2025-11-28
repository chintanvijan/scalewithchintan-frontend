# Setup Instructions - Database Tables

## ⚠️ Problem: Tables Not Getting Created

The issue is likely one of these:
1. Missing `.env.local` file with Supabase credentials
2. Migration SQL hasn't been run in Supabase Dashboard
3. API cache needs to be refreshed after migration

## Step 1: Set Up Environment Variables

### Create `.env.local` file:

1. **Copy the example file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Get your Supabase credentials:**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Go to **Settings** → **API**
   - Copy the following:
     - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
     - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Edit `.env.local` and paste your credentials:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Test the connection:**
   ```bash
   npm run test:supabase
   ```
   
   You should see:
   - ✅ Environment variables found
   - ⚠️ Connection works, but tables don't exist yet (if tables aren't created)
   - OR ✅ Tables exist! (if migration was already run)

## Step 2: Run the Database Migration

### Option A: Full Migration (Recommended)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click **SQL Editor** in left sidebar
   - Click **New Query**

3. **Copy the Migration SQL**
   - Open file: `supabase/migrations/20251128233927_initial_schema.sql`
   - Select ALL content (Ctrl+A / Cmd+A)
   - Copy (Ctrl+C / Cmd+C)

4. **Paste and Run**
   - Paste into SQL Editor
   - Click **Run** button (or press Ctrl+Enter)
   - **Wait for "Success" message**

5. **If you see errors:**
   - Note the error message
   - Try Option B (Simplified Migration) instead

### Option B: Simplified Migration (If Option A Fails)

1. Open `supabase/migrations/20251128233927_initial_schema_simple.sql`
2. Copy **STEP 1** only
3. Run it in SQL Editor
4. If successful, continue with STEP 2
5. Repeat for each step (10 steps total)

## Step 3: Refresh API Cache (CRITICAL!)

**This step is ESSENTIAL - without it, your app won't see the tables!**

1. In Supabase Dashboard, go to **Settings** (gear icon)
2. Click **API** in the left menu
3. Scroll down to find **"Restart API"** button
4. Click **"Restart API"**
5. **Wait 30 seconds** for it to restart

## Step 4: Verify Tables Were Created

1. Go to **Table Editor** in Supabase Dashboard
2. You should see these tables:
   - ✅ `categories` (should have 5 rows)
   - ✅ `tags` (should have 10 rows)
   - ✅ `blog_posts` (empty)
   - ✅ `post_tags` (empty)
   - ✅ `post_views` (empty)

3. **Test again:**
   ```bash
   npm run test:supabase
   ```
   
   Should now show: ✅ Tables exist!

## Step 5: Restart Your Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

Your app should now work! 🎉

## Troubleshooting

### "Missing environment variables" error
- Make sure `.env.local` exists and has correct values
- Restart your terminal/IDE after creating `.env.local`

### "Could not find table in schema cache" error
- You forgot Step 3 (Restart API) - go back and do it!
- Wait 30 seconds after restarting API

### Migration SQL errors
- Check the error message in SQL Editor
- Try the simplified migration (Option B)
- Make sure you're copying the ENTIRE SQL content

### Still not working?
- See `TROUBLESHOOTING.md` for more help
- Run `npm run test:supabase` and share the output

## Quick Checklist

- [ ] Created `.env.local` with Supabase credentials
- [ ] Tested connection with `npm run test:supabase`
- [ ] Ran migration SQL in Supabase Dashboard
- [ ] Clicked "Restart API" in Settings → API
- [ ] Verified tables exist in Table Editor
- [ ] Restarted dev server

