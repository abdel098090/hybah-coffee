#!/bin/bash

echo "🌐 Opening Hybah Coffee House Website"
echo "======================================"
echo ""

# Start servers in background
cd "$(dirname "$0")"
npm run dev > /tmp/hybah-servers.log 2>&1 &
SERVER_PID=$!

echo "⏳ Starting servers (this may take 10-15 seconds)..."
echo ""

# Wait for servers to start
sleep 8

# Check which port the frontend is on
FRONTEND_PORT=""
for port in 3000 3001 3002 3003 3004; do
    if curl -s http://localhost:$port > /dev/null 2>&1; then
        FRONTEND_PORT=$port
        break
    fi
done

# Check backend
BACKEND_STATUS=""
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    BACKEND_STATUS="✓ Running"
else
    BACKEND_STATUS="✗ Not responding"
fi

echo ""
echo "════════════════════════════════════════"
echo "  📍 YOUR WEBSITE IS READY!"
echo "════════════════════════════════════════"
echo ""
if [ ! -z "$FRONTEND_PORT" ]; then
    FRONTEND_URL="http://localhost:$FRONTEND_PORT"
    echo "  🌐 Frontend: $FRONTEND_URL"
    echo ""
    echo "  👉 OPEN THIS IN YOUR BROWSER:"
    echo "     $FRONTEND_URL"
    echo ""
    
    # Try to open browser automatically
    if command -v xdg-open > /dev/null; then
        echo "  🚀 Opening browser automatically..."
        xdg-open "$FRONTEND_URL" 2>/dev/null &
    elif command -v gnome-open > /dev/null; then
        gnome-open "$FRONTEND_URL" 2>/dev/null &
    fi
else
    echo "  ⚠️  Frontend is still starting..."
    echo "  Check the log: tail -f /tmp/hybah-servers.log"
    echo ""
    echo "  Try these URLs:"
    echo "    http://localhost:3000"
    echo "    http://localhost:3001"
    echo "    http://localhost:3002"
fi

echo "  🔧 Backend:  http://localhost:5000 ($BACKEND_STATUS)"
echo ""
echo "════════════════════════════════════════"
echo ""
echo "📝 To stop servers: Press Ctrl+C or run: pkill -f 'npm run dev'"
echo "📋 View logs: tail -f /tmp/hybah-servers.log"
echo ""
echo "Servers are running in the background..."
echo "Press Ctrl+C to exit this script (servers will keep running)"
echo ""

# Keep script running so user can see output
tail -f /tmp/hybah-servers.log

