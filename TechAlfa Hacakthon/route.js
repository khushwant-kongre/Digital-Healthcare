const express = require("express");
const QRCode = require("qrcode");
const Prescription = require("../models/Prescription");

const router = express.Router();

router.post("/create", async (req, res) => {
  const prescription = new Prescription(req.body);
  await prescription.save();

  const qr = await QRCode.toDataURL(prescription._id.toString());

  res.json({
    message: "Prescription Created",
    prescription,
    qrCode: qr
  });
});

router.get("/:patientId", async (req, res) => {
  const prescriptions = await Prescription.find({
    patientId: req.params.patientId
  });
  res.json(prescriptions);
});

router.post("/update/:id", async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);
  prescription.medicines = req.body.medicines;
  await prescription.save();

  res.json({ message: "Updated Successfully" });
});

module.exports = router;