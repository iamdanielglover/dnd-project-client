import React from 'react'
import { Table } from 'semantic-ui-react'
import SavingThrows from './SavingThrows.js'
import EquipmentProficiencies from './EquipmentProficiencies.js'

class AttributeList extends React.Component {
  state = {
    strength: null,
    dexterity: null,
    constitution: null,
    intelligence: null,
    wisdom: null,
    charisma: null
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/characters/" + this.props.char)
      .then(resp => resp.json())
      .then(data => this.setState({
        strength: data.strength,
        dexterity: data.dexterity,
        constitution: data.constitution,
        intelligence: data.intelligence,
        wisdom: data.wisdom,
        charisma: data.charisma
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

  render () {
    return (
      <React.Fragment>
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Attribute
              </Table.HeaderCell>
              <Table.HeaderCell>
                Score
              </Table.HeaderCell>
              <Table.HeaderCell>
                Ability Score
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
            <Table.Cell>Strength</Table.Cell>
            <Table.Cell>{this.state.strength}</Table.Cell>
            <Table.Cell>{this.assignAbilityScore(this.state.strength)}</Table.Cell>
            </Table.Row>

            <Table.Row>
            <Table.Cell>Dexterity</Table.Cell>
            <Table.Cell>{this.state.dexterity}</Table.Cell>
            <Table.Cell>{this.assignAbilityScore(this.state.dexterity)}</Table.Cell>
            </Table.Row>

            <Table.Row>
            <Table.Cell>Constitution</Table.Cell>
            <Table.Cell>{this.state.constitution}</Table.Cell>
            <Table.Cell>{this.assignAbilityScore(this.state.constitution)}</Table.Cell>
            </Table.Row>

            <Table.Row>
            <Table.Cell>Intelligence</Table.Cell>
            <Table.Cell>{this.state.intelligence}</Table.Cell>
            <Table.Cell>{this.assignAbilityScore(this.state.intelligence)}</Table.Cell>
            </Table.Row>

            <Table.Row>
            <Table.Cell>Wisdom</Table.Cell>
            <Table.Cell>{this.state.wisdom}</Table.Cell>
            <Table.Cell>{this.assignAbilityScore(this.state.wisdom)}</Table.Cell>
            </Table.Row>

            <Table.Row>
            <Table.Cell>Charisma</Table.Cell>
            <Table.Cell>{this.state.charisma}</Table.Cell>
            <Table.Cell>{this.assignAbilityScore(this.state.charisma)}</Table.Cell>
            </Table.Row>

          </Table.Body>
        </Table>

        <SavingThrows char={this.props.char}/>
        <EquipmentProficiencies char={this.props.char}/>

      </React.Fragment>
    )
  }
}

export default AttributeList
