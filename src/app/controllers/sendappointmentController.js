import SendAppointment from '../models/sendappointment.js';
import service from '../models/Service.js';
import Manager from '../models/managers.js';
import Doctor from '../models/doctors.js';
const sendEmail = (to, title, content) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Địa chỉ email từ biến môi trường
            pass: process.env.EMAIL_PASS, // Mật khẩu hoặc mật khẩu ứng dụng từ biến môi trường
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: title,
        text: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error while sending mail:', error);
        }
        console.log('Email sent: ' + info.response);
    });
};

export const createSend = async (req, res) => {
    const { managerID, doctorID, content, title, datesent } = req.body;
    if (!managerID || !doctorID || !content || !title || !datesent) {
        return res.status(400).json({ message: "All required fileds must be provide" });
    }
    try {
        const manager = await Manager.findById(managerID);
        const doctor = await Doctor.findById(doctorID);
        if(!manager || !doctor){
            return res.status(404).json({message: "Manager or Doctor not found"});
        }
        sendEmail(manager.email, title, content);
        sendEmail(doctor.email, title, content);

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
export const deleteSend = async (req, res) => {
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