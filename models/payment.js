import mongoose, { Schema } from "mongoose";
const {schema,model} = mongoose;

const userSchema = new Schema({
    name :{type:String,required:true},
    to_user:{type:String,required:true},
    oid:{type:String,required:true},
    message:{type:String},
    amount:{type:Number,required:true},
    createdAt:{type:Date,default: Date.now},
    updatedAt:{type:Dtae,default:Date.now},
    done:{type:Boolean,default:false}
});
const Payment = model("Payment",PaymentSchema);
export default mongoose.models.Payment || Payment;