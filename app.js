import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.router.js';
import subRouter from './routes/subscription.route.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

dotenv.config(); // Load .env variables at the top

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use(arcjetMiddleware);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);

//custom global error handler
app.use(errorMiddleware)

// Root route
app.get('/', (req, res) => {
  res.send('Hello World! from Gaurav');
});

// Connect to DB and then start server
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();

export default app;
