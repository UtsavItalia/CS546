let { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
const reviews = mongoCollections.reviews;

const checkEmptyArgs = (
    restaurantId,
    title,
    reviewer,
    rating,
    dateOfReview,
    review,
) => {
    if (
        restaurantId == null ||
        title == null ||
        reviewer == null ||
        rating == null ||
        dateOfReview == null ||
        review == null
    ) {
        throw new Error(
            "You must provide valid information to add a new review.",
        );
    }
};
const checkifStringOrEmpty = (
    restaurantId,
    title,
    reviewer,
    dateOfReview,
    review,
) => {
    if (typeof restaurantId !== "string") {
        throw new Error(`${phoneNumber} you have entered is not string`);
    }
    if (restaurantId.trim().length == 0) {
        throw new Error(`restarurant phone number string is empty`);
    }

    if (typeof title !== "string") {
        throw new Error(`${name} you have entered is not string`);
    }
    if (title.trim().length == 0) {
        throw new Error(`restarurant name string is empty`);
    }

    if (typeof reviewer !== "string") {
        throw new Error(`${location} you have entered is not string`);
    }
    if (reviewer.trim().length == 0) {
        throw new Error(`restarurant location string is empty`);
    }

    if (typeof dateOfReview !== "string") {
        throw new Error(`${website} you have entered is not string`);
    }
    if (dateOfReview.trim().length == 0) {
        throw new Error(`restarurant website string is empty`);
    }

    if (typeof review !== "string") {
        throw new Error(`${priceRange} you have entered is not string`);
    }
    if (review.trim().length == 0) {
        throw new Error(`restarurant price range string is empty`);
    }
};
const checkRating = (rating) => {
    if (typeof rating !== "number") {
        throw new Error(`${rating} you have entered is not number`);
    }
    if (rating < 0 || rating > 5) {
        throw new Error(`Enter valid rating to a review`);
    }
};
const checkDateOfReview = (dateOfReview) => {
    const regDateOfReview = /[0-9]{1,2}(\/)[0-9]{1,2}(\/)[0-9]{1,4}/g;
    if (!regDateOfReview.test(dateOfReview)) {
        throw new Error(
            `Enter a valid date in MM/DD/YYYY format to add a review`,
        );
    }
    const today = new Date();
    if (
        today.getMonth() + 1 != dateOfReview.split("/")[0] ||
        today.getDate() != dateOfReview.split("/")[1] ||
        today.getFullYear() != dateOfReview.split("/")[2]
    ) {
        throw new Error(`Enter valid date to add a review`);
    }
};
const checkId = (id) => {
    if (id == null) {
        throw new Error(`you must provide an id`);
    }
    if (typeof id !== "string") {
        throw new Error(`${id} you have entered is not string`);
    }
    if (id.trim().length == 0) {
        throw new Error(`id string is empty`);
    }
};

const create = async (
    restaurantId,
    title,
    reviewer,
    rating,
    dateOfReview,
    review,
) => {
    checkEmptyArgs(restaurantId, title, reviewer, rating, dateOfReview, review);
    checkifStringOrEmpty(restaurantId, title, reviewer, dateOfReview, review);
    checkRating(rating);
    checkDateOfReview(dateOfReview);

    const restaurantsCollection = await restaurants();
    const newReview = {
        _id: ObjectId(),
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review,
    };
    const updatedRestaurant = await restaurantsCollection.updateOne(
        { _id: ObjectId(restaurantId) },
        { $push: { reviews: newReview } },
    );
    if (
        !updatedRestaurant.modifiedCount === 0 &&
        !updatedRestaurant.matchedCount === 0
    ) {
        throw new Error(
            `Cound not add a review to a restaurant on id ${restaurantId}`,
        );
    }
    const RestaurantWithReview = await restaurantsCollection.findOne({
        _id: ObjectId(restaurantId),
    });

    let SumOfAllRating = 0;
    for (let i = 0; i < RestaurantWithReview.reviews.length; i++) {
        SumOfAllRating += RestaurantWithReview.reviews[i].rating;
    }
    let overallRating;
    overallRating = SumOfAllRating / RestaurantWithReview.reviews.length;
    const restarurantOverallRating = await restaurantsCollection.updateOne(
        { _id: ObjectId(restaurantId) },
        { $set: { overallRating: overallRating } },
    );
    return RestaurantWithReview;
};

const getAll = async (restaurantId) => {
    checkId(restaurantId);
    restaurantId = ObjectId(restaurantId);
    const restaurantsCollection = await restaurants();
    const reviewList = await restaurantsCollection.findOne({
        _id: restaurantId,
    });
    for (let i = 0; i < reviewList.length; i++) {
        reviewList[i]._id = reviewList[i]._id.toString();
    }
    return reviewList.reviews;
};

const get = async (reviewId) => {
    checkId(reviewId);
    reviewId = ObjectId(reviewId);
    const restaurantsCollection = await restaurants();
    const restaurantReview = await restaurantsCollection.findOne({
        "reviews._id": reviewId,
    });
    if (restaurantReview === null) {
        throw new Error(`No review found on id ${reviewId}`);
    }

    for (let i = 0; i < restaurantReview.reviews.length; i++) {
        if (restaurantReview.reviews[i]._id.toString() == reviewId.toString()) {
            restaurantReview.reviews[i]._id == restaurantReview.reviews[i]._id;
            return restaurantReview.reviews[i];
        }
    }
};

const remove = async (reviewId) => {
    checkId(reviewId);
    const restaurantsCollection = await restaurants();
    const reviewToDelete = await get(reviewId);
    const RestaurantWithoutReview = await restaurantsCollection.findOne({
        "reviews._id": ObjectId(reviewId),
    });

    const updatedRestaurantInfo = await restaurantsCollection.updateOne(
        { "reviews._id": ObjectId(reviewId) },
        { $pull: { reviews: reviewToDelete } },
    );
    if (
        !updatedRestaurantInfo.modifiedCount &&
        !updatedRestaurantInfo.matchedCount
    ) {
        throw new Error(
            `Cound not add a review to a restaurant on id ${reviewId}`,
        );
    }

    let SumOfAllRating = 0;
    for (let i = 0; i < RestaurantWithoutReview.reviews.length; i++) {
        SumOfAllRating += RestaurantWithoutReview.reviews[i].rating;
    }
    overallRating = SumOfAllRating / RestaurantWithoutReview.reviews.length;
    const restarurantOverallRating = await restaurantsCollection.updateOne(
        { _id: ObjectId(reviewId) },
        { $set: { overallRating: overallRating } },
    );
    return `${reviewId} has been successfully deleted!`;
};

module.exports = { create, getAll, get, remove };
