import managers from "../models/managers.js"; // Import the doctors model

// Create a new doctor
export const createManager = async (req, res) => {
    const { fullName, managerID, email, password, numberPhone, gender, address, birthday, avatar, roleID, workingtime } = req.body;

    // Check for required fields
    if (!fullName || !managerID || !email || !password || !numberPhone || !gender || !address || !birthday || !avatar || !roleID || !workingtime) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    try {
        const newManager = new doctors({
            fullName,
            managerID,
            email,
            password,
            numberPhone,
            gender,
            address,
            birthday,
            avatar,
            roleID,
            workingtime,
        });

        // Save the new doctor to the database
        await newManager.save();
        res.status(201).json({ message: "Manager created successfully", data: newManager });
    } catch (error) {
        res.status(500).json({ message: "Failed to create manager", error: error.message });
    }
};

// Get all doctors
export const getManagers = async (req, res) => {
    try {
        const allManagers = await managers.find(); // Retrieve all doctors
        res.status(200).json({ message: "Success", data: allManagers });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Managers", error: error.message });
    }
};

// Get a doctor by ID
export const getManagerById = async (req, res) => {
    try {
        const { id } = req.params;
        const manager = await managers.findById(id); // Find doctor by ID

        if (!manager) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({ message: "Success", data: manager });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving manager", error: error.message });
    }
};

// Update a doctor by ID
export const updateManager = async (req, res) => {
    const { id } = req.params;
    const { fullName, managerID, email, password, numberPhone, gender, address, birthday, avatar, roleID, workingtime } = req.body;

    try {
        const updatedManager = await managers.findByIdAndUpdate(
            id,
            { fullName, managerID, email, password, numberPhone, gender, address, birthday, avatar, roleID, workingtime },
            { new: true } // Return the updated document
        );

        if (!updatedManager) {
            return res.status(404).json({ message: "Manager not found" });
        }

        res.status(200).json({ message: "Manager updated successfully", data: updatedManager });
    } catch (error) {
        res.status(500).json({ message: "Error updating manager", error: error.message });
    }
};

// Delete a doctor by ID
export const deletedManager = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedManager = await doctors.findByIdAndDelete(id); // Find and delete doctor by ID

        if (!deletedManager) {
            return res.status(404).json({ message: "Manager not found" });
        }

        res.status(200).json({ message: "Manager deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting manager", error: error.message });
    }
};
