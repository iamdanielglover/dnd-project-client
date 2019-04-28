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
        <form onSubmit={this.handleSubmit}>

          <select name="strength" value={this.state.strength} onChange={this.handleChange}>
            {this.settingOptions()}
          </select>

          <select name="dexterity" value={this.state.dexterity} onChange={this.handleChange}>
            {this.settingOptions()}
          </select>

          <select name="constitution" value={this.state.constitution} onChange={this.handleChange}>
            {this.settingOptions()}
          </select>

          <select name="intelligence" value={this.state.intelligence} onChange={this.handleChange}>
            {this.settingOptions()}
          </select>

          <select name="wisdom" value={this.state.wisdom} onChange={this.handleChange}>
            {this.settingOptions()}
          </select>

          <select name="charisma" value={this.state.charisma} onChange={this.handleChange}>
            {this.settingOptions()}
          </select>

          <button>Submit</button>
        </form><br/>
        <em>Spend {75 - this.setTotal()} points</em>
      </div>
    )
  }
}

export default GetStats
