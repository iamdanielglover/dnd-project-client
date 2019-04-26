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

// settingOptions = () => [...Array(19).keys()].map((num, index) => <option key={index} value={num}>{num}</option>)
//
// renderForms() = () => Object.keys(this.state).map((stat, index) => <select key={index} value={stat} onChange={this.handleChange} >{this.settingOptions()}</select>)
//
// <select value={stat} onChange={this.handleChange}>
//   {this.settingOptions()}
// </select>
//
// <form onSubmit={this.handleSubmit}>
//
//   <select value={this.state.chosen_klass} onChange={this.handleChange}>
//     {this.settingOptions()}
//   </select>
//
// <input type="submit" value="Submit" />
// </form>
//
//
// <form>
//   <input placeholder="Strength" type="number" name="strength" onInput={this.handleChange} value={this.state.strength} /><br/>
//   <input placeholder="Dexterity" type="number" name="dexterity" onInput={this.handleChange} value={this.state.dexterity} /><br/>
//   <input placeholder="Constitution" type="number" name="constitution" onInput={this.handleChange} value={this.state.constitution} /><br/>
//   <input placeholder="Intelligence" type="number" name="intelligence" onInput={this.handleChange} value={this.state.intelligence} /><br/>
//   <input placeholder="Wisdom" type="number" name="wisdom" onInput={this.handleChange} value={this.state.wisdom} /><br/>
//   <input placeholder="Charisma" type="number" name="charisma" onInput={this.handleChange} value={this.state.charisma} /><br/>
//   <button>Submit</button>
// </form><br/>
