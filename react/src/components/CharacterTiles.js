import React from "react"
import { Link } from "react-router-dom"

const CharacterTiles = (props) => {
  return (
    <li>
    <Link to={`/characters/${props.id}`}>{props.name}</Link>
    </li>
  )
}

export default CharacterTiles
