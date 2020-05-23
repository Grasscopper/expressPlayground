import React, { useState } from "react"

const CharactersNewForm = (props) => {
  let [char, setChar] = useState({
    name: "",
    origin: "",
    description: ""
  })

  const sendNewChar = (event) => {
    event.preventDefault()
    props.postNewChar(char)
  }

  const update = (event) => {
    event.preventDefault()
    setChar({
      ...char,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  return (
    <form onSubmit={sendNewChar}>

      <label htmlFor="name">
      Name
      <input
      id="name"
      name="name"
      type="text"
      value={char.name}
      onChange={update}
      />
      </label>

      <label htmlFor="origin">
      Origin
      <input
      id="origin"
      name="origin"
      type="text"
      value={char.origin}
      onChange={update}
      />
      </label>

      <label htmlFor="description">
      Description
      <input
      id="description"
      name="description"
      type="text"
      value={char.description}
      onChange={update}
      />
      </label>

      <button type="submit" value="Submit">Add New Character</button>
    </form>
  )
}

export default CharactersNewForm
