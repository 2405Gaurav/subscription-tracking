import Subscription from "../models/subscription.model.js"
export const createSubcription= async (req,res,next)=>{
  try{

        const subcription= await Subscription.create({
            ...req.body,
            user:req.user._id,

        })
        res.status(201).json({success:true,data:subcription})


    }
    catch(error){
        next(error)
    }
}
export const getUserSubcription= async (req,res,next)=>{
  try{

    if(req.user.id!==req.params.id){
        const error=new Error('you are not the owner of this account')
        error.status=401;
        throw error;
    }

        const subcription= await Subscription.find({
            
            user:req.params.id,

        })
        res.status(201).json({success:true,data:subcription})


    }
    catch(error){
        next(error)
    }
}