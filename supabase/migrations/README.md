# Database Migrations

## Running Migrations

### Option 1: Using Supabase Dashboard (Recommended for new accounts)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open the migration file: `20251128233927_initial_schema.sql`
5. Copy and paste the entire SQL content into the editor
6. Click **Run** to execute the migration
7. Wait for the migration to complete (you should see "Success" message)

### Option 2: Using Supabase CLI (if installed)

If you have Supabase CLI installed and linked to your project:

```bash
# Link your project (if not already linked)
supabase link --project-ref your-project-ref

# Run the migration
supabase db push
```

### After Running the Migration

1. **Refresh the PostgREST schema cache:**
   - Go to **Settings** > **API** in your Supabase dashboard
   - Click **Restart API** button
   - Or wait 10-30 seconds for automatic refresh

2. **Verify the tables were created:**
   - Go to **Table Editor** in your Supabase dashboard
   - You should see the following tables:
     - `categories`
     - `tags`
     - `blog_posts`
     - `post_tags`
     - `post_views`

3. **Check default data:**
   - Navigate to the `categories` table - you should see 5 default categories
   - Navigate to the `tags` table - you should see 10 default tags

## Migration Files

- `20251128233927_initial_schema.sql` - Initial database schema with all tables, indexes, RLS policies, and default data

## Troubleshooting

If you encounter any errors:

1. **"relation already exists"** - Some tables may already exist. The migration uses `CREATE TABLE IF NOT EXISTS` so this should be safe, but you can drop existing tables if needed.

2. **RLS policy errors** - If policies already exist, the migration includes `DROP POLICY IF EXISTS` statements to handle this.

3. **Permission errors** - Make sure you're running the migration as a database superuser or with appropriate permissions.

