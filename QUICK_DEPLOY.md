# ⚡ Quick Deploy Guide

Fastest way to get your Hybah Coffee House website live!

## 🎯 5-Minute Deploy

### Step 1: Deploy Backend (2 minutes)

**Option A: Railway (Easiest)**
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set **Root Directory**: `backend`
6. Railway auto-detects Node.js
7. Click "+ New" → "Database" → "PostgreSQL"
8. Add environment variables:
   ```
   NODE_ENV=production
   DATABASE_URL=<auto-provided>
   FRONTEND_URL=https://your-frontend.vercel.app (update after step 2)
   JWT_SECRET=<generate-random-32-chars>
   ```
9. Deploy! ✅
10. Copy your backend URL (e.g., `https://xxx.railway.app`)

**Option B: Render**
1. Go to https://render.com
2. Sign up with GitHub
3. "New" → "Web Service"
4. Connect repo, set root: `backend`
5. Build: `npm install`, Start: `npm start`
6. Add PostgreSQL database
7. Add environment variables (same as Railway)
8. Deploy! ✅

### Step 2: Deploy Frontend (2 minutes)

**Using Vercel Dashboard:**
1. Go to https://vercel.com
2. Sign up with GitHub
3. "Add New" → "Project"
4. Import your repository
5. Configure:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
   (Use the URL from Step 1)
7. Click "Deploy" ✅
8. Copy your frontend URL (e.g., `https://xxx.vercel.app`)

### Step 3: Update CORS (1 minute)

1. Go back to Railway/Render dashboard
2. Update environment variable:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
   (Use the URL from Step 2)
3. Redeploy backend

### Step 4: Seed Database (1 minute)

**Option 1: Local connection**
```bash
cd backend
DATABASE_URL=your_production_database_url npm run seed
```

**Option 2: Railway CLI**
```bash
railway run npm run seed
```

### Step 5: Test! 🎉

Visit your Vercel URL and test:
- [ ] Homepage loads
- [ ] Menu displays
- [ ] Language switching works
- [ ] Can add to cart

---

## 🔧 Using Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy frontend
cd frontend
vercel --prod

# Add environment variable
vercel env add VITE_API_URL production
# Enter: https://your-backend-url.com/api
```

---

## 📋 Environment Variables Summary

### Backend (Railway/Render)
```
NODE_ENV=production
DATABASE_URL=<auto-provided>
FRONTEND_URL=https://your-frontend.vercel.app
JWT_SECRET=<random-32-chars>
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=sk_live_... (if using payments)
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... (if using payments)
```

---

## 🐛 Troubleshooting

**CORS Errors?**
- Make sure `FRONTEND_URL` in backend matches your Vercel URL exactly
- Include `https://` in the URL

**API Not Working?**
- Check `VITE_API_URL` in Vercel matches your backend URL
- Make sure backend is deployed and running
- Check backend logs in Railway/Render dashboard

**Database Empty?**
- Run seed script: `npm run seed` with production `DATABASE_URL`

---

## ✅ You're Live!

Your site is now at: `https://your-project.vercel.app`

For detailed instructions, see **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

