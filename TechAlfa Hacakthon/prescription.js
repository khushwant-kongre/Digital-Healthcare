const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  doctorId: String,
  patientId: String,
  diagnosis: String,
  medicines: [
    {
      name: String,
      dosage: String,
      duration: String,
      purchased: { type: Boolean, default: false },
      completed: { type: Boolean, default: false }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Prescription", prescriptionSchema);