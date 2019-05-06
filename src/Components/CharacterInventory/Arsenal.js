import React from 'react'
import { Button, Table } from "semantic-ui-react"

class Spellbook extends React.Component {
  state = {
    character_id: this.props.match.params.character_id,
    character: {},
    weapons: [],
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/characters/' + this.props.match.params.character_id)
      .then(resp => resp.json())
      .then(data => this.setState({ character: data, weapons: data.weapons }))
  }

  showCharactersSpells = () => {
    return this.state.weapons.map((weapon, index) =>
      <Table.Row key={index}>
        <Table.Cell>{weapon.name}</Table.Cell>
        <Table.Cell><Button onClick={() => this.handleEquipClick(weapon)}>
          {
              this.state.character.current_weapon_id === weapon.id ?
              "Equipped"
              :
              "Equip"
          }
        </Button></Table.Cell>
        <Table.Cell><Button onClick={() => this.handleDropClick(weapon)}>Drop</Button></Table.Cell>
      </Table.Row>)
  }

  handleWeaponSearchClick = () => {
    this.props.history.push('/weapon-list/' + this.state.character_id)
  }

  handleEquipClick = (weapon) => {
    fetch('http://localhost:3000/api/v1/characters/1', {
      method: "PATCH",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({ current_weapon_id: weapon.id })
    })
      .then(resp => resp.json())
      .then(() => this.props.history.push('/view-charactersheet/' + this.state.character_id))
  }

  handleDropClick = (weapon) => {
      console.log(weapon)
  }

  render() {
    console.log(this.state)
    return (
      <div>
      <Button onClick={() => this.props.history.push('/view-charactersheet/' + this.state.character_id)}>Back to Character</Button>
      <Button onClick={this.handleWeaponSearchClick}>Search Weapons</Button>
      <Table compact>
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Equip
            </Table.HeaderCell>
            <Table.HeaderCell>
              Drop
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
