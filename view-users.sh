#!/bin/bash

echo "📊 Viewing Registered Users"
echo "=========================="
echo ""

cd "$(dirname "$0")/backend"

if [ -f "database.sqlite" ]; then
  echo "✅ Found SQLite database: database.sqlite"
  echo ""
  echo "👥 Registered Users:"
  echo "-------------------"
  sqlite3 database.sqlite <<EOF
.mode column
.headers on
.width 5 30 15 15 15 10 10
SELECT 
  id,
  email,
  first_name,
  last_name,
  phone,
  role,
  CASE WHEN vip_status = 1 THEN 'Yes' ELSE 'No' END as VIP,
  datetime(created_at, 'localtime') as 'Registered'
FROM users
ORDER BY created_at DESC;
EOF
  echo ""
  echo "📈 Total Users: $(sqlite3 database.sqlite 'SELECT COUNT(*) FROM users;')"
else
  echo "⚠️  SQLite database not found at: backend/database.sqlite"
  echo ""
  echo "💡 You might be using PostgreSQL. Try:"
  echo "   psql -U postgres -d hybah_coffee -c 'SELECT id, email, first_name, last_name, role, created_at FROM users;'"
fi

