# 📊 How to View User Registration Data

When users register on your website, their data is saved in the database. Here's how to find and view it:

## 🗄️ Database Location

Your user data is stored in one of these locations:

### Option 1: SQLite Database (Development)
If you're using SQLite for development:
- **Location**: `backend/database.sqlite`
- **Table**: `users`

### Option 2: PostgreSQL Database (Production)
If you're using PostgreSQL:
- **Database Name**: `hybah_coffee` (or as configured in `.env`)
- **Table**: `users`
- **Connection**: Check `backend/.env` for `DATABASE_URL`

---

## 🔍 How to View User Data

### Method 1: Using SQLite Browser (For SQLite)

1. **Install DB Browser for SQLite** (if not installed):
   ```bash
   # On Linux
   sudo apt install sqlitebrowser
   
   # Or download from: https://sqlitebrowser.org/
   ```

2. **Open the database**:
   ```bash
   sqlitebrowser backend/database.sqlite
   ```

3. **View users**:
   - Click on "Browse Data" tab
   - Select "users" table
   - You'll see all registered users with:
     - id
     - email
     - first_name
     - last_name
     - phone
     - role
     - vip_status
     - created_at
     - updated_at

### Method 2: Using Command Line (SQLite)

```bash
cd backend
sqlite3 database.sqlite

# View all users
SELECT * FROM users;

# View specific user by email
SELECT * FROM users WHERE email = 'user@example.com';

# Count total users
SELECT COUNT(*) FROM users;

# Exit
.quit
```

### Method 3: Using PostgreSQL (psql)

```bash
# Connect to PostgreSQL
psql -U postgres -d hybah_coffee

# View all users
SELECT * FROM users;

# View specific user
SELECT * FROM users WHERE email = 'user@example.com';

# Exit
\q
```

### Method 4: Using a Database GUI Tool

**Recommended Tools:**
- **DBeaver** (Free, works with both SQLite and PostgreSQL)
- **pgAdmin** (For PostgreSQL)
- **TablePlus** (Paid, but has free trial)

**Steps:**
1. Install the tool
2. Connect to your database:
   - **SQLite**: Open `backend/database.sqlite` file
   - **PostgreSQL**: Use connection details from `backend/.env`
3. Navigate to `users` table
4. View all registered users

---

## 📋 User Data Fields

The `users` table contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Unique user ID |
| `email` | STRING | User's email (unique) |
| `password_hash` | STRING | Hashed password (encrypted) |
| `first_name` | STRING | User's first name |
| `last_name` | STRING | User's last name |
| `phone` | STRING | User's phone number |
| `role` | ENUM | 'customer' or 'admin' |
| `vip_status` | BOOLEAN | VIP membership status |
| `vip_joined_at` | DATE | When user joined VIP |
| `profile_picture` | STRING | Profile picture URL |
| `created_at` | TIMESTAMP | Registration date |
| `updated_at` | TIMESTAMP | Last update date |

---

## 🔐 Security Note

**Important**: 
- Passwords are **hashed** (encrypted) - you cannot see the original password
- Never share database files or credentials
- Use environment variables for database connections

---

## 🛠️ Quick Check Commands

### Check if database exists (SQLite):
```bash
ls -lh backend/database.sqlite
```

### Check database size:
```bash
du -h backend/database.sqlite
```

### View user count (SQLite):
```bash
sqlite3 backend/database.sqlite "SELECT COUNT(*) FROM users;"
```

---

## 📝 Example: View All Users

```sql
SELECT 
  id,
  email,
  first_name,
  last_name,
  phone,
  role,
  vip_status,
  created_at
FROM users
ORDER BY created_at DESC;
```

---

## 🚀 Quick Access Script

Create a file `view-users.sh`:

```bash
#!/bin/bash
cd "$(dirname "$0")/backend"

if [ -f "database.sqlite" ]; then
  echo "📊 Users in SQLite database:"
  sqlite3 database.sqlite "SELECT id, email, first_name, last_name, role, created_at FROM users;"
else
  echo "⚠️  SQLite database not found. Check if using PostgreSQL."
  echo "💡 Use: psql -U postgres -d hybah_coffee -c 'SELECT * FROM users;'"
fi
```

Make it executable:
```bash
chmod +x view-users.sh
./view-users.sh
```

---

## 📍 Default Database Location

Based on your configuration:
- **SQLite**: `backend/database.sqlite`
- **PostgreSQL**: Check `backend/.env` for `DATABASE_URL`

---

**Need help?** Check your `backend/.env` file to see which database you're using!

