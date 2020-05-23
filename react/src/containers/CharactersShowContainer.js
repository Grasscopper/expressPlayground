import React, { useState, useEffect } from "react"

const CharactersShowContainer = (props) => {
  let [char, setChar] = useState({
    name: "",
    origin: "",
    description: ""
  })
  let charID = props.match.params.id

  useEffect(() => {
    fetch(`/characters/${charID}`)
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
      setChar({
        name: body[0].name,
        origin: body[0].origin,
        description: body[0].description
      })
    })
  }, [])

  return (
    <div>
      <h1>Character Show Page</h1>
      <h2>{char.name}</h2>
      <p>Origin: {char.origin}</p>
      <p>Description: {char.description}</p>
    </div>
  )
}

export default CharactersShowContainer
