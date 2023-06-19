const axios = require("axios");
const express = require("express");
const cors = require("cors");
const path = require('path');
/*
* =============================
  * Author: [Pelevin Victor] 
  * Date: [2023.6.19]
* =============================
*/
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// app.use(express.static(path.join(__dirname, '/build')));

// app.get('*', function (request, response) {
//     response.sendFile(path.resolve(__dirname + '/build', 'index.html'));
// });
const PORT = 5000;

/// Define an API endpoint for searching characters, planets and spaceships by name
app.get(`/search/:name`, async (req, res) => {
  try {
    const searchName = req.params.name;
    // Search for characters whose name matches the user's input
    const characterSearchResult = await axios.get(
      `https://swapi.dev/api/people/?search=${searchName}`
    );
    const characters = characterSearchResult.data.results.map(character => {
      return {
        name: character.name,
        gender: character.gender,
        weight: character.mass,
        type: "character"
      };
    });

    // Search for planets whose name matches the user's input
    const planetSearchResult = await axios.get(
      `https://swapi.dev/api/planets/?search=${searchName}`
    );
    const planets = planetSearchResult.data.results.map(planet => ({
      name: planet.name,
      diameter: planet.diameter,
      population: planet.population,
      type: "planet"
    }));

    // Search for spaceships whose name matches the user's input
    const spaceshipSearchResult = await axios.get(
      `https://swapi.dev/api/starships/?search=${searchName}`
    );
    const spaceships = spaceshipSearchResult.data.results.map(spaceship => ({
      name: spaceship.name,
      length: spaceship.length,
      crewSize: spaceship.crew,
      type: "spaceship",
    }));

    const searchResults = [];
    searchResults.push(characters);
    searchResults.push(planets);
    searchResults.push(spaceships);
    res.json(searchResults);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

/// Start the web server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
