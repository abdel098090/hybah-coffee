# 🚀 Deployment Guide - Hybah Coffee House

Complete guide to deploy your Hybah Coffee House application to Vercel (frontend) and a backend hosting service.

## 📋 Pre-Deployment Checklist

### ✅ Features Complete
- [x] Frontend with React + Vite
- [x] Backend API with Express
- [x] Database models and migrations
- [x] Menu items seeded
- [x] Authentication system
- [x] Order management
- [x] Reservation system
- [x] Multi-language support (English, Arabic, French)
- [x] Responsive design
- [x] Error handling

### ✅ Configuration Files
- [x] `frontend/vercel.json` - Vercel configuration
- [x] `frontend/.env.example` - Frontend environment template
- [x] `backend/.env.example` - Backend environment template
- [x] CORS configured for production

---

## 🎯 Deployment Strategy

**Recommended Architecture:**
- **Frontend**: Vercel (free tier available)
- **Backend**: Railway, Render, or Heroku (PostgreSQL included)
- **Database**: PostgreSQL (provided by backend hosting)

---

## 📦 Part 1: Deploy Backend First

### Option A: Deploy to Railway (Recommended - Easiest)

1. **Sign up at Railway**: https://railway.app
   - Sign up with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Backend**:
   - Railway will auto-detect Node.js
   - Set root directory: `backend`
   - Add environment variables (see below)

4. **Add PostgreSQL Database**:
   - In Railway dashboard, click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically create `DATABASE_URL`

5. **Set Environment Variables in Railway**:
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=<auto-provided by Railway>
   FRONTEND_URL=https://your-frontend.vercel.app
   JWT_SECRET=<generate-a-strong-random-secret-min-32-chars>
   JWT_EXPIRES_IN=7d
   STRIPE_SECRET_KEY=sk_live_your_stripe_key
   ```

6. **Deploy**:
   - Railway will automatically deploy
   - Note the deployment URL (e.g., `https://your-app.railway.app`)

### Option B: Deploy to Render

1. **Sign up at Render**: https://render.com

2. **Create Web Service**:
   - New → Web Service
   - Connect your GitHub repo
   - Settings:
     - **Name**: hybah-coffee-backend
     - **Root Directory**: backend
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment**: Node

3. **Add PostgreSQL Database**:
   - New → PostgreSQL
   - Create database
   - Copy the `Internal Database URL`

4. **Set Environment Variables**:
   - Same as Railway (see above)

5. **Deploy**:
   - Render will deploy automatically
   - Note the URL: `https://your-app.onrender.com`

---

## 🌐 Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

1. **Update API URL**:
   ```bash
   cd frontend
   # Create .env.production file
   echo "VITE_API_URL=https://your-backend-url.com/api" > .env.production
   ```
   Replace `your-backend-url.com` with your actual backend URL from Railway/Render

2. **Test Build Locally**:
   ```bash
   npm run build
   ```
   Verify the `dist/` folder is created successfully

### Step 2: Deploy to Vercel

#### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```
   - Follow the prompts
   - Select your project settings
   - When asked for root directory, enter: `frontend`

4. **Set Environment Variables**:
   ```bash
   vercel env add VITE_API_URL
   # Enter: https://your-backend-url.com/api
   ```

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

#### Method 2: Vercel Dashboard (Easier)

1. **Go to Vercel**: https://vercel.com
   - Sign up/login with GitHub

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   - Go to Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL = https://your-backend-url.com/api
     ```
   - Replace with your actual backend URL

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at: `https://your-project.vercel.app`

---

## 🔧 Part 3: Configure Production Settings

### Update Backend CORS

After deploying frontend, update your backend's `FRONTEND_URL`:

1. **In Railway/Render Dashboard**:
   - Go to Environment Variables
   - Update `FRONTEND_URL` to your Vercel URL:
     ```
     FRONTEND_URL=https://your-project.vercel.app
     ```
   - Redeploy backend

### Update Frontend API URL

1. **In Vercel Dashboard**:
   - Go to Settings → Environment Variables
   - Update `VITE_API_URL` if needed
   - Redeploy frontend

---

## 🗄️ Part 4: Database Setup

### Seed Production Database

1. **Connect to your production database**:
   ```bash
   # Get connection string from Railway/Render dashboard
   DATABASE_URL=postgresql://user:pass@host:port/dbname
   ```

2. **Run migrations** (if you have them):
   ```bash
   cd backend
   npm run migrate
   ```

3. **Seed menu items**:
   ```bash
   # Option 1: Run locally with production DATABASE_URL
   DATABASE_URL=your_production_url npm run seed
   
   # Option 2: SSH into Railway/Render and run
   # (Check their documentation for SSH access)
   ```

---

## ✅ Part 5: Verify Deployment

### Test Your Live Site

1. **Frontend**: Visit your Vercel URL
   - Check if homepage loads
   - Test navigation
   - Check menu page

2. **Backend API**: Test endpoints
   ```bash
   curl https://your-backend-url.com/api/health
   curl https://your-backend-url.com/api/menu
   ```

3. **Full Flow Test**:
   - [ ] Homepage loads
   - [ ] Menu displays items
   - [ ] Language switching works
   - [ ] Can add items to cart
   - [ ] Can create account
   - [ ] Can login
   - [ ] Can place order (if payment configured)

---

## 🔐 Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string (min 32 chars)
- [ ] Use production Stripe keys (not test keys)
- [ ] Set `NODE_ENV=production` in backend
- [ ] Remove console.logs in production (or use logging service)
- [ ] Enable HTTPS (automatic on Vercel/Railway/Render)
- [ ] Set up proper CORS origins
- [ ] Use environment variables for all secrets

---

## 📊 Monitoring & Maintenance

### Vercel Analytics (Optional)
- Enable in Vercel dashboard
- Track page views and performance

### Backend Logs
- **Railway**: View logs in dashboard
- **Render**: View logs in dashboard
- Set up error tracking (Sentry, LogRocket, etc.)

### Database Backups
- **Railway**: Automatic backups
- **Render**: Manual backups available
- Consider setting up automated backups

---

## 🐛 Troubleshooting

### Frontend Issues

**Problem**: API calls failing
- **Solution**: Check `VITE_API_URL` in Vercel environment variables
- Verify backend CORS allows your Vercel domain

**Problem**: Build fails
- **Solution**: Check build logs in Vercel dashboard
- Test build locally: `npm run build`

### Backend Issues

**Problem**: Database connection fails
- **Solution**: Verify `DATABASE_URL` in environment variables
- Check database is running in Railway/Render dashboard

**Problem**: CORS errors
- **Solution**: Update `FRONTEND_URL` in backend environment variables
- Verify CORS configuration in `server.js`

### Database Issues

**Problem**: Menu items not showing
- **Solution**: Run seed script on production database
- Check database connection

---

## 🚀 Quick Deploy Commands

### One-time Setup
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy frontend
cd frontend
vercel --prod
```

### Update Environment Variables
```bash
# Frontend
vercel env add VITE_API_URL production

# Backend (via Railway/Render dashboard)
# Update FRONTEND_URL after frontend is deployed
```

---

## 📝 Post-Deployment

1. **Update Domain** (Optional):
   - Add custom domain in Vercel settings
   - Update `FRONTEND_URL` in backend

2. **Set up Monitoring**:
   - Enable Vercel Analytics
   - Set up error tracking

3. **Test Everything**:
   - User registration/login
   - Menu browsing
   - Order placement
   - Language switching
   - Mobile responsiveness

---

## 🎉 You're Live!

Your Hybah Coffee House website is now deployed and accessible worldwide!

**Frontend**: `https://your-project.vercel.app`  
**Backend**: `https://your-backend.railway.app` (or Render)

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs

---

**Last Updated**: 2024
**Version**: 1.0.0

