# Supabase Setup Guide

## Step 1: Get Your Supabase API Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to **Settings** > **API**
4. Copy the following values:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Step 2: Create Environment File

Create a file named `.env.local` in the root of your project with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Replace the placeholder values with your actual Supabase credentials.

**Important:** The `.env.local` file is already in `.gitignore`, so it won't be committed to git. This keeps your API keys secure.

## Step 3: Seed Mock Data

After setting up your environment variables, you can seed your database with mock data:

```bash
npm run seed
```

This will use the `upsert` method to add mock data to your `characters` and `posts` tables. If records with the same IDs already exist, they will be updated.

## Step 4: Verify Connection

Start your development server:

```bash
npm run dev
```

Your app should now be connected to Supabase!

## Troubleshooting

- **"Missing Supabase credentials" error**: Make sure your `.env.local` file exists and has the correct variable names
- **"Table does not exist" error**: Make sure you've created the `characters` and `posts` tables in your Supabase database
- **Connection errors**: Verify your API keys are correct and your Supabase project is active

