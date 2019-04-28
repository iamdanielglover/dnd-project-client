import React from 'react'

class CharacterInfo extends React.Component {
  state = {
    name: null,
    race: null,
    klass: null,
    max_hp: null,
    current_hp: null,
    level: null,
    speed: null,
    experience: null,
    alignment: null,
    race_id: null,
    klass_id: null,
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/characters/" + this.props.char)
      .then(resp => resp.json())
      .then(data => this.setState({
        name: data.name,
        klass_id: data.klass_id,
        max_hp: data.max_hp,
        current_hp: data.current_hp,
        level: data.level,
        speed: data.speed,
        experience: data.experience,
        alignment: data.alignment,
        race_id: data.race_id
      }, () => {
        fetch('http://localhost:3000/api/v1/races/')
	       .then(resp => resp.json())
	       .then(data => this.setState({
           race: data.find(raceObj => raceObj.id === this.state.race_id).name
         }, () => {
           fetch('http://localhost:3000/api/v1/klasses/')
            .then(resp => resp.json())
            .then(data => this.setState({
              klass: data.find(classObj => classObj.id === this.state.klass_id).name
            }))
         }))
      }))
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>
                Name
              </th>
              <td>
                {this.state.name}
              </td>
              <th>
                Class
              </th>
              <td>
                {this.state.klass}
              </td>
              <th>
                Max Hitpoints
              </th>
              <td>
                {this.state.max_hp}
              </td>
            </tr>
            <tr>
              <th>
                Alignment
              </th>
              <td>
                {this.state.alignment}
              </td>
              <th>
                Race
              </th>
              <td>
                {this.state.race}
              </td>
              <th>
                Current Hitpoints
              </th>
              <td>
                {this.state.current_hp}
              </td>
            </tr>
            <tr>
              <th>
                Speed
              </th>
              <td>
                {this.state.speed}
              </td>
              <th>
                Experience
              </th>
              <td>
                {this.state.experience}
              </td>
              <th>
                Level
              </th>
              <td>
                {this.state.level}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default CharacterInfo
