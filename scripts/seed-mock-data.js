/**
 * Seed script to populate Supabase database with mock data
 * Run with: npm run seed
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials!');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Mock data for characters table
const mockCharacters = [
  {
    id: 1,
    name: 'Alice',
    description: 'A brave adventurer',
    level: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Bob',
    description: 'A wise wizard',
    level: 15,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Charlie',
    description: 'A skilled rogue',
    level: 8,
    created_at: new Date().toISOString(),
  },
];

// Mock data for posts table
const mockPosts = [
  {
    id: 1,
    title: 'Welcome to Our Platform!',
    location: 'San Francisco, CA',
    date: '2024-01-15',
    time: '10:00 AM',
    description: 'This is our first post. Welcome everyone!',
    image_url: null,
    tags: ['welcome', 'announcement'],
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Community Event This Weekend',
    location: 'New York, NY',
    date: '2024-01-20',
    time: '2:00 PM',
    description: 'Join us for an amazing community gathering!',
    image_url: null,
    tags: ['event', 'community'],
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'New Features Released',
    location: 'Seattle, WA',
    date: '2024-01-25',
    time: '9:00 AM',
    description: 'Check out all the amazing new features we just launched!',
    image_url: null,
    tags: ['update', 'features'],
    created_at: new Date().toISOString(),
  },
];

async function seedData() {
  console.log('🌱 Starting to seed mock data...\n');

  try {
    // Seed characters table
    console.log('📝 Seeding characters table...');
    const { data: charactersData, error: charactersError } = await supabase
      .from('characters')
      .upsert(mockCharacters, { onConflict: 'id' })
      .select();

    if (charactersError) {
      console.error('❌ Error seeding characters:', charactersError.message);
    } else {
      console.log(`✅ Successfully seeded ${charactersData?.length || 0} characters`);
    }

    // Seed posts table
    console.log('\n📝 Seeding posts table...');
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .upsert(mockPosts, { onConflict: 'id' })
      .select();

    if (postsError) {
      console.error('❌ Error seeding posts:', postsError.message);
    } else {
      console.log(`✅ Successfully seeded ${postsData?.length || 0} posts`);
    }

    console.log('\n🎉 Seeding complete!');
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  }
}

seedData();

