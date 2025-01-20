import mongoose, { Schema } from "mongoose";
const {schema,model} = mongoose;

const userSchema = new Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    username:{type:string,required:true},
    profilepic:{type:String},
    coverpic:{type:String},
    createdAt:{type:Date,default: Date.now},
    updatedAt:{type:Dtae,default:Date.now}
});

const user = model("user",userSchema)
export default mongoose.models.User || user;