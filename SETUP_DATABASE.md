# Database Setup Instructions

## Quick Setup

1. **Update your `.env` file** in the `backend/` directory with your PostgreSQL credentials:
   ```bash
   cd backend
   nano .env  # or use your preferred editor
   ```

2. **Update the DATABASE_URL** with your actual PostgreSQL credentials:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/hybah_coffee
   ```
   
   Replace:
   - `username` with your PostgreSQL username (usually `postgres`)
   - `password` with your PostgreSQL password
   - `localhost:5432` if your database is on a different host/port
   - `hybah_coffee` is the database name (you can change this)

3. **Create the database** (if it doesn't exist):
   ```bash
   # Option 1: Using psql command line
   psql -U postgres -c "CREATE DATABASE hybah_coffee;"
   
   # Option 2: Using createdb command
   createdb hybah_coffee
   
   # Option 3: Connect to PostgreSQL and create manually
   psql -U postgres
   CREATE DATABASE hybah_coffee;
   \q
   ```

4. **Test the connection** by starting the server:
   ```bash
   npm run dev
   ```

5. **Seed the database** with Chadian menu items:
   ```bash
   npm run seed
   ```

## Troubleshooting

### If you get "database does not exist" error:
- Make sure the database name in `.env` matches the database you created
- Check that PostgreSQL is running: `sudo systemctl status postgresql` (Linux) or `brew services list` (Mac)

### If you get "password authentication failed":
- Verify your PostgreSQL username and password in the `.env` file
- You may need to check your PostgreSQL authentication settings in `pg_hba.conf`

### If you get "connection refused":
- Make sure PostgreSQL is running
- Check that the port (default 5432) is correct
- Verify the host (localhost) is correct

### Alternative: Use individual database config options

Instead of `DATABASE_URL`, you can use individual options in `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hybah_coffee
DB_USER=postgres
DB_PASSWORD=your_password
```

