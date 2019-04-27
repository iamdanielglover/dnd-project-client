import React from 'react'

class ViewChars extends React.Component {
  state = {
    characters: [],
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/' + this.props.user)
      .then(resp => resp.json())
      .then(data => this.setState({
        characters: data.characters
      }))
  }

  displayListOfNames = () => {
    return this.state.characters.map((character, index) => <li key={index}>{character.name}</li>)
  }

render() {
  console.log(this.state.characters)
    return (
      <div>
        <h3>Whips and Shit</h3>
        <ul>
          {this.displayListOfNames()}
        </ul>
      </div>
    )
}
}

export default ViewChars
