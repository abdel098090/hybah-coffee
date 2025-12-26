# Hybah Coffee House - Premium Café & Restaurant Website

A full-featured restaurant website with online ordering, table reservations, VIP membership, and admin dashboard.

## Tech Stack

- **Frontend**: React 18, Vite, React Router, Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL, Sequelize
- **Payment**: Stripe
- **Email**: Nodemailer
- **Maps**: Google Maps API

## Project Structure

```
hybah-coffee/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
└── database/          # Database migrations and seeds
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials and API keys.

5. Create the PostgreSQL database:
```bash
createdb hybah_coffee
```

6. Run migrations (will be created in Phase 2):
```bash
npm run migrate
```

7. Seed the database with Chadian menu items:
```bash
npm run seed
```

8. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your API URLs and keys.

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

- 🏠 Modern homepage with enhanced hero section and testimonials
- 🇹🇩 Authentic Chadian cuisine menu (Boule, Daraba, Aiyash, and more)
- ☕ Complete menu system (coffee, tea, traditional Chadian drinks)
- 🛒 Online ordering with advanced customization:
  - Allergy information selection
  - Salt reduction option
  - Special instructions/notes
  - Size, milk type, sugar level options
- 📸 Interactive gallery with clickable restaurant interior images
- 💬 Feedback/Review system for customers to share their experience
- 💳 Stripe payment integration
- 📍 Table reservation system
- 👑 VIP membership program
- 🚚 Delivery system with address management
- 📊 Admin dashboard for order and menu management
- 🌓 Dark/Light mode support
- 📱 Fully responsive design

## 🌍 Multi-Language Support

The website supports three languages:
- 🇬🇧 English
- 🇸🇦 Arabic (with RTL support)
- 🇫🇷 French

Language preference is saved automatically and persists across sessions.

## 🚀 Deployment

### Quick Deploy to Vercel

**Frontend (Vercel)**:
1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Deploy: `cd frontend && vercel --prod`

**Backend (Railway/Render)**:
1. Sign up at [Railway](https://railway.app) or [Render](https://render.com)
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Add environment variables (see `.env.example`)
5. Deploy

### Detailed Deployment Guide

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for complete step-by-step instructions.

### Pre-Deployment Checklist

See **[PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md)** to ensure everything is ready.

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_GOOGLE_MAPS_API_KEY=...
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@host:port/db
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
JWT_SECRET=your-secret-key-min-32-chars
STRIPE_SECRET_KEY=sk_live_...
```

See `.env.example` files in `frontend/` and `backend/` directories for complete list.

## 🛠️ Development

The project is organized into phases as outlined in the implementation plan. Each phase builds upon the previous one to create a complete, production-ready application.

### Running Locally

```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:5000

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist
- **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** - Local development setup
- **[LANGUAGE_FEATURE.md](./LANGUAGE_FEATURE.md)** - Language switching guide

## License

Proprietary - Hybah Coffee House

