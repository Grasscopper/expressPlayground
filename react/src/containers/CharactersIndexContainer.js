import React, { useState, useEffect } from 'react'

import CharacterTiles from "../components/CharacterTiles"
import CharactersNewForm from "../components/CharactersNewForm"

const CharactersIndexContainer = (props) => {
  let [chars, setChars] = useState([])

  const getChars = () => {
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
    .then((chars) => {
      setChars(chars)
    })
    .catch((error) => {
      console.error(`Error fetching characters: ${error.message}`)
    })
  }

  useEffect(() => {
    getChars()
  }, [])

  const postNewChar = (formPayload) => {
    fetch('/characters', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
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
    .then((char) => {
      setChars([
        ...chars,
        char
      ])
    })
    .catch((error) => {
      console.error(`Error posting character: ${error.message}`)
    })
  }

  const deleteChar = (charID) => {
    fetch(`/characters/${charID}`, {
      credentials: 'same-origin',
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
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
    .then((chars) => {
      setChars(chars)
    })
    .catch((error) => {
      console.error(`Error deleting character: ${error.message}`)
    })
  }

  const editChar = (charID, char) => {
    fetch(`/characters/${charID}`, {
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify(char),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
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
    .then((chars) => {
      setChars(chars)
    })
  }

  let charTiles = chars.map((char) => {
    return (
      <CharacterTiles
      key={char._id}
      id={char._id}
      name={char.name}
      deleteChar={deleteChar}
      editChar={editChar}
      />
    )
  })

  return (
    <div>
      <h1>Characters Index Page</h1>
      <CharactersNewForm postNewChar={postNewChar} />
      <ul>{charTiles}</ul>
    </div>
  )
}

export default CharactersIndexContainer
