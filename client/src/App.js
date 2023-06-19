import axios from "axios";
import "./App.css";
import "./casino.css";
import React, { useState } from "react";

/*
* =============================
  * Author: [Pelevin Victor] 
  * Date: [2023.6.19]
* =============================
*/

function App() {
  const [username, setUsername] = useState("");
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [spaceships, setSpaceships] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //When press Enter,call function
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }
  //When function called, send search data to server
  const handleSubmit = () => {
    if(username){
    setIsLoading(true);
    axios.get(`http://localhost:5000/search/${username}`).then((res) => {
      setCharacters(res.data[0]);
      setPlanets(res.data[1]);
      setSpaceships(res.data[2]);
      setIsLoading(false);
    });
  }
  else{
    setCharacters([]);
      setPlanets([]);
      setSpaceships([]);
  }
  };

  return (
    <div>
      <div>
        <h1>Casino test(node.js)</h1>
      </div>
      <div className="component-search-input">
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Input searchvalue and press Enter"
        />
      </div>
      {isLoading ? (
        <div style={{marginTop:"10%"}}>
          <div>Loading...</div>
          <img
            src="/loading.gif" alt="Loading..."
          />
        </div>
      ) : (
        <div>
          <div>
            {characters.length > 0 ? (
              <div>
                <h3>Characters</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {characters.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <div>
            {planets.length > 0 ? (
              <div>
                <h3>Planets</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Diameter</th>
                      <th>Population</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planets.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.diameter}</td>
                        <td>{item.population}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <div>
            {spaceships.length > 0 ? (
              <div>
                <h3>Spaceships</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Length</th>
                      <th>Crew</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spaceships.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.length}</td>
                        <td>{item.crewSize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
