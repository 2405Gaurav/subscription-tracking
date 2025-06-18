import express from 'express';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.router.js';       
import subRouter from './routes/subscription.route.js';
const app = express();
import {PORT} from './.env.js'
app.get('/', (req, res) => {
    res.send('Hello World! from gaurav');
});

app.use(express.json());

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/subscriptions',subRouter)

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});

export default app;
