import React from 'react';
import './App.css';
import Navbar from './Containers/Navbar.js'
import { Switch, Route, withRouter } from "react-router-dom"
import CreateCharacter from './Containers/CreateCharacter.js'
import ViewChars from './Containers/ViewChars.js'
import ViewCharacter from './Containers/ViewCharacter.js'
import Landing from './Containers/Landing.js'
import Login from './Auth/Login.js'
import UpgradeChar from './Containers/UpgradeChar.js'
import ChooseProficiency from './Components/ChooseProficiencies.js'
import StatsUpgrade from './Components/StatsUpgrade.js'
import { Container } from 'semantic-ui-react'

class App extends React.Component {
  state = {
      user_id: 2,
      character_id: 1,
  }

  sendCharacterToApi = (character) => {
    fetch('http://localhost:3000/api/v1/characters', {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(character)
    })
    .then(resp => resp.json())
    .then(data => this.setCurrentCharacter(data, () => this.moveToProficiencyChoices()))
  }

  moveToProficiencyChoices = () => {
    this.props.history.push("/choose-proficiencies")
  }

  setProfIds = (chosen_profs) => {
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
                body: JSON.stringify({ character_id: this.state.character_id, proficiency_id: id})
              })
            )
          })
        }
      )
      this.sendToCharacter()
  }

  sendToCharacter = () => {
    this.props.history.push("/view-charactersheet/" + this.state.character_id)
  }

  sendHome = () => {
    this.props.history.push("/")
  }

  sendList = () => {
    this.props.history.push("/view-characters")
  }

  sendUpgrade = (id) => {
    this.props.history.push("/upgrade-character/" + id)
  }

  setCurrentCharacter = (char, callback = () => this.props.history.push("/view-charactersheet/" + this.state.character_id)) => {
    console.log("happening")
    this.setState({
      character_id: char.id
    }, callback)
  }

  render() {
    console.log(this.state.character_id)
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
                path="/view-charactersheet/:character_id"
                render={(routerProps) => <ViewCharacter {...routerProps} user={this.state.user_id} character={this.state.character_id} sendUpgrade={this.sendUpgrade} /> }
              />
              <Route
                path="/choose-proficiencies"
                render={(routerProps) => <ChooseProficiency {...routerProps} user={this.state.user_id} setProfIds={this.setProfIds} /> }
              />
              <Route
                path="/upgrade-character/:character_id"
                render={(routerProps) => <UpgradeChar {...routerProps} char={this.state.character_id} /> }
              />
              <Route
                path="/stats-upgrade/:character_id"
                render={(routerProps) => <StatsUpgrade {...routerProps} /> }
              />
              <Route
                path="/login"
                render={(routerProps) => <Login {...routerProps} /> }
              />
            </Switch>
          </Container>
      </React.Fragment>
    )
  }
}

export default withRouter(App);
