import React from 'react'

// const weirdChars = ['â', '€', '�', 'â', '€', '™']
const weirdCharsRegEx = /[€�â€™]/g

class Spell extends React.Component {
  state = {
    spell_id: this.props.match.params.spell_id,
    api_id: null
    spell: {
      name: null,
      description: null,
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/spells' + this.state.spell_id)
      .then(resp => resp.json())
      .then(data => this.setState({ api_id: data.api_id}, () => {

      }))

    fetch('http://www.dnd5eapi.co/api/spells/' + this.state.api_id)
      .then(resp => resp.json())
      .then(data => this.setState({
        spell: {
          name: data.name,
          description: data.desc.join(" ").replace(weirdCharsRegEx, "")
        }
      }))
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <h1>{this.state.spell.name}</h1>
        <p>{this.state.spell.description}</p>
      </React.Fragment>
    )
  }
}

export default Spell
