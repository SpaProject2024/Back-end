import WorkSchedule from '../models/workSchedule.js'; // Ensure the correct path to the model

// Add Work Schedule
export const addWorkSchedule = async (req, res) => {
  const { date_of_week, doctorID, start_time, end_time, status, workID } = req.body;

  if (!date_of_week || !doctorID || !start_time || !end_time || typeof status === 'undefined' || !workID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newSchedule = new WorkSchedule({
      date_of_week,
      doctorID,
      start_time,
      end_time,
      status,
      workID,
      created_at: new Date(),
      update_at: new Date(),
    });
    await newSchedule.save();
    res.status(201).json({ message: "Work schedule created successfully", data: newSchedule });
  } catch (error) {
    res.status(500).json({ message: "Failed to create work schedule", error: error.message });
  }
};

// Update Work Schedule by ID
export const updateWorkSchedule = async (req, res) => {
  const { id } = req.params;
  const { date_of_week, doctorID, start_time, end_time, status, workID } = req.body;

  try {
    const updatedSchedule = await WorkSchedule.findByIdAndUpdate(
      id,
      {
        date_of_week,
        doctorID,
        start_time,
        end_time,
        status,
        workID,
        update_at: new Date(), // Update the timestamp
      },
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Work schedule not found" });
    }

    res.status(200).json({ message: "Work schedule updated successfully", data: updatedSchedule });
  } catch (error) {
    res.status(500).json({ message: "Error updating work schedule", error: error.message });
  }
};

// Delete Work Schedule by ID
export const deleteWorkSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSchedule = await WorkSchedule.findByIdAndDelete(id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Work schedule not found" });
    }

    res.status(200).json({ message: "Work schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting work schedule", error: error.message });
  }
};

export const getAllWorkSchedules = async (req, res) => {
  try {
    const works = await WorkSchedule.find();
    res.status(200).json({ message: "Success", data: works });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error: error.message });
  }
};

// Lấy user theo ID
export const getWorkScheduleById = async (req, res) => {
  const { id } = req.params;
  try {
    const works = await WorkSchedule.findById(id);
    if (!works) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Success", data: works });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
};

