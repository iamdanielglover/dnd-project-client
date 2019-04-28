import React from 'react'

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
    console.log(this.state)
    return (
      <div>
      <table>
        <tbody>

          <tr>
            <th>
            Saving Throw
            </th>
            <th>
            Score
            </th>
          </tr>

          <tr>
            <td>
            Strength
            </td>
            <td>
            {this.setScore(this.state.character.strength, "STR")}
            </td>
          </tr>

          <tr>
            <td>
            Dexterity
            </td>
            <td>
            {this.setScore(this.state.character.dexterity, "DEX")}
            </td>
          </tr>

          <tr>
            <td>
            Constitution
            </td>
            <td>
            {this.setScore(this.state.character.constitution, "CON")}
            </td>
          </tr>

          <tr>
            <td>
            Intelligence
            </td>
            <td>
            {this.setScore(this.state.character.intelligence, "INT")}
            </td>
          </tr>

          <tr>
            <td>
            Wisdom
            </td>
            <td>
            {this.setScore(this.state.character.wisdom, "WIS")}
            </td>
          </tr>

          <tr>
            <td>
            Charisma
            </td>
            <td>
            {this.setScore(this.state.character.charisma, "CHA")}
            </td>
          </tr>

        </tbody>
      </table>

      </div>
    )
  }
}

export default SavingThrows
