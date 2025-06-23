import { Router } from 'express';
import authorise from '../middlewares/auth.middleware.js';

// import authorize from '../middlewares/auth.middleware.js'
import { getUser, getUsers ,deleteUser} from '../controllers/user.controller.js'

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id',authorise, getUser);

// userRouter.post('/', (req, res) => res.send({ title: 'CREATE new user' }));

userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE user' }));

userRouter.delete('/:id', authorise,deleteUser)

export default userRouter;