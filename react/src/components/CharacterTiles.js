import React, { useState } from "react"
import { Link } from "react-router-dom"

const CharacterTiles = (props) => {
  let [char, setChar] = useState({
    name: "",
    origin: "",
    description: ""
  })

  const sendDeleteChar = (event) => {
    event.preventDefault()
    props.deleteChar(props.id)
  }

  const update = (event) => {
    event.preventDefault()
    setChar({
      ...char,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const sendEditChar = (event) => {
    event.preventDefault()
    props.editChar(props.id, char)
  }

  return (
    <>
      <li>
      <Link to={`/characters/${props.id}`}>{props.name}</Link>
      <button onClick={sendDeleteChar}>Delete</button>
      </li>
      <form onSubmit={sendEditChar}>
        <label htmlFor='name'>Name
        <input
        id='name'
        name='name'
        type='text'
        value={char.name}
        onChange={update}
        />
        </label>

        <label htmlFor='origin'>Origin
        <input
        id='origin'
        name='origin'
        type='text'
        value={char.origin}
        onChange={update}
        />
        </label>

        <label htmlFor='description'>Description
        <input
        id='description'
        name='description'
        type='text'
        value={char.description}
        onChange={update}
        />
        </label>

        <input type='submit' value='Submit' />
      </form>
    </>
  )
}

export default CharacterTiles
