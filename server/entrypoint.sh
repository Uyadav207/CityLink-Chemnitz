#!/bin/sh

# Wait until PostgreSQL is ready
until nc -z -v -w30 postgres 5432
do
  echo "Waiting for PostgreSQL database connection..."
  sleep 1
done
echo "PostgreSQL is up and running!"

# Run migrations
npx prisma migrate dev name --init

# Start the application
npm start
