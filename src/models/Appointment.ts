import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    title: String,
    description: String
})

export const AppointmentModel = mongoose.model("Appointment", AppointmentSchema)