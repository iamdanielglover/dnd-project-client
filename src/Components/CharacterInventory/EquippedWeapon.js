import React from "react"
import { Table } from 'semantic-ui-react'

class EquippedWeapon extends React.Component {
  state = {
    character: null,
    equipped_weapon: null,
    loading: true
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/characters/' + this.props.char)
      .then(resp => resp.json())
      .then(data => this.setState({
         character: data
       }, () => {
         fetch('http://localhost:3000/api/v1/weapons/' + this.state.character.current_weapon_id)
          .then(resp => resp.json())
          .then(data => this.setState({ equipped_weapon: data, loading: false }))
       }))
  }

  assignAbilityScore = (number) => {
    if (number < 2)
      return -5
    else if (number < 4)
      return -4
    else if (number < 6)
      return -3
    else if (number < 8)
      return -2
    else if (number < 10)
      return -1
    else if (number < 12)
      return 0
    else if (number < 14)
      return 1
    else if (number < 16)
      return 2
    else if (number < 18)
      return 3
    else if (number < 20)
      return 4
    else if (number => 20)
      return 5
  }

  render() {
    return (

      <React.Fragment>
      {!this.state.loading ?
        <Table.Row>
          <Table.Cell>{this.state.equipped_weapon.name}</Table.Cell>
          <Table.Cell>{this.assignAbilityScore(this.state.character.strength)}</Table.Cell>
          <Table.Cell>{this.assignAbilityScore(this.state.character.dexterity)}</Table.Cell>
          <Table.Cell>{this.state.equipped_weapon.damage}</Table.Cell>
        </Table.Row>
        :
        <Table.Row>
        <Table.Cell>My Secret</Table.Cell>
        <Table.Cell>Secret</Table.Cell>
        <Table.Cell>Secret</Table.Cell>
        <Table.Cell>Secret</Table.Cell>
      </Table.Row>
      }
      </React.Fragment>
    )
  }
}

export default EquippedWeapon
