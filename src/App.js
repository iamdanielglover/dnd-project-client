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
  }

  sendCharacterToApi = (character) => {
    fetch('http://localhost:3000/api/v1/characters', {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(character)
      }).then((response) => response.json())
        .then((responseJson) => {
          this.moveToProficiencyChoices();
      })
  }

  moveToProficiencyChoices = () => {
    this.props.history.push("/choose-proficiencies")
  }

  setProfIds = (chosen_profs, character_id) => {
    let prof_ids = []
    chosen_profs.forEach(prof => {
        fetch('http://localhost:3000/api/v1/proficiencies')
          .then(resp => resp.json())
          .then(data => {
            prof_ids = [...prof_ids, data.find(skill => skill.name.toLowerCase().includes(prof.toLowerCase())).id]
            prof_ids.slice(1, (prof_ids.length)).forEach(id =>
              fetch('http://localhost:3000/api/v1/character_proficiencies', {
                method: 'POST',
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ character_id: character_id, proficiency_id: id})
              })
            )
          })
        }
      )
      this.somethingelse()
  }

  somethingelse = () => {
    this.props.history.push("/")
  }



  render() {
    return (
      <div>
        <Navbar />
            <Switch>
              <Route
                exact path="/"
                render={(routerProps) => <Landing {...routerProps} /> }
              />
              <Route
                path="/create-character"
                render={(routerProps) => <CreateCharacter {...routerProps} userID={this.state.user_id} sendCharacterToApi={this.sendCharacterToApi} /> }
              />
              <Route
                path="/view-characters"
                render={(routerProps) => <ViewChars {...routerProps} user={this.state.user_id} /> }
              />
              <Route
                path="/choose-proficiencies"
                render={(routerProps) => <ChooseProficiency {...routerProps} user={this.state.user_id} setProfIds={this.setProfIds} /> }
              />
            </Switch>
      </div>
    )
  }
}

export default withRouter(App);
