import Diagnose from "../models/diagnose.js";

class DiagnoseController {
    // Get all Diagnoses
    getAll(req, res, next) {
        Diagnose.find({})
            .populate("appointmentId")
            .populate("userId")
            .populate("productId")
            .then((diagnoses) => res.status(200).json({ data: diagnoses }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Get a Diagnose by ID
    get(req, res, next) {
        Diagnose.findById(req.params.id)
            .populate("appointmentId")
            .populate("userId")
            .populate("productId")
            .then((diagnose) => {
                if (!diagnose) {
                    return res.status(404).json({ message: "Diagnose not found" });
                }
                res.status(200).json({ data: diagnose });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Create a new Diagnose
    create(req, res, next) {
        const diagnose = new Diagnose(req.body);
        diagnose
            .save()
            .then((newDiagnose) => res.status(201).json({ data: newDiagnose }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Update a Diagnose by ID
    update(req, res, next) {
        Diagnose.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedDiagnose) => {
                if (!updatedDiagnose) {
                    return res.status(404).json({ message: "Diagnose not found" });
                }
                res.status(200).json({ data: updatedDiagnose });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Delete a Diagnose by ID
    delete(req, res, next) {
        Diagnose.findByIdAndDelete(req.params.id)
            .then((deletedDiagnose) => {
                if (!deletedDiagnose) {
                    return res.status(404).json({ message: "Diagnose not found" });
                }
                res.status(200).json({ message: "Diagnose deleted successfully!" });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }
}

const diagnoseController = new DiagnoseController();
export default diagnoseController;
