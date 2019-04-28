import React from 'react'
import './Table.css'

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
        <table>
          <tbody>
            <tr>
              <th>
                Attribute
              </th>
              <th>
                Score
              </th>
              <th>
                Ability Score
              </th>
            </tr>

            <tr>
            <td>Strength</td>
            <td>{this.state.strength}</td>
            <td>{this.assignAbilityScore(this.state.strength)}</td>
            </tr>

            <tr>
            <td>Dexterity</td>
            <td>{this.state.dexterity}</td>
            <td>{this.assignAbilityScore(this.state.dexterity)}</td>
            </tr>

            <tr>
            <td>Constitution</td>
            <td>{this.state.constitution}</td>
            <td>{this.assignAbilityScore(this.state.constitution)}</td>
            </tr>

            <tr>
            <td>Intelligence</td>
            <td>{this.state.intelligence}</td>
            <td>{this.assignAbilityScore(this.state.intelligence)}</td>
            </tr>

            <tr>
            <td>Wisdom</td>
            <td>{this.state.wisdom}</td>
            <td>{this.assignAbilityScore(this.state.wisdom)}</td>
            </tr>

            <tr>
            <td>Charisma</td>
            <td>{this.state.charisma}</td>
            <td>{this.assignAbilityScore(this.state.charisma)}</td>
            </tr>

          </tbody>
        </table>

      </React.Fragment>
    )
  }
}

export default AttributeList
