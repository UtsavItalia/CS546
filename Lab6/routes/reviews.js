const { request, response, json } = require("express");
const express = require("express");
const { restaurants } = require("../data");
const router = express.Router();
const data = require("../data");
const reviewsData = data.reviews;

router.get("/:id", async (request, response) => {
    if (!request.params.id) {
        response
            .status(400)
            .json({ error: "You must supply an ID to get a review." });
    }
    try {
        const reviewList = await reviewsData.getAll(request.params.id);
        response.status(200).json(reviewList);
    } catch (e) {
        response.status(404).send({ error: e.message });
    }
});

router.post("/:id", async (request, response) => {
    const reviewData = request.body;
    if (!request.params.id) {
        response
            .status(400)
            .json({ error: "You must supply an ID to get a review." });
    }
    if (!reviewData.title) {
        response
            .status(400)
            .json({ error: "You must provide title of a review" });
    }
    if (!reviewData.reviewer) {
        response
            .status(400)
            .json({ error: "You must provide reviewer to add a review" });
    }
    if (!reviewData.rating) {
        response
            .status(400)
            .json({ error: "You must provide rating to add a review" });
    }
    if (!reviewData.dateOfReview) {
        response
            .status(400)
            .json({ error: "You must provide date of a review" });
    }
    if (!reviewData.review) {
        response
            .status(400)
            .json({ error: "You must provide body of a review" });
    }
    try {
        const newReview = await reviewsData.create(
            request.params.id,
            reviewData.title,
            reviewData.reviewer,
            reviewData.rating,
            reviewData.dateOfReview,
            reviewData.review,
        );
        response.status(200).json(newReview);
    } catch (e) {
        response.status(400).json({ error: e.message });
    }
});

router.get("/review/:id", async (request, response) => {
    if (!request.params.id) {
        response
            .status(400)
            .json({ error: "You must supply an ID to get a review." });
    }
    try {
        const reviewList = await reviewsData.get(request.params.id);
        response.status(200).json(reviewList);
    } catch (e) {
        response.status(404).json({ error: e.message });
    }
});

router.delete("/:id", async (request, response) => {
    try {
        reviewsData.get(request.params.id);
    } catch (e) {
        response.status(404).json({ error: "Review not found on this id." });
    }
    try {
        await reviewsData.remove(request.params.id);
        deletedReview = {};
        deletedReview = {
            reviewId: request.params.id,
            deleted: true,
        };
        response.status(200).json(deletedReview);
    } catch (e) {
        response.status(400).json({ error: e.message });
    }
});

module.exports = router;
