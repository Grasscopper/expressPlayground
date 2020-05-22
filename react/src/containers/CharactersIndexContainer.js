import React, { useState, useEffect } from 'react'

import CharacterTiles from "../components/CharacterTiles"

const CharactersIndexContainer = (props) => {
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
      console.error(`Error fetching characters: ${error.message}`)
    })
  }, [])

  let charTiles = chars.map((char) => {
    return (
      <CharacterTiles
      key={char._id}
      id={char._id}
      name={char.name}
      />
    )
  })

  return (
    <div>
      <h1>Characters Index Page</h1>
      <ul>{charTiles}</ul>
    </div>
  )
}

export default CharactersIndexContainer
