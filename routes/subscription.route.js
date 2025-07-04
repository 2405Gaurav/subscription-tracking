import authorize from "../middlewares/auth.middleware.js";
import {Router} from "express";
import { createSubcription, getUserSubcription } from "../controllers/subscription.controller.js";

const subRouter = Router();


subRouter.get('/',(req,res)=>res.send({title:'GET all subcription'}))


subRouter.post('/',authorize,createSubcription);

subRouter.put('/:id',(req,res)=>res.send({title:'UPDATE subcription'}))

subRouter.get('/user/:id',authorize,getUserSubcription)


subRouter.get('/upcoming renewals',(req,res)=>res.send({title:'GET upcoming renewals'}))
export default subRouter;