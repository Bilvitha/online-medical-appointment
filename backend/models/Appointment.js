import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phone: String,
  date: String,
  doctor: String,
  reason: String,
});

export default mongoose.model("Appointment", appointmentSchema);
