import diagose from '../models/diagnose.js';

// Lấy tất cả các diagose
export const getAllDiagnoses = async (req, res) => {
    try {
        const diagnoses = await diagose.find()
            .populate("appointmentId")
            .populate("userId")
            .populate("productId")
        return res.status(200).json(diagnoses);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching diagnoses", error: error.message });
    }
};

// Lấy diagose theo id
export const getDiagnoseById = async (req, res) => {
    try {
        const { id } = req.params;
        const diagnose = await diagose.findById(id)
            .populate("appointmentId")
            .populate("userId")
            .populate("productId") // populate nếu cần chi tiết

        if (!diagnose) {
            return res.status(404).json({ message: "Diagose not found" });
        }

        return res.status(200).json(diagnose);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching diagose", error: error.message });
    }
};

// Thêm diagose mới
export const createDiagnose = async (req, res) => {
    try {
        const { content, appointmentId, userId, productId = null } = req.body; // Mặc định productId là null nếu không có

        const newDiagnose = new diagose({
            content,
            appointmentId,
            userId,
            productId,
        });

        await newDiagnose.save();

        return res.status(201).json({ message: "Diagose created successfully", diagose: newDiagnose });
    } catch (error) {
        return res.status(500).json({ message: "Error creating diagose", error: error.message });
    }
};

// Cập nhật diagose theo id
export const updateDiagnose = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, appointmentId, userId, productId = null } = req.body;

        const updatedDiagnose = await diagose.findByIdAndUpdate(
            id,
            { content, appointmentId, userId, productId },
            { new: true }
        );

        if (!updatedDiagnose) {
            return res.status(404).json({ message: "Diagose not found" });
        }

        return res.status(200).json({ message: "Diagose updated successfully", diagose: updatedDiagnose });
    } catch (error) {
        return res.status(500).json({ message: "Error updating diagose", error: error.message });
    }
};

// Xóa diagose theo id
export const deleteDiagnose = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm và xóa diagose theo id
        const deletedDiagnose = await diagose.findByIdAndDelete(id);

        if (!deletedDiagnose) {
            return res.status(404).json({ message: "Diagose not found" });
        }

        return res.status(200).json({ message: "Diagose deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting diagose", error: error.message });
    }
};