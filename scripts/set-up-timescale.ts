import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupTimescaleDB() {
  try {
    await prisma.$executeRaw`
    -- Enable TimescaleDB
    CREATE EXTENSION IF NOT EXISTS timescaledb;

    -- User Activity Stats
    CREATE TABLE IF NOT EXISTS user_activities (
        time TIMESTAMPTZ NOT NULL,
        user_id UUID NOT NULL,
        activity_count INT DEFAULT 1,
        streak_count INT DEFAULT 0,
        
        PRIMARY KEY(time, user_id)
      );

   
    -- Convert to hypertables
    SELECT create_hypertable('user_activities', 'time', 
        if_not_exists => TRUE,
        migrate_data => TRUE
      );

    -- Add retention policy (keep 1 year of data)
    SELECT add_retention_policy(
        'user_activities',
        INTERVAL '1 year',
        if_not_exists => TRUE
      );

    -- Add index for better querying
    CREATE INDEX IF NOT EXISTS idx_user_activities_user_time 
    ON user_activities(user_id, time DESC);

    `;

    console.log('TimescaleDB setup completed successfully');
  } catch (error) {
    console.error('Error setting up TimescaleDB:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupTimescaleDB();
