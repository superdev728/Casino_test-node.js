##About this project
/*
* =============================
  * Author: [Pelevin Victor] 
  * Date: [2023.6.19]
* =============================
*/
-This project is slow to load.
    Here's why.
        It is slow because it has to compare local search data with online data and import only matched data.
    my opinion
        In order to speed up the loading speed, first of all, all online materials should be stored in local databases.
        I think that would speed things up since the work only happens locally.
        So I think it will be faster if I create a data base for this project in a local area and store all the data there.


## Technologies Used
- React: front-end framework for building UI components
- Node.js: runtime environment for JavaScript on the server-side
- Express: back-end framework for building web applications
- Axios: HTTP client library for making API requests
- SWAPI: Star Wars API for retrieving data about characters, planets, and spaceships

## Features
- User can type in a search term for a character, planet, or spaceship in the input field.
- User can press "Enter" to trigger the search.
- If one or more results are found, they will be displayed in tables under their respective categories.
- Each table displays relevant information about the search results (e.g. name, gender, weight for characters).
- If no results are found, an empty table will be displayed with a message indicating that no results were found.

## 
App.js
                    ...
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Input searchvalue and press Enter"
        />
                    ...
        axios.get(`http://localhost:5000/search/${username}`)   
                    ...
        When you search, the value entered in the search field sends the value of username along the http://localhost:5000/search/ url.
        Here, username is the value entered in the search field.
casino.js
                    ...
       app.get(`/search/:name`, async (req, res) => {
                    ...
        This code part is the part that receives the value entered in the search field from the node side.        

        Now we need to get the values for all characters, planets and spaceships that match the search input from https://swapi.dev/api/ based on the search content.
                    ...
        `https://swapi.dev/api/people/?search=${searchName}`(search for characters)
        `https://swapi.dev/api/planets/?search=${searchName}`(search for planets)
        `https://swapi.dev/api/starships/?search=${searchName}`(search for spaceships)
                    ...
##
        Following code is getting charcater search result
        const characters = characterSearchResult.data.results.map((character) => ({
            name: character.name,
            gender: character.gender,
            weight: character.mass,
            type: "character",
        }));

        Following code is getting planets search result
        const planets = planetSearchResult.data.results.map((planet) => ({
            name: planet.name,
            diameter: planet.diameter,
            population: planet.population,
            type: "planet",
        }));

        Followig code is getting spaceships search result
        const spaceships = spaceshipSearchResult.data.results.map((spaceship) => ({
            name: spaceship.name,
            length: spaceship.length,
            crewSize: spaceship.crew,
            type: "spaceship",
        }));


                    ...
##
        Following code is sending search Json results to frontend

        const searchResults = [];
        searchResults.push(characters);
        searchResults.push(planets);
        searchResults.push(spaceships);
        console.log(searchResults);
        res.json(searchResults);
                    ...

        On the front-end side, the result was displayed using useState() and table tag.


        





    