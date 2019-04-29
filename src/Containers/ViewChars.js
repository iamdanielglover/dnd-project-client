import React from 'react'
import { Card } from 'semantic-ui-react'

class ViewChars extends React.Component {
  state = {
    characters: [],
    races: [],
    klasses: [],
    loading: true
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/' + this.props.user)
      .then(resp => resp.json())
      .then(data => this.setState({
        characters: data.characters
      }, () => {
        fetch('http://localhost:3000/api/v1/races')
          .then(resp => resp.json())
          .then(data => this.setState({
            races: data
          }, () => {
            fetch('http://localhost:3000/api/v1/klasses')
              .then(resp => resp.json())
              .then(data => this.setState({
                klasses: data,
                loading: false
              }))
          }))
      }))
  }

  findCharacterRace = (character) => {
    return this.state.races.find(race => race.id === character.race_id).name
  }

  findCharacterClass = (character) => {
    return this.state.klasses.find(klass => klass.id === character.klass_id).name
  }

  displayListOfNames = () => {
    if (!this.state.loading) {
      return this.state.characters.map((character, index) =>   <Card  key={index} onClick={() => this.handleClick(character)}>
          <Card.Content>
            <Card.Header>{character.name}</Card.Header>
            <Card.Meta>
              <span>Joined in {character.created_at.slice(0,10)}</span>
            </Card.Meta>
            <Card.Description>Level: {character.level}</Card.Description>
            <Card.Description>Race: {this.findCharacterRace(character)}</Card.Description>
            <Card.Description>Class: {this.findCharacterClass(character)}</Card.Description>
          </Card.Content>
        </Card>
      )
    }
  }

  handleClick = (char) => {
    this.props.setCurrentCharacter(char)
  }

render() {
  console.log(this.state)
    return (
      <div>
        <h1>Your Characters</h1>
        {
          this.state.characters ?
        <Card.Group itemsPerRow={4}>
          {this.displayListOfNames()}
        </Card.Group>
        :
        <h3>Empty</h3>
        }
      </div>
    )
}
}

export default ViewChars
