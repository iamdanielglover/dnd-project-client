import React from 'react';
import './App.css';
import Navbar from './Containers/Navbar.js'
import { Switch, Route, withRouter } from "react-router-dom"
import CreateCharacter from './Containers/CreateCharacter.js'
import ViewChars from './Containers/ViewChars.js'
import Landing from './Containers/Landing.js'

class App extends React.Component {
  state = {
      user: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/1')
      .then(resp => resp.json())
      .then(data => this.setState({
        user: data
      }))
  }

  sendCharacterToApi(character) {
    fetch('http://localhost:3000/api/v1/characters', {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(character)
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
            <Switch>
              <Route
                exact path="/"
                render={(routerProps) => <Landing {...routerProps} /> }
              />
              <Route
                path="/create-character"
                render={(routerProps) => <CreateCharacter {...routerProps} sendCharacterToApi={this.sendCharacterToApi} /> }
              />
              <Route
                path="/view-characters"
                render={(routerProps) => <ViewChars {...routerProps} /> }
              />
            </Switch>
      </div>
    )
  }
}

export default withRouter(App);
