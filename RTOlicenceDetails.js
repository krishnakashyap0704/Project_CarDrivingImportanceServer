import mongoose, { Schema } from "mongoose";

const Registration = new Schema({
        firstName:String,
        lastName:String,
        dateOfBirth:String,
        gender:String,
        phoneNumber:Number,
        address:String,
        email:String,
        vehicleNumber:String,
        model:String,
        vehicleType:String
});

export const User = mongoose.model("LicenceDataCollection", Registration);
//collection created with LicenceDataCollection as licencedatacollections