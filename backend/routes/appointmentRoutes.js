import express from "express";
import Appointment from "../models/Appointment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// 📅 Book Appointment (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const newAppointment = new Appointment({
      ...req.body,
      user: req.user.id, // ✅ must match 'id' from JWT payload
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ message: "Failed to book appointment." });
  }
});

// 📋 Get All Appointments (Protected)
router.get("/", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Failed to load appointments." });
  }
});

export default router;
