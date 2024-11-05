import sendappointment from "../models/sendappointment.js"; // Đảm bảo đường dẫn đúng tới model Email

class SendController {
    // Lấy tất cả email đã gửi
    getAll(req, res, next) {
        sendappointment.find()
            .populate('managerID') // Population cho managerID
            .populate('doctorID') // Population cho doctorID
            .then((emails) => res.status(200).json({ data: emails }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Lấy email đã gửi theo ID
    get(req, res, next) {
        sendappointment.findById(req.params.id)
            .populate('managerID') // Population cho managerID
            .populate('doctorID') // Population cho doctorID
            .then((email) => {
                if (!email) {
                    return res.status(404).json({ message: "Email not found" });
                }
                res.status(200).json({ data: email });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Tạo một email mới
    create(req, res, next) {
        const email = new sendappointment(req.body);
        email
            .save()
            .then((newEmail) => res.status(201).json({ data: newEmail }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Cập nhật email theo ID
    update(req, res, next) {
        sendappointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .populate('managerID') // Population cho managerID
            .populate('doctorID') // Population cho doctorID
            .then((updatedEmail) => {
                if (!updatedEmail) {
                    return res.status(404).json({ message: "Email not found" });
                }
                res.status(200).json({ data: updatedEmail });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Xóa email theo ID
    delete(req, res, next) {
        sendappointment.findByIdAndDelete(req.params.id)
            .then((deletedEmail) => {
                if (!deletedEmail) {
                    return res.status(404).json({ message: "Email not found" });
                }
                res.status(200).json({ message: "Delete email successfully!" });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }
}

const sendController = new SendController();
export default sendController;
