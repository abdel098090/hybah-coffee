# How to Preview the Hybah Coffee House Website

## Prerequisites

You need to install Node.js and npm first. If you don't have them:

### Install Node.js and npm

**On Linux (Kali/Debian):**
```bash
sudo apt update
sudo apt install -y nodejs npm
```

**Verify installation:**
```bash
node --version
npm --version
```

## Quick Start Guide

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Set Up Environment Variables

**Backend (.env file):**
```bash
cd backend
cp .env.example .env
# Then edit .env with your database and API keys
```

**Frontend (.env file):**
```bash
cd frontend
cp .env.example .env
# Then edit .env with your API URL and keys
```

### Step 3: Set Up Database

1. Install PostgreSQL if not already installed:
```bash
sudo apt install -y postgresql postgresql-contrib
```

2. Create the database:
```bash
sudo -u postgres createdb hybah_coffee
```

3. Update your backend `.env` with database credentials:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/hybah_coffee
```

### Step 4: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

### Step 5: Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

## Important Notes

- **You CANNOT just open `index.html` directly** - React apps need a development server to work
- Both servers (backend and frontend) must be running
- Make sure PostgreSQL is running: `sudo systemctl start postgresql`
- For production, you would build the frontend with `npm run build` and serve it with a web server

## Troubleshooting

**If npm is not found:**
```bash
sudo apt install -y npm
```

**If you get database connection errors:**
- Make sure PostgreSQL is running
- Check your DATABASE_URL in backend/.env
- Verify database exists: `sudo -u postgres psql -l`

**If ports are already in use:**
- Change PORT in backend/.env
- Change port in frontend/vite.config.js

## Quick Preview (Without Full Setup)

If you just want to see the UI without the backend:

1. Install frontend dependencies: `cd frontend && npm install`
2. Start frontend only: `npm run dev`
3. The UI will load but API calls will fail (this is expected without backend)



