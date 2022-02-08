//#region
const md5 = require("blueimp-md5");
const { Router } = require("express");
const { default: axios } = require("axios");
const publickey = "b554295855906bac6e0f0cb8dd54b0a1";
const privatekey = "19a906b15fd3eb341bdc4233347807b15bd49ca7";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
//#endregion

async function getData(url) {
  //try removing the await keyword and run the application
  let { data } = await axios.get(url);
  // console.dir(data, { depth: null });
  return data;
}

const constructorMethod = (app) => {
  app.get("/", (request, response) => {
    response.render("search", { title: "Character Finder" });
  });

  app.post("/search", async (request, response) => {
    const searchChar = request.body.searchTerm;
    let urlNew =
      baseUrl +
      "?nameStartsWith=" +
      searchChar +
      "&ts=" +
      ts +
      "&apikey=" +
      publickey +
      "&hash=" +
      hash;
    if (searchChar == null || searchChar.trim().length === 0) {
      response.status(400).render("errorForEmpty", {
        searchChar: searchChar,
      });
      return;
    }
    let data = await getData(urlNew);
    if (data.data.results.length == 0) {
      response.status(404).render("error", {
        title: "Character Not Found",
        searchChar: request.body.searchTerm,
      });
    } else {
      arrOfData = [];
      if (data.data.results.length < 20) {
        response.render("characterSearch", {
          title: "Character Found",
          characters: data.data.results,
          searchChar: request.body.searchTerm,
        });
      } else {
        for (let i = 0; i < 20; i++) {
          arrOfData.push(data.data.results[i]);
        }
        response.render("characterSearch", {
          title: "Character Found",
          characters: arrOfData,
          searchChar: request.body.searchTerm,
        });
      }
    }
  });

  app.get("/characters/:id", async (request, response) => {
    try {
      let urlNew =
        baseUrl +
        "/" +
        request.params.id +
        "?ts=" +
        ts +
        "&apikey=" +
        publickey +
        "&hash=" +
        hash;
      let data = await getData(urlNew);
      if (data.data.results.length == 0) {
        response.status(404).render("error", {
          title: "Character Not Found",
          searchChar: request.body.searchTerm,
        });
      } else {
        response.render("charOnId", {
          title: data.data.results[0].name,
          img: data.data.results[0].thumbnail.path + "/portrait_xlarge.jpg",
          description: data.data.results[0].description,
          comics: data.data.results[0].comics.items,
        });
      }
    } catch (e) {
      response.status(404).render("notFoundOnUrl", {
        title: "Character Not Found",
      });
    }
  });
};

module.exports = constructorMethod;
