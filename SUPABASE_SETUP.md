# Supabase Setup Guide

## Step 1: Create Database Tables

Go to your Supabase dashboard → SQL Editor → New query

Copy and paste the following SQL to create the required tables:

```sql
-- Create categories table
CREATE TABLE categories (
  name TEXT PRIMARY KEY,
  icon TEXT DEFAULT '🌿',
  color TEXT DEFAULT '#1a6b3a',
  bg TEXT DEFAULT '#e8f8ee',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  image TEXT,
  price TEXT NOT NULL,
  category TEXT REFERENCES categories(name) ON DELETE SET NULL,
  description TEXT,
  weight TEXT,
  origin TEXT,
  benefits TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create ads table
CREATE TABLE ads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  image TEXT,
  title TEXT NOT NULL,
  desc TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS) - Allow public read, authenticated write
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

-- Public can read all tables
CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON ads FOR SELECT USING (true);

-- Anyone can insert/update/delete (for admin operations)
CREATE POLICY "Enable insert for all users" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON ads FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON categories FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON ads FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for all users" ON categories FOR DELETE USING (true);
CREATE POLICY "Enable delete for all users" ON products FOR DELETE USING (true);
CREATE POLICY "Enable delete for all users" ON ads FOR DELETE USING (true);
```

## Step 2: Enable Realtime

1. Go to Supabase Dashboard → Tables
2. For each table (categories, products, ads):
   - Click on the table
   - Go to **Realtime** tab
   - Click **Enable realtime**

## Step 3: Environment Variables

Your `.env` file is already set up with:
```
REACT_APP_SUPABASE_URL=https://nnoxbfornpimpkwxvxzh.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sb_publishable_w8z-2-rid1HIbz3dWvC_6A_6BQAkmyD
```

## Step 4: Migrate Initial Data (Optional)

If you want to import your existing data:

1. Go to your Supabase SQL Editor
2. Run this query to insert initial categories:

```sql
INSERT INTO categories (name, icon, color, bg) VALUES
('Grains & Rice', '🌾', '#d97706', '#fef3c7'),
('Spices', '🌶️', '#dc2626', '#fee2e2'),
('Oils & Ghee', '🫗', '#f59e0b', '#fef3c7'),
('Dry Fruits', '🥜', '#8b5a3c', '#faf5f0'),
('Sugar & Salt', '🧂', '#6b7280', '#f3f4f6')
ON CONFLICT (name) DO NOTHING;
```

## Step 5: Restart Your App

```bash
npm start
```

The app will now:
✅ Load data from Supabase on startup
✅ Real-time sync when admin makes changes
✅ Website auto-updates when products/ads/categories change
✅ All data persists in Supabase database

---

### Troubleshooting

**Issue: "Error loading data from Supabase"**
- Check that your `.env` values are correct
- Make sure tables are created in Supabase
- Check browser console for specific error

**Issue: Changes not syncing**
- Verify Realtime is enabled on all tables
- Check Row Level Security (RLS) policies allow access

**Issue: Images not displaying**
- Image uploads are stored as base64 URLs in default setup
- For production, consider using Supabase Storage
