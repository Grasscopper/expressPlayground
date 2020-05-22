import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import CharacterTiles from "../components/CharacterTiles"

const App = (props) => {
  let [chars, setChars] = useState([])
  useEffect(() => {
    fetch('/characters')
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status}: ${response.statusText}`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((body) => {
      setChars(body)
    })
    .catch((error) => {
      console.error(`Error in fetch: ${error.message}`)
    })
  }, [])

  let charTiles = chars.map((char) => {
    return (
      <CharacterTiles
      key={char}
      name={char}
      />
    )
  })

  return (
    <div className="App">
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        {charTiles}
        </header>
    </div>
  )
}

export default App;
