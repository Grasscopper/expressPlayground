import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CharactersIndexContainer from "./CharactersIndexContainer"
import CharactersShowContainer from "./CharactersShowContainer"

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={CharactersIndexContainer} />
          <Route exact path="/characters" component={CharactersIndexContainer} />
          <Route exact path="/characters/:id" component={CharactersShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
