import React from 'react'
import { Table } from 'semantic-ui-react'
import '../App.css'

class GetStats extends React.Component {
  state = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
  }

  handleChange = (event) => {
    if (event.target.value > 18) {
      event.target.value = 18
    }
    else if (event.target.value < 0) {
        event.target.value = 0
      }
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.setTotal() > 75)
      alert(`Overspent by: ${this.setTotal() - 75}`)
      else {
        this.props.applyingStats(this.state)
      }
  }


  setTotal() {
    return Object.values(this.state).reduce((a,b,) => parseInt(a) + parseInt(b))
  }

  settingOptions = () => [...Array(19).keys()].map((num, index) => <option key={index} value={num}>{num}</option>)


  render() {
    return (
        <div>
          <h4>Aim to balance your character's stats so that they compliment the class that you picked previously.</h4>
          <ul>
            <li>Strength - Reflects how physically strong a character is.</li>
            <li>Dexterity - A measurement of how agile & nimble a character can be.</li>
            <li>Constitution - The measurement of sturdiness.</li>
            <li>Intelligence - How fast the character's mind works. Effects learning new skills and problem solving.</li>
            <li>Wisdom - A character's common-sense, sensibilities and spirituality.</li>
            <li>Charisma - Is the measure of a character's likeability, social skills and sometimes can be used to describe their demeanour.</li>
          </ul>
          <form className="stats-form" onSubmit={this.handleSubmit}>
            <small> e.g. A fighter class would focus points into strength, a wizard in intelligence.</small>
          <Table compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Attribute
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Number
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Strength</Table.Cell>
                <Table.Cell>

                  <select name="strength" value={this.state.strength} onChange={this.handleChange}>
                  {this.settingOptions()}
                  </select>

              </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Dexterity</Table.Cell>
                <Table.Cell>

                  <select name="dexterity" value={this.state.dexterity} onChange={this.handleChange}>
                    {this.settingOptions()}
                  </select>

                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Constitution</Table.Cell>
                <Table.Cell>

                  <select name="constitution" value={this.state.constitution} onChange={this.handleChange}>
                    {this.settingOptions()}
                  </select>

                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Intelligence</Table.Cell>
                <Table.Cell>

                  <select name="intelligence" value={this.state.intelligence} onChange={this.handleChange}>
                    {this.settingOptions()}
                  </select>

                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Wisdom</Table.Cell>
                <Table.Cell>

                  <select name="wisdom" value={this.state.wisdom} onChange={this.handleChange}>
                    {this.settingOptions()}
                  </select>

                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Charisma</Table.Cell>
                <Table.Cell>

                  <select name="charisma" value={this.state.charisma} onChange={this.handleChange}>
                    {this.settingOptions()}
                  </select>

                </Table.Cell>
              </Table.Row>

            </Table.Body>
          </Table>
          <button>Submit</button>
        </form><br/>
          <em>Spend {75 - this.setTotal()} points</em>
      </div>
    )
  }
}

export default GetStats
