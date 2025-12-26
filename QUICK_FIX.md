# Quick Fix for Database Connection Issue

## The Problem
PostgreSQL is not running, which is why the backend can't start.

## Quick Solution

### Step 1: Start PostgreSQL
Open a terminal and run:
```bash
sudo systemctl start postgresql
```

If that doesn't work, try:
```bash
sudo service postgresql start
```

### Step 2: Verify PostgreSQL is Running
```bash
pg_isready
```

You should see: `localhost:5432 - accepting connections`

### Step 3: Create the Database
```bash
createdb -U postgres hybah_coffee
```

If that doesn't work:
```bash
psql -U postgres -c "CREATE DATABASE hybah_coffee;"
```

### Step 4: Update .env File
Edit `backend/.env` and make sure the DATABASE_URL matches your setup:
```bash
nano backend/.env
```

The line should look like:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/hybah_coffee
```

Replace `YOUR_PASSWORD` with your actual PostgreSQL password.

### Step 5: Start the Servers
```bash
npm run dev
```

Or use the helper script:
```bash
./START_SERVERS.sh
```

## Alternative: Use SQLite for Development (No PostgreSQL needed)

If you want to skip PostgreSQL setup for now, I can modify the database config to use SQLite for development. Would you like me to do that?

## Check What's Running

- **Frontend**: Check http://localhost:3000 (or 3001, 3002, 3003 if ports are in use)
- **Backend**: Should be on http://localhost:5000 (but won't work until PostgreSQL is running)

## Still Having Issues?

1. Check PostgreSQL is installed: `which psql`
2. Check PostgreSQL version: `psql --version`
3. Check if PostgreSQL is listening: `sudo netstat -tlnp | grep 5432`
4. Check PostgreSQL logs: `sudo tail -f /var/log/postgresql/postgresql-*.log`

