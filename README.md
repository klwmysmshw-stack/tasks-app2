# Tasks App

A beautiful and modern task management application built with Next.js, Supabase, and Tailwind CSS. Create, edit, delete, and manage your tasks with an intuitive and responsive interface.

## Features

- ✅ Create new tasks with title and optional description
- ✏️ Edit existing tasks inline
- 🗑️ Delete tasks you no longer need
- ✅ Mark tasks as completed or pending
- 📊 View task statistics (total, completed, remaining)
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- ⚡ Real-time updates with Supabase

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database)
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Vercel account (for deployment)

### 2. Supabase Setup

1. Create a new project in [Supabase](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL script from `supabase-schema.sql` to create the tasks table
4. Get your project URL and anon key from Settings > API

### 3. Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tasks-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### 4. Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project in [Vercel](https://vercel.com):
   - Go to your Vercel dashboard
   - Click "New Project"
   - Import your Git repository

3. Configure environment variables in Vercel:
   - Go to your project settings
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy! Vercel will automatically build and deploy your application.

## Database Schema

The application uses a simple `tasks` table with the following structure:

- `id` (UUID, Primary Key)
- `title` (Text, Required)
- `description` (Text, Optional)
- `completed` (Boolean, Default: false)
- `created_at` (Timestamp with timezone)
- `updated_at` (Timestamp with timezone, Auto-updated)

## File Structure

```
tasks-app/
├── app/
│   ├── globals.css          # Global styles and Tailwind CSS
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── TaskForm.tsx         # Form for creating/editing tasks
│   ├── TaskItem.tsx         # Individual task component
│   └── TaskList.tsx         # List of tasks component
├── lib/
│   └── supabase.ts          # Supabase client configuration
├── supabase-schema.sql      # Database schema
├── vercel.json              # Vercel deployment configuration
└── README.md                # This file
```

## Features in Detail

### Task Management
- **Create**: Add new tasks with a title and optional description
- **Read**: View all tasks organized by status (pending/completed)
- **Update**: Edit task details inline or toggle completion status
- **Delete**: Remove tasks permanently

### User Interface
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern Styling**: Clean, professional interface with smooth animations
- **Real-time Feedback**: Toast notifications for all actions
- **Statistics Dashboard**: Overview of task counts and completion rates

### Performance
- **Server-Side Rendering**: Fast initial page loads with Next.js
- **Optimistic Updates**: Immediate UI feedback while syncing with database
- **Efficient Queries**: Optimized database queries with proper indexing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).