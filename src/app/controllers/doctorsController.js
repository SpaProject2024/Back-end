import Doctors from "../models/doctors.js"; // Import the doctors model
import dotenv from "dotenv";
// Create a new doctor
export const createDoctor = async (req, res) => {
  const { fullName, doctorID, email, password, numberPhone, gender, address, birthday, experience, description, roleID, status, workingtime } = req.body;

  // Check for required fields
  if (!fullName || !doctorID || !email || !password || !numberPhone || !gender || !address || !birthday || !experience || !roleID || !status || !workingtime) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }

  try {
    const newDoctor = new Doctors({
      fullName,
      doctorID,
      email,
      password,
      numberPhone,
      gender,
      address,
      birthday,
      experience,
      description,
      roleID,
      status,
      workingtime,
    });

    // Save the new doctor to the database
    await newDoctor.save();
    res.status(201).json({ message: "Doctor created successfully", data: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Failed to create doctor", error: error.message });
  }
};

// Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const allDoctors = await Doctors.find(); // Retrieve all doctors
    res.status(200).json({ message: "Success", data: allDoctors });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving doctors", error: error.message });
  }
};

// Get a doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctors.findById(id); // Find doctor by ID

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Success", data: doctor });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving doctor", error: error.message });
  }
};

// Update a doctor by ID
export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { fullName, doctorID, email, numberPhone, gender, address, birthday, experience, description, roleID, status, workingtime } = req.body;

  try {
    const updatedDoctor = await Doctors.findByIdAndUpdate(
      id,
      { fullName, doctorID, email, numberPhone, gender, address, birthday, experience, description, roleID, status, workingtime },
      { new: true } // Return the updated document
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor updated successfully", data: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error: error.message });
  }
};

// Delete a doctor by ID
export const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoctor = await Doctors.findByIdAndDelete(id); // Find and delete doctor by ID

    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error: error.message });
  }
};
