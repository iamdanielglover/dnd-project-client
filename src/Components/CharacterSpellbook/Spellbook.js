import React from 'react'
import { Button, Table, Segment, Image } from "semantic-ui-react"

class Spellbook extends React.Component {
  state = {
    character_id: this.props.match.params.character_id,
    spells: [],
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/characters/' + this.props.match.params.character_id)
      .then(resp => resp.json())
      .then(data => this.setState({ spells: data.spells }))
  }

  showCharactersSpells = () => {
    return this.state.spells.map((spell, index) => <Table.Row key={index}>
    <Table.Cell>{spell.name}</Table.Cell>
    <Table.Cell><Button onClick={() => this.handleClick(spell)}>Details</Button></Table.Cell>
    <Table.Cell><Button onClick={() => this.handleRemoveClick(spell)}>Remove</Button></Table.Cell>
  </Table.Row>)
  }

  handleSpellSearchClick = () => {
    this.props.history.push('/search-spells/' + this.state.character_id)
  }

  handleClick = (spell) => {
      this.props.history.push('/show-spell/' + spell.id)
  }

  handleRemoveClick = (spell) => {
    fetch('http://localhost:3000/api/v1/spells/' + spell.id, {method: "DELETE"})
      .then(resp => resp.json())
      .then(data => this.setState({
        spells: [...this.state.spells.filter(spoll => spoll.id !== spell.id)]
      })
    )
  }

    handleDropClick = (weapon) => {
      fetch('http://localhost:3000/api/v1/character_weapons')
        .then(resp => resp.json())
        .then(data => this.setState({
          char_weps: data
        }, () => {
          console.log(this.state.char_weps.find(wep => wep.character_id === parseInt(this.state.character_id) && wep.weapon_id === weapon.id).id)
          fetch('http://localhost:3000/api/v1/character_weapons/' + this.state.char_weps.find(wep => wep.character_id === parseInt(this.state.character_id) && wep.weapon_id === weapon.id).id, { method: 'DELETE'})
            .then(resp => resp.json())
            .then(data => this.setState({ weapons: this.state.weapons.filter(wep => wep.id !== weapon.id)}))
        }))
      }

  render() {
    console.log(this.state)
    return (
      <div>
      <Button onClick={() => this.props.history.push('/view-charactersheet/' + this.state.character_id)}>Back to Character</Button>
      <Button onClick={this.handleSpellSearchClick}>Search Spells</Button>
      {this.state.spells[0] ?
        <Table compact>
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              View Details
            </Table.HeaderCell>
            <Table.HeaderCell>
              Remove
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.showCharactersSpells()}
        </Table.Body>
      </Table>
      :
      <React.Fragment>
      <Segment textAlign="center">
        <h1>You currently have no spells listed.</h1>
      </Segment>
      <Image src='https://video-images.vice.com/articles/5bcde30c17a7010006070e21/lede/1540307507309-DandD-Cover-Crop.jpeg' size="big" centered circular />
      </React.Fragment>
    }
      </div>
    )
  }
}

export default Spellbook
