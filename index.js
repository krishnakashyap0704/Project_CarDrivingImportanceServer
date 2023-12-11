import express from "express";
import mongoose, { connect } from 'mongoose';
import { User } from "./RTOlicenceDetails.js";
import { Student } from "./DrivingSchoolRegistration.js";
import { People } from "./Register.js";
import { ERROR_MESSAGE, INSERT_SUCCESS} from './constants.js';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';


const app = express();
app.use(express.json());
app.use(cors());
//parse incoming requests with JSON payloads. When a client sends data to the server with a Content-Type: application/json header, this middleware automatically parses the JSON data and makes it available in the request.body property.

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/DrivingSchool')
    } catch (error) {
        console.log(error);
    }
}

//api to insert Person
app.post("/LicenceDataCollection", async (request, response) => {
    try {
        const reqData = request.body;
        const driver = new User(reqData);
        await driver.save();
        response.send({ message: INSERT_SUCCESS });
    } catch (error) {
        response.send({ message: ERROR_MESSAGE });
    }
});

//api to insert Person
app.post("/DrivingSchoolCollection", async (request, response) => {
    try {
        const reqData = request.body;
        const Person = new Student(reqData);
        await Person.save();
        response.send({ message: INSERT_SUCCESS });
    } catch (error) {
        response.send({ message: ERROR_MESSAGE });
    }
});

//api to insert Person
app.post("/Register", async (request, response) => {
    try {
        const reqData = request.body;
        reqData['password'] = bcrypt.hashSync(reqData.password, 10);
        reqData['confirmPassword'] = bcrypt.hashSync(reqData.confirmPassword, 10);
        const people = new People(reqData);
        await people.save();
        response.send({ message: INSERT_SUCCESS });
    } catch (error) {
        response.send({ message: ERROR_MESSAGE });
    }
});

app.post("/LoginProfile", async (request, response) => {
    try {
        const user = await People.findOne({ email: request.body.email });
        if (user) {
            if (bcrypt.compareSync(request.body.password, user.password)) {
                // Generate and send a token (uncomment if needed)
                const token = Jwt.sign({ email: People.email }, "Krishna123");
                response.status(StatusCodes.OK).send({ message: "Login successful", token: token });
                // response.status(StatusCodes.OK).send({ message: "Login successful" });
            }
            else {
                response.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid email or password" });
            }
        } else {
            response.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid email or password........" });
        }
    } catch (error) {
        console.error(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Something went wrong" });
    }

});

//getting data of one the User
app.get("/LicenceDataCollection/:vehicleNumber", async (request, response) => {
    try {
        const user = await User.findOne({ vehicleNumber: request.params.vehicleNumber });
        if (user == null) {
            response.status(StatusCodes.NOT_FOUND).send({ message: USER_NOT_FOUND });
        }
        else {
            response.send({ user: user });
        }
    } catch (error) {
        response.send({ message: "User Not Found" });
        console.log("User not findout");
        //response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:ERROR_MESSAGE});
    }
});

//getting data of one the User
app.get("/DrivingSchoolCollection/:contact", async (request, response) => {
    try {
        const user = await Student.findOne({ contact: request.params.contact });
        if (user == null) {
            response.status(StatusCodes.NOT_FOUND).send({ message: USER_NOT_FOUND });
        }
        else {
            response.send({ user: user });
        }
    } catch (error) {
        response.send({ message: "User Not Found" });
        console.log("User not findout");
        //response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:ERROR_MESSAGE});
    }
});

app.listen(4100, () => {
    console.log("Server has started on 4100");
    connectDb();
});