import React from 'react'
import { Table, Button } from 'semantic-ui-react'
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
        <div style={{paddingTop: "10%"}}>
          <h4>Aim to balance your character's stats so that they compliment the class that you picked previously.</h4>
          <small style={{float: "right"}}> e.g. A fighter class would focus points into strength, a wizard in intelligence.</small>
          <form className="stats-form" onSubmit={this.handleSubmit}>

          <Table compact id="add-font">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Attribute
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Number
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell style={{fontWeight: "bold"}}>Strength</Table.Cell>
                <Table.Cell>Reflects how physically strong a character is.</Table.Cell>
                <Table.Cell>

                  <select name="strength" value={this.state.strength} onChange={this.handleChange}>
                  {this.settingOptions()}
                  </select>

              </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell style={{fontWeight: "bold"}}>Dexterity</Table.Cell>
                <Table.Cell>A measurement of how agile & nimble a character can be.</Table.Cell>
                <Table.Cell>

                  <select name="dexterity" value={this.state.dexterity} onChange={this.handleChange}>
                    {this.settingOptions()}
                  </select>

                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell style={{fontWeight: "bold"}}>Constitution</Table.Cell>
                <Table.Cell>The measurement of sturdiness.</Table.Cell>
                <Table.Cell>

                  <select name="constitution" value={this.state.constitution} onChange={this.handleChange}>
                    {this.settingOptions()}
                  </select>

                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell style={{fontWeight: "bold"}}>Intelligence</Table.Cell>
                <Table.Cell>How fast the character's mind works. Effects learning new skills and problem solving.</Table.Cell>
                <Table.Cell>

                  <select name="intelligence" value={this.state.intelligence} onChange={this.handleChange}>
                    {this.settingOptions()}
                  </select>

                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell style={{fontWeight: "bold"}}>Wisdom</Table.Cell>
                <Table.Cell>A character's common-sense, sensibilities and spirituality.</Table.Cell>
                <Table.Cell>

                  <select name="wisdom" value={this.state.wisdom} onChange={this.handleChange}>
                    {this.settingOptions()}
                  </select>

                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell style={{fontWeight: "bold"}}>Charisma</Table.Cell>
                <Table.Cell>Is the measure of a character's likeability, social skills and sometimes can be used to describe their demeanour.</Table.Cell>
                <Table.Cell>

                  <select name="charisma" value={this.state.charisma} onChange={this.handleChange}>
                    {this.settingOptions()}
                  </select>

                </Table.Cell>
              </Table.Row>

            </Table.Body>
          </Table>
          <Button>Submit</Button>
        </form><br/>
      <em>Spend {75 - this.setTotal()} points</em>
      </div>
    )
  }
}

export default GetStats
