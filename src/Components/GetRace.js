import React from 'react'
import '../App.css'

class GetRace extends React.Component {
  state = {
    races: [],
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

  grabRaceNamesForRender() {
    return this.state.races.map((race) => <li>{race.name}</li>)
  }

  render() {
    return (
      <div>
          {this.grabRaceNamesForRender()}
      </div>
    )
  }
}

export default GetRace
