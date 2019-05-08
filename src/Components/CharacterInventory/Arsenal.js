import React from 'react'
import { Button, Table, Segment, Image } from "semantic-ui-react"

class Spellbook extends React.Component {
  state = {
    character_id: this.props.match.params.character_id,
    character: {},
    weapons: [],
    char_weps: []
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
              "Unequip"
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
    fetch('http://localhost:3000/api/v1/characters/' + this.state.character_id, {
      method: "PATCH",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({ current_weapon_id: weapon.id })
    })
      .then(resp => resp.json())
      .then(() => this.props.history.push('/view-charactersheet/' + this.state.character_id))
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
        <h1>Weapon Inventory</h1>
      <Button onClick={() => this.props.history.push('/view-charactersheet/' + this.state.character_id)}>Back to Character</Button>
      <Button onClick={this.handleWeaponSearchClick}>Search Weapons</Button>
      {
        this.state.weapons[0] ?
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
          :
          <React.Fragment>
          <Segment textAlign="center">
            <h1>Search for Weapons and add them to your store.</h1>
          </Segment>
          <Image src='https://video-images.vice.com/articles/5bcde30c17a7010006070e21/lede/1540307507309-DandD-Cover-Crop.jpeg' size="big" centered circular />
          </React.Fragment>
      }

      </div>
    )
  }
}

export default Spellbook

// fetch('http://localhost:3000/api/v1/character_weapons/' + character_weapon.id, { method: 'DELETE'})
//   .then(resp => resp.json())
//   .then(data => this.setState({ weapons: this.state.weapons.filter(wep => wep.id !== weapon.id)}))
// })

// let thing = data.filter(wep => wep.character_id === parseInt(this.state.character_id) && wep.weapon_id === weapon.id)
//   fetch('http://localhost:3000/api/v1/character_weapons/' + thing.id, {method: "DELETE"})
//   .then(resp => resp.json())
//   .then(data => this.setState({ weapons: [...this.state.weapons.filter(weapon => weapon.id !== data.weapon_id)] }))
