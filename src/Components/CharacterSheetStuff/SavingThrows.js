import React from 'react'
import { Table } from 'semantic-ui-react'

class SavingThrows extends React.Component {
  state = {
    character: {
      strength: null,
      dexterity: null,
      constitution: null,
      intelligence: null,
      wisdom: null,
      charisma: null,
    },
    klass_id: null,
    proficiency_bonus: null,
    savingThrows: [],
    loading: true
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/characters/" + this.props.char)
      .then(resp => resp.json())
      .then(data => this.setState({
        character: {
          strength: data.strength,
          dexterity: data.dexterity,
          constitution: data.constitution,
          intelligence: data.intelligence,
          wisdom: data.wisdom,
          charisma: data.charisma,
        },
        klass_id: data.klass_id,
        proficiencyBonus: data.proficiency_bonus
      }, () => {
        fetch('http://www.dnd5eapi.co/api/classes/' + this.state.klass_id)
          .then(resp => resp.json())
          .then(data => this.setState({
            savingThrows: data.saving_throws,
            loading: false
          }))
      }))
  }


  setScore(attribute, string) {
    if (this.state.savingThrows.some(sav => sav.name.includes(string))) {
      return this.assignAbilityScore(attribute) + this.state.proficiencyBonus
    } else {
      return this.assignAbilityScore(attribute)
    }
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
      <div>
      <Table compact>
        <Table.Header>

            <Table.Row>
              <Table.HeaderCell>
              Saving Throw
            </Table.HeaderCell>
              <Table.HeaderCell>
              Score
            </Table.HeaderCell>
            </Table.Row>

          </Table.Header>

          <Table.Body>

            <Table.Row>
              <Table.Cell>
              Strength
            </Table.Cell>
              <Table.Cell>
              {this.setScore(this.state.character.strength, "STR")}
            </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
              Dexterity
            </Table.Cell>
              <Table.Cell>
              {this.setScore(this.state.character.dexterity, "DEX")}
            </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
              Constitution
            </Table.Cell>
              <Table.Cell>
              {this.setScore(this.state.character.constitution, "CON")}
            </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
              Intelligence
            </Table.Cell>
              <Table.Cell>
              {this.setScore(this.state.character.intelligence, "INT")}
            </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
              Wisdom
            </Table.Cell>
              <Table.Cell>
              {this.setScore(this.state.character.wisdom, "WIS")}
            </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
              Charisma
            </Table.Cell>
              <Table.Cell>
              {this.setScore(this.state.character.charisma, "CHA")}
            </Table.Cell>
            </Table.Row>

        </Table.Body>
      </Table>

      </div>
    )
  }
}

export default SavingThrows
