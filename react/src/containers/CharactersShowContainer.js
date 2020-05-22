import React, { useState, useEffect } from "react"

const CharactersShowContainer = (props) => {
  let [char, setChar] = useState(null)
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
      setChar(body[0].name)
    })
  }, [])
  
  return (
    <div>
      <h1>Character Show Page</h1>
      <h2>{char}</h2>
    </div>
  )
}

export default CharactersShowContainer
