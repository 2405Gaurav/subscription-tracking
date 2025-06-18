import {Router} from "express";

const subRouter = Router();


subRouter.get('/',(req,res)=>res.send({title:'GET all subcription'}))

subRouter.get('/:id',(req,res)=>res.send({title:'GET subcription detail'}))

subRouter.post('/',(req,res)=>res.send({title:'CREATE subcription'}))

subRouter.put('/:id',(req,res)=>res.send({title:'UPDATE subcription'}))

subRouter.get('/user/:id',(req,res)=>res.send({title:'DELETE subcription'}))

subRouter.put('/:id/cancel',(req,res)=>res.send({title:'CANCEL subcription'}))

subRouter.get('/upcoming renewals',(req,res)=>res.send({title:'GET upcoming renewals'}))
export default subRouter;