import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        name:{type:String,
            required:[true,'User name is required'],
            trim:true,maxLength:[50,'User name is up to 30 characters long'],
            minLength:2},
        email:{type:String,
            required:[true,'Please add a valid email'],
            trim:true,
            maxLength:[50,'Email is up to 50 characters long'],
            unique:true,
            lowercase:true,
            match:[
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please add a valid email'
            ]}, 

        password:{type:String,required:[true,'Please add a password'],
            minLength:6},
        
    },{timestamps:true }
)
const User=mongoose.model('User',userSchema);
export default User;