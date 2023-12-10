import mongoose, { Schema } from "mongoose";

const Registration = new Schema({
    name:String,
    email:String,
    gender:String,
    contactNumber:Number,
    password:String,
    confirmPassword:String
});

export const People = mongoose.model("Register", Registration);
//collection created with LicenceDataCollection as licencedatacollections