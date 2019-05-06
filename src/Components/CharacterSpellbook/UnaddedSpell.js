import React from 'react'
import { Button } from 'semantic-ui-react'

// const weirdChars = ['â', '€', '�', 'â', '€', '™']
const weirdCharsRegEx = /[€�â€™]/g

class UnaddedSpell extends React.Component {
  state = {
    api_id: this.props.match.params.api_id,
    spell: {
      name: null,
      description: null,
    }
  }

  componentDidMount() {
      fetch('http://www.dnd5eapi.co/api/spells/' + this.state.api_id)
        .then(resp => resp.json())
        .then(data => this.setState({
          spell: {
            name: data.name,
            description: data.desc.join(" ").replace(weirdCharsRegEx, "")
          }
        }))
      }

      // handleClick = (spell) => {
      //   console.log(spell)
      //   fetch('http://localhost:3000/api/v1/spells', {
      //     method: "POST",
      //     headers: { "Content-Type" : "application/json" },
      //     body: JSON.stringify({
      //       	character_id: this.props.character,
      //       	api_id: spell.url.slice(34),
      //       	name: spell.name
      //       })
      //   }, () => this.props.history.goBack())
      // }

  render() {
    return (
      <React.Fragment>
          <Button onClick={() => this.props.history.goBack()}>Back</Button>
        <h1>{this.state.spell.name}</h1>
        <p>{this.state.spell.description}</p>
      </React.Fragment>
    )
  }
}

export default UnaddedSpell
