#!/bin/bash

echo "🚀 Starting Hybah Coffee House Development Servers"
echo "=================================================="
echo ""

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "⚠️  PostgreSQL is not running!"
    echo ""
    echo "Please start PostgreSQL first:"
    echo "  sudo systemctl start postgresql"
    echo "  OR"
    echo "  sudo service postgresql start"
    echo ""
    read -p "Press Enter after starting PostgreSQL, or Ctrl+C to exit..."
fi

# Check if database exists
if ! psql -U postgres -lqt 2>/dev/null | cut -d \| -f 1 | grep -qw hybah_coffee; then
    echo "📦 Creating database 'hybah_coffee'..."
    createdb -U postgres hybah_coffee 2>/dev/null || psql -U postgres -c "CREATE DATABASE hybah_coffee;" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✓ Database created successfully!"
    else
        echo "⚠️  Could not create database. You may need to create it manually:"
        echo "   createdb -U postgres hybah_coffee"
    fi
    echo ""
fi

# Check .env file
if [ ! -f "backend/.env" ]; then
    echo "⚠️  .env file not found in backend/ directory!"
    echo "Creating .env file from template..."
    cp backend/.env.example backend/.env 2>/dev/null || {
        cat > backend/.env << 'EOF'
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hybah_coffee
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=hybah-coffee-secret-key-change-in-production-2024
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=sk_test_placeholder_replace_with_real_key
EOF
    }
    echo "✓ .env file created. Please update DATABASE_URL with your PostgreSQL credentials!"
    echo ""
fi

echo "✅ Starting development servers..."
echo "   Frontend: http://localhost:3000 (or next available port)"
echo "   Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

npm run dev

