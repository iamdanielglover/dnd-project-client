import React from 'react'

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
    if (this.setTotal() >= 75) return;
    if (event.target.value > 18)
      event.target.value = 18
    else if (event.target.value < 0)
      event.target.value = 0
    else
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  setTotal() {
    return Object.values(this.state).reduce((a,b,) => parseInt(a) + parseInt(b))
  }

  render() {
    return (
      <div>
        <form>
          <input placeholder="Strength" type="number" name="strength" onChange={this.handleChange} value={this.state.strength} /><br/>
          <input placeholder="Dexterity" type="number" name="dexterity" onChange={this.handleChange} value={this.state.dexterity} /><br/>
          <input placeholder="Constitution" type="number" name="constitution" onChange={this.handleChange} value={this.state.constitution} /><br/>
          <input placeholder="Intelligence" type="number" name="intelligence" onChange={this.handleChange} value={this.state.intelligence} /><br/>
          <input placeholder="Wisdom" type="number" name="wisdom" onChange={this.handleChange} value={this.state.wisdom} /><br/>
          <input placeholder="Charisma" type="number" name="charisma" onChange={this.handleChange} value={this.state.charisma} /><br/>
          <button>Submit</button>
        </form><br/>
        <em>Spend {75 - this.setTotal()} points</em>
      </div>
    )
  }
}

export default GetStats
