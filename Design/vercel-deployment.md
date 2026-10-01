# Vercel Deployment Guide

This document outlines the step-by-step process for deploying the Hotel Ratnawali Next.js application to Vercel. 

## 1. Prerequisites
- A GitHub, GitLab, or Bitbucket account with the repository pushed to a remote origin.
- A Vercel account (linked to your Git provider).

## 2. Project Import
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click the **Add New...** button and select **Project**.
3. Import the `hotel-ratnawali` repository from your Git provider.

## 3. Configuration & Build Settings
Vercel should automatically detect that this is a Next.js project. Ensure the following settings match:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (or the folder where `package.json` resides if in a monorepo)
- **Build Command**: `npm run build`
- **Install Command**: `npm install` (or `npm install --legacy-peer-deps` if peer dependency issues persist with vite/plugins)
- **Output Directory**: `.next`

## 4. Environment Variables
Add the following environment variables in the **Environment Variables** section before deploying. These are required for the database, authentication, and email services built in Phase 1:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
HOTEL_NOTIFICATION_EMAIL=reservations@hotelratnawali.com
```

## 5. Deploy
1. Click the **Deploy** button.
2. Vercel will run the install command, execute the build step, and deploy the application to a `.vercel.app` domain.
3. Once the build completes, you can review the live deployment and map your custom domain (e.g., `hotelratnawali.com`) in the project's **Settings > Domains** tab.
