import React from 'react'
import '../App.css'

class GetRace extends React.Component {
  state = {
    races: [],
    chosen_race: "Dwarf",
  }

  componentDidMount() {
    this.fetchRaces()
  }

  fetchRaces() {
    fetch('http://localhost:3000/api/v1/races')
      .then(resp => resp.json())
      .then(data => this.setState({
        races: data
      }))
  }

  handleChange = (event) => {
    this.setState({
      chosen_race: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const race = this.state.races.find(race => race.name === this.state.chosen_race)
    this.props.applyingRace(race.id)
  }

  renderRaces = () => this.state.races.map((race, index) => <option key={index} value={race.name}>{race.name}</option>)

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.chosen_race} onChange={this.handleChange}>
          {this.renderRaces()}
        </select>
      <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default GetRace
//
//  renderCategories = () => this.props.categories.map((category, index) => <option key={index} value={category.name}> {category.name} </option>)
//
// handleSubmit = (e) => {
//  e.preventDefault()
//  this.props.pageFunc("new note")
//  const category = this.props.categories.find(category => category.name === this.state.value)
//  this.props.setCat(category)
// }
//
// handleChange = (event) => {
//   this.setState({
//     value: event.target.value
//   })
// }
//
//  render() {
//    return (
//      <form onSubmit={this.handleSubmit} >
//        <select value={this.state.value} onChange={this.handleChange}>
//          {this.renderCategories()}
//        </select>
//      <input type="submit" value="Submit" />
//      </form>
//    )
//  }
// }
