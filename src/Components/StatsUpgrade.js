import React from 'react'
import { Button, Card } from 'semantic-ui-react'


class StatsUpgrade extends React.Component {
  state = {
    character: {
      strength: null,
      dexterity: null,
      constitution: null,
      intelligence: null,
      wisdom: null,
      charisma: null,
      level: null,
      experience: null,
      points: null
    },
    loading: true
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/characters/" + this.props.match.params.character_id)
      .then(resp => resp.json())
      .then(data => this.setState({
        character: {
          strength: data.strength,
          dexterity: data.dexterity,
          constitution: data.constitution,
          intelligence: data.intelligence,
          wisdom: data.wisdom,
          charisma: data.charisma,
          level: data.level,
          experience: data.experience,
          points: null,
        },
        loading: false
      }, () => this.setPointsInState())
    )
  }

  setPointsInState() {
    console.log("What")
    this.setState({
      character: { ...this.state.character, points: this.determinePointsToSpend()}
    })
  }

  determinePointsToSpend() {
    const num = (parseInt(this.determineNewLevel()) - parseInt(this.state.character.level))
    return num
  }

  determineNewLevel() {

    if (this.state.character.experience <= 300)
      return 1
    else if (this.state.character.experience <= 900)
      return 2
    else if (this.state.character.experience <= 2700)
      return 3
    else if (this.state.character.experience <= 6500)
      return 4
    else if (this.state.character.experience <= 14000)
      return 5
    else if (this.state.character.experience <= 23000)
      return 6
    else if (this.state.character.experience <= 34000)
      return 7
    else if (this.state.character.experience <= 48000)
      return 8
    else if (this.state.character.experience <= 64000)
      return 9
    else if (this.state.character.experience <= 85000)
      return 10
    else if (this.state.character.experience <= 100000)
      return 11
    else if (this.state.character.experience <= 120000)
      return 12
    else if (this.state.character.experience <= 140000)
      return 13
    else if (this.state.character.experience <= 165000)
      return 14
    else if (this.state.character.experience <= 195000)
      return 15
    else if (this.state.character.experience <= 225000)
      return 16
    else if (this.state.character.experience <= 265000)
      return 17
    else if (this.state.character.experience <= 305000)
      return 18
    else if (this.state.character.experience <= 355000)
      return 19
    else if (this.state.character.experience > 355000)
      return 20
  }

  handleStrengthClick = (stat) => {
    if (this.state.character.points > 0) {
        this.setState({ character: {...this.state.character, strength: this.state.character.strength + 1, points: this.state.character.points - 1}})
    }
  }
  handleDexterityClick = (stat) => {
    if (this.state.character.points > 0) {
        this.setState({ character: {...this.state.character, dexterity: this.state.character.dexterity + 1, points: this.state.character.points - 1}})
    }
  }
  handleConstitutionClick = () => {
    if (this.state.character.points > 0) {
      this.setState({ character: {...this.state.character, constitution: this.state.character.constitution + 1, points: this.state.character.points - 1}})
    }
  }
  handleIntelligenceClick = (stat) => {
    if (this.state.character.points > 0) {
        this.setState({ character: {...this.state.character, intelligence: this.state.character.intelligence + 1, points: this.state.character.points - 1}})
    }
  }
  handleWisdomClick = (stat) => {
    if (this.state.character.points > 0) {
        this.setState({ character: {...this.state.character, wisdom: this.state.character.wisdom + 1, points: this.state.character.points - 1}})
    }
  }
  handleCharismaClick = (stat) => {
    if (this.state.character.points > 0) {
        this.setState({ character: {...this.state.character, charisma: this.state.character.charisma + 1, points: this.state.character.points - 1}})
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.patchRequest()
  }

  patchRequest = () => {
    const newLevel = this.determineNewLevel()
    fetch("http://localhost:3000/api/v1/characters/" + this.props.match.params.character_id, {
      method: "PATCH",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({
        level: newLevel,
        strength: this.state.character.strength,
        dexterity: this.state.character.dexterity,
        constitution: this.state.character.constitution,
        intelligence: this.state.character.intelligence,
        wisdom: this.state.character.wisdom,
        charisma: this.state.character.charisma
      })
    }).then(resp => resp.json())
      .then(() => this.props.history.push("/view-charactersheet/" + this.props.match.params.character_id))
  }



  render() {
    console.log(this.state.character)
    return (
      <React.Fragment>
        <h1 style={{textAlign: "center", paddingTop: "1%"}}>You Have Reached Level {this.determineNewLevel()}</h1>
        <Card.Group style={{textAlign: "center", paddingTop: "1%"}} itemsPerRow={3}>
          <Card>
            <Card.Content>
              <Card.Header> Strength </Card.Header>
              <Card.Meta>{this.state.character.strength}</Card.Meta>
            </Card.Content>
            <Button basic color='green' onClick={ () => this.handleStrengthClick(this.state.character.strength)}>
            +UPGRADE
          </Button>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header> Dexterity </Card.Header>
              <Card.Meta>{this.state.character.dexterity}</Card.Meta>
            </Card.Content>
          <Button basic color='green' onClick={ () => this.handleDexterityClick(this.state.character.dexterity)}>
            +UPGRADE
          </Button>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header> Constitution </Card.Header>
              <Card.Meta>{this.state.character.constitution}</Card.Meta>
            </Card.Content>
          <Button basic color='green' onClick={ () => this.handleConstitutionClick()}>
            +UPGRADE
          </Button>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header> Intelligence </Card.Header>
              <Card.Meta>{this.state.character.intelligence}</Card.Meta>
            </Card.Content>
          <Button basic color='green' onClick={ () => this.handleIntelligenceClick(this.state.character.intelligence)}>
            +UPGRADE
          </Button>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header> Wisdom </Card.Header>
              <Card.Meta>{this.state.character.wisdom}</Card.Meta>
            </Card.Content>
          <Button basic color='green' onClick={ () => this.handleWisdomClick(this.state.character.wisdom)}>
            +UPGRADE
          </Button>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header> Charisma </Card.Header>
              <Card.Meta>{this.state.character.charisma}</Card.Meta>
            </Card.Content>
          <Button basic color='green' onClick={ () => this.handleCharismaClick(this.state.character.charisma)}>
            +UPGRADE
          </Button>
          </Card>
        </Card.Group>
        <div style={{textAlign: "center", paddingTop: "1%"}}>
        {
          this.state.character.points > 0 ?
            <h4>Points: {this.state.character.points}</h4>
            :
            <Button onClick={this.handleSubmit}>Submit</Button>
        }
        </div>
      </React.Fragment>
    )
  }
}

export default StatsUpgrade
