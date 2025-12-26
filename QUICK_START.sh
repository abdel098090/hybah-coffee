#!/bin/bash

echo "🚀 Hybah Coffee House - Quick Start Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first:"
    echo "   sudo apt install -y nodejs npm"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Installing..."
    echo "   Please run: sudo apt install -y npm"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "   Backend dependencies already installed"
fi
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "   Frontend dependencies already installed"
fi
cd ..

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "📝 Next steps:"
echo "   1. Set up your .env files (see SETUP_INSTRUCTIONS.md)"
echo "   2. Start the backend:  cd backend && npm run dev"
echo "   3. Start the frontend: cd frontend && npm run dev"
echo "   4. Open http://localhost:3000 in your browser"
echo ""



