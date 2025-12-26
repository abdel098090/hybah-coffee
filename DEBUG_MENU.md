# Debug Menu Loading Issue

## ✅ Backend Status: WORKING
- API returns all 43 menu items correctly
- Backend is running on port 5000

## 🔍 How to Debug

### Step 1: Open Browser Developer Tools
1. Press `F12` or `Right-click → Inspect`
2. Go to the **Console** tab
3. Go to the **Network** tab

### Step 2: Check Console Logs
You should see:
- `🔄 Fetching menu items from: http://localhost:5000/api/menu`
- `✅ Fetched menu items: 43`

If you see errors, note them down.

### Step 3: Check Network Tab
1. Refresh the page (F5)
2. Look for a request to `/api/menu`
3. Check if it's:
   - **200 OK** (success) - should show 43 items
   - **Failed** or **CORS error** - this is the problem
   - **Pending** - API not responding

### Step 4: Test API Directly
Open a new tab and go to:
```
http://localhost:5000/api/menu
```
You should see JSON data with all 43 items.

### Common Issues & Solutions

#### Issue 1: CORS Error
**Symptoms:** Console shows "CORS policy" error

**Solution:** Backend CORS is configured, but make sure both servers are running:
```bash
npm run dev
```

#### Issue 2: Connection Refused
**Symptoms:** Console shows "Network Error" or "ECONNREFUSED"

**Solution:** 
1. Check if backend is running:
   ```bash
   curl http://localhost:5000/api/health
   ```
2. Restart backend if needed

#### Issue 3: Wrong Port
**Symptoms:** Frontend can't reach backend

**Solution:** Check what port frontend is using. If it's not 3000, update vite.config.js proxy or use VITE_API_URL

#### Issue 4: Items Load but Don't Display
**Symptoms:** Console shows items loaded but page is empty

**Solution:** Check if MenuItemCard component is working. Open browser console and check for React errors.

### Quick Test in Browser Console
Paste this in the browser console:
```javascript
fetch('http://localhost:5000/api/menu')
  .then(r => r.json())
  .then(data => console.log('Items:', data.length, data))
  .catch(e => console.error('Error:', e))
```

This will test if the API is accessible from your browser.

### If Still Not Working
1. **Restart both servers:**
   ```bash
   # Stop current (Ctrl+C)
   npm run dev
   ```

2. **Clear browser cache:**
   - Chrome: Ctrl+Shift+Delete
   - Select "Cached images and files"
   - Clear data

3. **Try incognito/private window:**
   - This bypasses cache and extensions

4. **Check if frontend port matches:**
   - Frontend might be on 3001, 3002, etc.
   - Check terminal output for actual port
   - Update API baseURL if needed

