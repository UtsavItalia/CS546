const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/", async (request, response) => {
    try {
        const people = await peopleData.getPeople();
        response.json(people);
    } catch {
        response.status(500).json({ message: "People data not found" });
    }
});

router.get("/:id", async (request, response) => {
    try {
        const people = await peopleData.getPersonById(request.params.id);
        response.json(people);
    } catch {
        response.status(404).json({ message: e });
    }
});

module.exports = router;
