# 🌐 How to View Your Website

## Quick Start

### Option 1: Simple Method (Recommended)
1. Make sure servers are running:
   ```bash
   npm run dev
   ```

2. **Open your web browser** (Chrome, Firefox, etc.)

3. **Type this address in the address bar:**
   ```
   http://localhost:3000
   ```
   
   If port 3000 is busy, try:
   - http://localhost:3001
   - http://localhost:3002
   - http://localhost:3003

4. **Press Enter** - You should see your Hybah Coffee House website!

### Option 2: Use the Helper Script
```bash
./OPEN_WEBSITE.sh
```
This will automatically find the correct port and try to open your browser.

## What You Should See

When you open the website, you'll see:
- 🏠 **Homepage** with hero section
- ☕ **Menu** with Chadian food items
- 📸 **Gallery** section
- 💬 **Feedback** form
- And more!

## Troubleshooting

### "This site can't be reached" or "Connection refused"
1. Make sure servers are running:
   ```bash
   npm run dev
   ```
2. Wait 10-15 seconds for servers to start
3. Check the terminal output for the correct port number

### "Port already in use"
Kill existing processes:
```bash
pkill -f "npm run dev"
pkill -f "vite"
pkill -f "node.*server"
```
Then run `npm run dev` again.

### Can't see the menu items
1. Seed the database:
   ```bash
   cd backend
   npm run seed
   ```

### Check if servers are running
```bash
# Check frontend
curl http://localhost:3000

# Check backend  
curl http://localhost:5000/api/health
```

## Server URLs

- **Frontend (Website)**: http://localhost:3000 (or 3001, 3002, etc.)
- **Backend (API)**: http://localhost:5000

## Need Help?

Check the server logs:
```bash
tail -f /tmp/hybah-servers.log
```

Or if running in terminal, look at the output from `npm run dev`

