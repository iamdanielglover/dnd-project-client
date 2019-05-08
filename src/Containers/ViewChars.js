import React from 'react'
import { Card, Button, Image, Segment } from 'semantic-ui-react'
import './StyleSheet.css'

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
      return this.state.characters.map((character, index) =>   <Card id="card-border"  key={index}>
          <Card.Content>
            <Card.Header>{character.name}</Card.Header>
            <Card.Meta>
              <span>Joined in {character.created_at.slice(0,10)}</span>
            </Card.Meta>
            <Card.Description>Level: {character.level}</Card.Description>
            <Card.Description>Race: {this.findCharacterRace(character)}</Card.Description>
            <Card.Description>Class: {this.findCharacterClass(character)}</Card.Description>
          </Card.Content>
              <Button compact onClick={() => this.handleClick(character)}>View</Button>
              <Button negative={true} compact onClick={() => this.handleDeleteClick(character)}>Delete</Button>
        </Card>
      )
    }
  }

  handleClick = (char) => {
    this.props.setCurrentCharacter(char)
  }

  handleDeleteClick = (character) => {
    fetch('http://localhost:3000/api/v1/characters/' + character.id, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(data => this.setState({
      characters: [...this.state.characters.filter(char => char.id !== data.id)]
    }))
  }

render() {
    return (
      <div>
        {
          this.state.characters[0] ?
          <React.Fragment>
          <h1 style={{textAlign: "center"}}>Your Characters</h1>
          <Card.Group centered itemsPerRow={4}>
            {this.displayListOfNames()}
          </Card.Group>
        </React.Fragment>
        :
        <React.Fragment>
        <Segment textAlign="center">
          <h1>No Available Characters</h1>
          <Button style={{float: "center"}} onClick={() => this.props.history.push("/create-character")}>Create Character</Button>
        </Segment>
        <Image src='https://video-images.vice.com/articles/5bcde30c17a7010006070e21/lede/1540307507309-DandD-Cover-Crop.jpeg' size="big" centered circular />
        </React.Fragment>
        }
      </div>
    )
}
}

export default ViewChars
