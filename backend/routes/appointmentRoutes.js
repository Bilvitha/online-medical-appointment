import express from "express";
import Appointment from "../models/Appointment.js";
import auth from "../middleware/auth.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// Book Appointment (protected)
router.post("/", auth, async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Appointments (protected)
router.get("/", auth, async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

export default router;
