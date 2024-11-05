import Review from "../models/review.js";
import mongoose from "mongoose";
class ReviewController {
    // Get all Reviews
    getAll(req, res, next) {
        Review.find()
            .populate("serviceId") // Populate serviceId to retrieve associated service details
            .then((reviews) => res.status(200).json({ data: reviews }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Get a Review by ID
    get(req, res, next) {
        Review.findById(req.params.id)
            .populate("serviceId") // Populate serviceId to retrieve associated service details
            .then((review) => {
                if (!review) {
                    return res.status(404).json({ message: "Review not found" });
                }
                res.status(200).json({ data: review });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Create a new Review
    create(req, res, next) {
        const review = new Review(req.body);
        review
            .save()
            .then((newReview) => res.status(201).json({ data: newReview }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Update a Review by ID
    update(req, res, next) {
        Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedReview) => {
                if (!updatedReview) {
                    return res.status(404).json({ message: "Review not found" });
                }
                res.status(200).json({ data: updatedReview });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Delete a Review by ID
    delete(req, res, next) {
        Review.findByIdAndDelete(req.params.id)
            .then((deletedReview) => {
                if (!deletedReview) {
                    return res.status(404).json({ message: "Review not found" });
                }
                res.status(200).json({ message: "Delete Review successfully!" });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }
    // Get average rating by service ID
    getAverageRating(req, res, next) {
        const { serviceId } = req.params; // Lấy serviceId từ tham số yêu cầu

        Review.find({ serviceId: serviceId })
            .then((reviews) => {
                if (!reviews.length) {
                    return res.status(404).json({ message: "No reviews found for this service" });
                }

                // Chuyển đổi rate sang số và tính tổng
                const totalRating = reviews.reduce((acc, review) => acc + Number(review.rate), 0);
                const averageRating = totalRating / reviews.length;

                res.status(200).json({
                    serviceId,
                    averageRating: averageRating.toFixed(2), // Làm tròn đến 2 chữ số thập phân
                    totalReviews: reviews.length
                });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

}

const reviewController = new ReviewController();
export default reviewController;
