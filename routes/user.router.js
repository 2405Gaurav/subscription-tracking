import { Router } from "express";

const userRouter = Router();

userRouter.get('/ ',(req,res)=>res.send({title:'GET all users'}))
userRouter.get('/:id ',(req,res)=>res.send({title:`GET user detail `}))
userRouter.post('/ ',(req,res)=>res.send({title:'CREATE new users'}))
userRouter.post('/:id  ',(req,res)=>res.send({title:'DELETE new users'}))
userRouter.delete('/:id ',(req,res)=>res.send({title:'UPDATE new users'}))

export default userRouter;