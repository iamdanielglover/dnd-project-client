import React from 'react'
import { Table, Button, Form } from 'semantic-ui-react'

class WeaponList extends React.Component {
  state = {
    weapons: [],
    character: {},
    character_weapons: [],
    searchTerm: "",
  }

  componentDidMount() {
        fetch('http://localhost:3000/api/v1/characters/' + this.props.match.params.character_id)
          .then(resp => resp.json())
          .then(data => this.setState({
            character: data,
            character_weapons: data.weapons.map(wep => wep.id)
          }, () => {
            fetch('http://localhost:3000/api/v1/weapons')
              .then(resp => resp.json())
              .then(data => this.setState({
                weapons: data.filter(weapon => !this.state.character_weapons.includes(weapon.id))
          }))
      })
    )
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

  displayAllWeapons() {
    const weapons = this.state.weapons.filter(weapon => weapon.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    return weapons.map((wep, index) =>
      <Table.Row key={index}>
      <Table.Cell>{wep.name}</Table.Cell>
      <Table.Cell>{this.assignAbilityScore(this.state.character.dexterity)}</Table.Cell>
      <Table.Cell>{this.assignAbilityScore(this.state.character.strength)}</Table.Cell>
      <Table.Cell>{wep.damage}</Table.Cell>
      <Table.Cell><Button onClick={() => this.handleClick(wep)}>Add</Button></Table.Cell>
      </Table.Row>
    )
  }

  handleClick = (wep) => {
    this.addWeaponToArsenal(wep)
  }

  addWeaponToArsenal(wep) {
    fetch("http://localhost:3000/api/v1/character_weapons", {
      method: "POST",
      headers: {"Content-Type" : "application/json" },
      body: JSON.stringify({
        character_id: this.props.match.params.character_id,
        weapon_id: wep.id
      })
    })
      .then(resp => resp.json())
      .then(data => this.setState({ weapons: [...this.state.weapons.filter(wep => wep.id !== data.weapon_id)] }))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <Button onClick={() => this.props.history.goBack()}>Go Back</Button>
      <Form>
        <Form.Field>
          <input onChange={this.handleChange} name="searchTerm" value={this.state.searchTerm} placeholder='Search' />
        </Form.Field>
      </Form>
      <Table compact>
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Weapon
            </Table.HeaderCell>
            <Table.HeaderCell>
              Attack Bonus (for throwing, or if small)
            </Table.HeaderCell>
            <Table.HeaderCell>
              Attack Bonus (else wise)
            </Table.HeaderCell>
            <Table.HeaderCell>
              Damage
            </Table.HeaderCell>
            <Table.HeaderCell>
              Add Weapon to Arsenal
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.displayAllWeapons()}
        </Table.Body>
      </Table>
      </React.Fragment>
    )
  }
}

export default WeaponList

//
// // Display Current Held Weapon, Display Current Held Armor, Display Money, Display Linked Buttons to Armory, WeaponryList & SpellBook
//
// // Spellbook calls on a list of spell ids that are saved in the database, and fetches them from the 3rd party api.
// // We can search for spells in the 3rd party api, and add those spells to our backend.
//
// // Weapons can be made manually, either through a similar process as characters are made, or statically created.
// // Armor will be the same as weapons.
// // We can view our weapons and armor in their subjective inventories and equip one of set of armor, and up to 3 weapons.
// // Equipping armor will dynamically change the value of AC from the naked AC to the equipped AC.
