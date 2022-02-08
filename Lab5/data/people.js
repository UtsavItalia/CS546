const axios = require("axios");

async function getPeople() {
    //try removing the await keyword and run the application
    let { data } = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json",
    );
    return data;
}

const getPersonById = async (id) => {
    let data = await getPeople();
    for (i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i];
        }
    }
    throw `there is no person with that ID`;
};

module.exports = {
    getPeople,
    getPersonById,
};
