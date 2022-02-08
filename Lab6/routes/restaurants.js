const { response, request } = require("express");
const express = require("express");
const router = express.Router();
const data = require("../data");
const { update } = require("../data/restaurants");
const restaurantsData = data.restaurants;

router.get("/", async (request, response) => {
  try {
    const restaurantList = await restaurantsData.getAll();

    const restaurantsArr = [];
    for (let i = 0; i < restaurantList.length; i++) {
      restaurantsObj = {};
      restaurantsObj = {
        _id: restaurantList[i]._id,
        name: restaurantList[i].name,
      };
      restaurantsArr.push(restaurantsObj);
    }
    response.json(restaurantsArr);
  } catch (e) {
    response.status(404).json({ message: "Not Found" });
  }
});

router.post("/", async (request, response) => {
  const restaurantData = request.body;

  if (!restaurantData.name) {
    response
      .status(400)
      .json({ error: "You must provide name of a restaurant" });
  }
  if (!restaurantData.location) {
    response
      .status(400)
      .json({ error: "You must provide Location of a restaurant" });
  }
  if (!restaurantData.phoneNumber) {
    response
      .status(400)
      .json({ error: "You must provide phone number of a restaurant" });
  }
  if (!restaurantData.website) {
    response
      .status(400)
      .json({ error: "You must provide website of a restaurant" });
  }
  if (!restaurantData.priceRange) {
    response
      .status(400)
      .json({ error: "You must provide price range for a restaurant" });
  }
  if (!restaurantData.cuisines) {
    response
      .status(400)
      .json({ error: "You must provide cuisines for a restaurant" });
  }
  if (!restaurantData.serviceOptions) {
    response.status(400).json({
      error: "You must provide service options for a restaurant",
    });
  }
  try {
    const newRestaurant = await restaurantsData.create(
      restaurantData.name,
      restaurantData.location,
      restaurantData.phoneNumber,
      restaurantData.website,
      restaurantData.priceRange,
      restaurantData.cuisines,
      restaurantData.serviceOptions
    );
    response.status(200).json(newRestaurant);
  } catch (e) {
    response.status(404).json({ error: e.message });
  }
});

router.get("/:id", async (request, response) => {
  if (!request.params.id) {
    response
      .status(400)
      .json({ error: "You must supply an ID to get restaurant." });
  }
  try {
    const restaurant = await restaurantsData.get(request.params.id);
    response.status(200).json(restaurant);
  } catch (e) {
    response.status(404).json({ error: e.message });
  }
});

router.put("/:id", async (request, response) => {
  const restaurantData = request.body;
  if (!request.params.id) {
    response
      .status(400)
      .json({ error: "You must supply an ID to update restaurant." });
  }
  if (!restaurantData.name) {
    response
      .status(400)
      .json({ error: "You must provide name of a restaurant" });
  }
  if (!restaurantData.location) {
    response
      .status(400)
      .json({ error: "You must provide Location of a restaurant" });
  }
  if (!restaurantData.phoneNumber) {
    response
      .status(400)
      .json({ error: "You must provide phone number of a restaurant" });
  }
  if (!restaurantData.website) {
    response
      .status(400)
      .json({ error: "You must provide website of a restaurant" });
  }
  if (!restaurantData.priceRange) {
    response
      .status(400)
      .json({ error: "You must provide price range for a restaurant" });
  }
  if (!restaurantData.cuisines) {
    response
      .status(400)
      .json({ error: "You must provide cuisines for a restaurant" });
  }
  if (!restaurantData.serviceOptions) {
    response.status(400).json({
      error: "You must provide service options for a restaurant",
    });
  }
  try {
    const restaurant = await restaurantsData.get(request.params.id);
    response.status(200).json(restaurant);
  } catch (e) {
    response.status(404).json({ error: "Restaurant on this id not found." });
  }
  try {
    const updatedRestaurant = await restaurantsData.update(
      request.params.id,
      restaurantData.name,
      restaurantData.location,
      restaurantData.phoneNumber,
      restaurantData.website,
      restaurantData.priceRange,
      restaurantData.cuisines,
      restaurantData.serviceOptions
    );
    response.json(updatedRestaurant);
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
});

router.delete("/:id", async (request, response) => {
  if (!request.params.id) {
    response
      .status(400)
      .json({ error: "You must supply an ID to delete restaurant." });
  }
  try {
    await restaurantsData.get(request.params.id);
  } catch (e) {
    response.status(404).json({ error: e.message });
  }
  try {
    await restaurantsData.remove(request.params.id);
    deletedRestaurant = {};
    deletedRestaurant = {
      restaurantId: request.params.id,
      deleted: true,
    };
    response.json(deletedRestaurant);
  } catch (e) {
    response.status(404).json({ error: e.message });
  }
});

module.exports = router;
