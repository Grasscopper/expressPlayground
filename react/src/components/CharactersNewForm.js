import React, { useState } from "react"

const CharactersNewForm = (props) => {
  let [name, setName] = useState({
    name: ""
  })

  const sendNewChar = (event) => {
    event.preventDefault()
    props.postNewChar(name)
  }

  const update = (event) => {
    event.preventDefault()
    setName({
      name: event.currentTarget.value
    })
  }

  return (
    <form onSubmit={sendNewChar}>
      <label htmlFor="name">Name</label>
      <input
      id="name"
      name="name"
      type="text"
      value={name.name}
      onChange={update}
      />
      <button type="submit" value="Submit">Add New Character</button>
    </form>
  )
}

export default CharactersNewForm
