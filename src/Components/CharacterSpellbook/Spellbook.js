import React from 'react'
import { Button, Table } from "semantic-ui-react"

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
    return this.state.spells.map((spell, index) => <Table.Row key={index}><Table.Cell>{spell.name}</Table.Cell><Table.Cell><Button onClick={() => this.handleClick(spell)}>Details</Button></Table.Cell></Table.Row>)
  }

  handleSpellSearchClick = () => {
    this.props.history.push('/search-spells/' + this.state.character_id)
  }

  handleClick = (spell) => {
      this.props.history.push('/show-spell/' + spell.id)
  }

  render() {
    console.log(this.state)
    return (
      <div>
      <Button onClick={this.handleSpellSearchClick}>Search Spells</Button>
      <Table compact>
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Show
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.showCharactersSpells()}
        </Table.Body>
      </Table>
      </div>
    )
  }
}

export default Spellbook
