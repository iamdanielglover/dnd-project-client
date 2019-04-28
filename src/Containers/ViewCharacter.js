import React from 'react'
import AttributeList from '../Components/CharacterSheetStuff/AttributeList.js'

class ViewCharacter extends React.Component {
  state = {
    character: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/characters/' + this.props.character)
      .then(resp => resp.json())
      .then(data => this.setState({
        character: data
      }))
  }

  render() {
    console.log(this.state.character)
    return (
      <div>
        <AttributeList character={this.state.character}/>
      </div>
    )
  }
}

export default ViewCharacter
