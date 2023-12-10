import mongoose, { Schema } from "mongoose";

const Registration = new Schema({
    firstName:String,
    lastName:String,
    dateOfBirth:String,
    gender:String,
    contact:Number,
    email:String,
    license:String,
    course:String,
    drivingexperience:Number
});

export const Student = mongoose.model("DrivingSchoolCollection", Registration);
//collection created with DrivingSchoolCollection as drivingschoolcollections