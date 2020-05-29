import React from "react"
import { Link } from "react-router-dom"

const CharacterTiles = (props) => {
  const sendDeleteChar = (event) => {
    event.preventDefault()
    props.deleteChar(props.id)
  }
  
  return (
    <li>
    <Link to={`/characters/${props.id}`}>{props.name}</Link>
    <button onClick={sendDeleteChar}>Delete</button>
    </li>
  )
}

export default CharacterTiles
