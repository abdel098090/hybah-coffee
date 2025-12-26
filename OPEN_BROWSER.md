# How to Open the Website in Your Browser

## ✅ Good News!
I've switched the database to **SQLite** - no PostgreSQL setup needed!

## 🚀 Quick Start

1. **Start the servers** (if not already running):
   ```bash
   npm run dev
   ```

2. **Wait for both servers to start** - you should see:
   - Frontend: `➜  Local:   http://localhost:XXXX/`
   - Backend: `Server is running on port 5000`

3. **Open your browser** and go to:
   - **Frontend**: http://localhost:3000 (or the port shown in terminal)
   - **Backend API**: http://localhost:5000/api/health

## 🌐 What URLs to Use

- **Main Website**: http://localhost:3000
- **API Health Check**: http://localhost:5000/api/health
- **Menu API**: http://localhost:5000/api/menu

## 🔍 If You See Port Conflicts

If port 3000 is busy, Vite will automatically use:
- 3001, 3002, 3003, etc.

Check your terminal output for the exact port!

## 🐛 Troubleshooting

### Can't connect to the website?
1. Make sure servers are running: `npm run dev`
2. Check the terminal for any error messages
3. Try the exact URL shown in the terminal (may be 3001, 3002, etc.)

### Backend not starting?
- The database is now SQLite (no setup needed!)
- Check `backend/.env` has `USE_SQLITE=true`
- Make sure `sqlite3` package is installed: `cd backend && npm install`

### Frontend not loading?
- Check if Vite is running (look for "VITE ready" message)
- Try clearing browser cache
- Check browser console for errors (F12)

## 📝 Next Steps

Once the website opens:
1. Browse the menu (Chadian food items will be added when you seed)
2. Try adding items to cart
3. Check out the gallery section
4. Submit feedback

To add menu items, run:
```bash
cd backend
npm run seed
```

