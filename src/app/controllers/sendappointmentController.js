// SendAppointment 
import SendAppointment from '../models/sendappointment.js';
import service from '../models/Service.js';
// import Manager from './managersController.js';
// import Doctor from './doctorsController.js';
import nodemailer from 'nodemailer';

export const createSend = async (req, res) => {
    const { managerID, doctorID, content, title, datesent } = req.body;
    if (!managerID || !doctorID || !content || !title || !datesent) {
        return res.status(400).json({ message: "All required fileds must be provide" });
    }
    try {
        const newSendAppointment = new SendAppointment({
            managerID,
            doctorID,
            content,
            title,
            datesent,
        });
        await newSendAppointment.save();
        res.status(201).json({ message: "Send created successfully", data: newSendAppointment });
    } catch (error) {
        res.status(500).json({ message: "Failed to create send", error: error.message });
    }
};
export const getSend = async (req, res) => {
    try {
        const allSend = await SendAppointment.find();
        res.status(200).json({ message: "Success", data: allSend });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving send", error: error.message });
    }
};
export const getSendID = async (req, res) => {
    try {
        const { id } = req.params;
        const send = await SendAppointment.findById(id);
        if (!send) {
            return res.status(404).json({ message: "Send not found" });
        }
        res.status(200).json({ message: "Success", data: SendAppointment });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving send", error: message });
    }
};
export const deletedSend = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteSend = await SendAppointment.findByIdAndDelete(id);
        if (!deleteSend) {
            return res.status(404).json({ message: "Send not found" });
        }
        res.status(200).json({ message: "Send deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting send", error: error.message })
    }
};