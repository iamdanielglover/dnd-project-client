import React from 'react';
import './App.css';
import Navbar from './Containers/Navbar.js'
import { Switch, Route, withRouter } from "react-router-dom"
import CreateCharacter from './Containers/CreateCharacter.js'
import ViewChars from './Containers/ViewChars.js'
import Landing from './Containers/Landing.js'
import ChooseProficiency from './Components/ChooseProficiencies.js'

class App extends React.Component {
  state = {
      user_id: 1,
      user: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/' + this.state.user_id)
      .then(resp => resp.json())
      .then(data => this.setState({
        user: data
      }))
  }

  sendCharacterToApi = (character) => {
    fetch('http://localhost:3000/api/v1/characters', {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(character)
    }).then((response) => response.json())
      .then((responseJson) => {
        this.sendToProficiencyChoices();
  })
  }

  sendToProficiencyChoices = () => {
    this.props.history.push("/choose-proficiencies")
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
              <Route
                path="/choose-proficiencies"
                render={(routerProps) => <ChooseProficiency {...routerProps} user={this.state.user}/> }
              />
            </Switch>
      </div>
    )
  }
}

export default withRouter(App);
