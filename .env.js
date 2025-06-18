import { config } from 'dotenv';

// Load environment variables based on current NODE_ENV
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// Export needed variables with fallback defaults
export const { PORT = 3000, NODE_ENV = 'development' } = process.env;
