/**
 * Test Supabase Connection
 * Run this to verify your Supabase credentials are working
 * 
 * Usage: node scripts/test-supabase-connection.js
 * Make sure you have .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load .env.local manually
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, '');
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...\n');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables!');
  console.log('\nPlease ensure you have these in your .env.local file:');
  console.log('  NEXT_PUBLIC_SUPABASE_URL=your-project-url');
  console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\n');
  process.exit(1);
}

console.log('✅ Environment variables found');
console.log(`   URL: ${supabaseUrl.substring(0, 30)}...`);
console.log(`   Key: ${supabaseAnonKey.substring(0, 20)}...\n`);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // Test 1: Check if we can connect
    console.log('1️⃣ Testing basic connection...');
    const { data, error } = await supabase.from('blog_posts').select('count').limit(0);
    
    if (error) {
      if (error.code === 'PGRST205' || error.message.includes('schema cache')) {
        console.log('   ⚠️  Connection works, but tables don\'t exist yet');
        console.log('   → You need to run the migration SQL in Supabase Dashboard\n');
      } else {
        console.error('   ❌ Connection error:', error.message);
        console.error('   Code:', error.code);
        process.exit(1);
      }
    } else {
      console.log('   ✅ Connection successful!');
      console.log('   ✅ Tables exist!\n');
    }

    // Test 2: List existing tables
    console.log('2️⃣ Checking existing tables...');
    const tables = ['categories', 'tags', 'blog_posts', 'post_tags', 'post_views'];
    
    for (const table of tables) {
      const { error: tableError } = await supabase.from(table).select('*').limit(1);
      if (tableError) {
        console.log(`   ❌ Table '${table}' - NOT FOUND`);
      } else {
        console.log(`   ✅ Table '${table}' - EXISTS`);
      }
    }

    console.log('\n✅ Connection test complete!\n');
    
    if (error && error.code === 'PGRST205') {
      console.log('📋 Next Steps:');
      console.log('   1. Go to Supabase Dashboard > SQL Editor');
      console.log('   2. Copy the SQL from: supabase/migrations/20251128233927_initial_schema.sql');
      console.log('   3. Paste and run it');
      console.log('   4. Go to Settings > API > Restart API');
      console.log('   5. Run this test again\n');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    process.exit(1);
  }
}

testConnection();

