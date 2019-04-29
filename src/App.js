import React from 'react';
import './App.css';
import Navbar from './Containers/Navbar.js'
import { Switch, Route, withRouter } from "react-router-dom"
import CreateCharacter from './Containers/CreateCharacter.js'
import ViewChars from './Containers/ViewChars.js'
import ViewCharacter from './Containers/ViewCharacter.js'
import Landing from './Containers/Landing.js'
import ChooseProficiency from './Components/ChooseProficiencies.js'
import { Container } from 'semantic-ui-react'

class App extends React.Component {
  state = {
      user_id: 1,
      character_id: 1,
  }

  sendCharacterToApi = (character) => {
    console.log("character " + character.alignment)
    fetch('http://localhost:3000/api/v1/characters', {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(character)
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setCurrentCharacter(character, () => this.moveToProficiencyChoices())

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
            prof_ids.forEach(id =>
              fetch('http://localhost:3000/api/v1/character_proficiencies', {
                method: 'POST',
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ character_id: character_id, proficiency_id: id})
              })
            )
          })
        }
      )
      this.sendHome()
  }

  sendHome = () => {
    this.props.history.push("/")
  }

  sendList = () => {
    this.props.history.push("/view-characters")
  }

  setCurrentCharacter = (char, callback = () => this.props.history.push("/view-charactersheet")) => {
    this.setState({
      character_id: char.id
    }, callback)
  }

  render() {
    return (
      <React.Fragment>
        <Navbar sendHome={this.sendHome} sendList={this.sendList}/>
          <Container>
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
                render={(routerProps) => <ViewChars {...routerProps} user={this.state.user_id} setCurrentCharacter={this.setCurrentCharacter} /> }
              />
              <Route
                path="/view-charactersheet"
                render={(routerProps) => <ViewCharacter {...routerProps} user={this.state.user_id} character={this.state.character_id} /> }
              />
              <Route
                path="/choose-proficiencies"
                render={(routerProps) => <ChooseProficiency {...routerProps} user={this.state.user_id} setProfIds={this.setProfIds} /> }
              />
            </Switch>
          </Container>
      </React.Fragment>
    )
  }
}

export default withRouter(App);
