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

    if (this.state.character.experience >= 300)
      return 2
    else if (this.state.character.level >= 900)
      return 3
    else if (this.state.character.level >= 2700)
      return 4
    else if (this.state.character.level >= 6500)
      return 5
    else if (this.state.character.level >= 14000)
      return 6
    else if (this.state.character.level >= 23000)
      return 7
    else if (this.state.character.level >= 34000)
      return 8
    else if (this.state.character.level >= 48000)
      return 9
    else if (this.state.character.level >= 64000)
      return 10
    else if (this.state.character.level >= 85000)
      return 11
    else if (this.state.character.level >= 100000)
      return 12
    else if (this.state.character.level >= 120000)
      return 13
    else if (this.state.character.level >= 140000)
      return 14
    else if (this.state.character.level >= 165000)
      return 15
    else if (this.state.character.level >= 195000)
      return 16
    else if (this.state.character.level >= 225000)
      return 17
    else if (this.state.character.level >= 265000)
      return 18
    else if (this.state.character.level >= 305000)
      return 19
    else if (this.state.character.level >= 355000)
      return 20
  }

  render() {
    console.log(this.state.character)
    return (
      <React.Fragment>
        <h1 style={{textAlign: "center", paddingTop: "1%"}}>Level Up!</h1>
        <small >Points: {this.state.character.points}</small>
        <Card.Group style={{textAlign: "center", paddingTop: "1%"}} itemsPerRow={3}>
          <Card>
            <Card.Content>
              <Card.Header> Strength </Card.Header>
              <Card.Meta>{this.state.character.strength}</Card.Meta>
            </Card.Content>
            <Button basic color='green'>
            +UPGRADE
          </Button>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header> Dexterity </Card.Header>
              <Card.Meta>{this.state.character.dexterity}</Card.Meta>
            </Card.Content>
            <Button basic color='green'>
            +UPGRADE
          </Button>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header> Constitution </Card.Header>
              <Card.Meta>{this.state.character.constitution}</Card.Meta>
            </Card.Content>
            <Button basic color='green'>
            +UPGRADE
          </Button>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header> Intelligence </Card.Header>
              <Card.Meta>{this.state.character.intelligence}</Card.Meta>
            </Card.Content>
            <Button basic color='green'>
            +UPGRADE
          </Button>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header> Wisdom </Card.Header>
              <Card.Meta>{this.state.character.wisdom}</Card.Meta>
            </Card.Content>
            <Button basic color='green'>
            +UPGRADE
          </Button>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header> Charisma </Card.Header>
              <Card.Meta>{this.state.character.charisma}</Card.Meta>
            </Card.Content>
            <Button basic color='green'>
            +UPGRADE
          </Button>
          </Card>
        </Card.Group>
        <p>You are now level {this.determineNewLevel()}</p>
      </React.Fragment>
    )
  }
}

export default StatsUpgrade
