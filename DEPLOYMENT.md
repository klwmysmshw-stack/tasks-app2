# Deployment Guide for Tasks App

## Quick Fix for Current Error

The error you're experiencing is due to missing environment variables. Here's how to fix it:

### 1. Set Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

**NEXT_PUBLIC_SUPABASE_URL**
- Value: Your Supabase project URL
- Environments: Production, Preview, Development

**NEXT_PUBLIC_SUPABASE_ANON_KEY**  
- Value: Your Supabase anon key
- Environments: Production, Preview, Development

### 2. Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create one if you haven't)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Set Up Database (if not done)

1. In Supabase, go to **SQL Editor**
2. Create a new query
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the query

### 4. Redeploy

After adding environment variables:
1. Go to **Deployments** tab in Vercel
2. Click **"..."** on latest deployment
3. Select **Redeploy**

## Alternative: Deploy with GitHub

If you're still having issues, try this approach:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import from GitHub in Vercel:**
   - Go to Vercel dashboard
   - Click "New Project"
   - Import from GitHub
   - Add environment variables during import

## Troubleshooting

### Build Error with Missing Variables
- Make sure environment variables are set for ALL environments
- Redeploy after adding variables
- Check variable names are exact (case-sensitive)

### Database Connection Issues
- Verify Supabase URL format: `https://YOUR_PROJECT_ID.supabase.co`
- Ensure anon key is the public one (not service_role key)
- Run the SQL schema in Supabase

### Local Development
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then run:
```bash
npm install
npm run dev
```

The app should now work both locally and on Vercel!