import React from 'react'

class UpgradeChar extends React.Component {
  state = {
    character: {
      name: null,
      add_to_experience: 0,
      starting_experience: null,
      level: null,
    },
    levelThreshold: null,
    loading: true,
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/characters/" + this.props.match.params.character_id)
      .then(resp => resp.json())
      .then(data => this.setState({
        character: {
          name: data.name,
          starting_experience: data.experience,
          level: data.level,
        },
        loading: false
      }, () => this.setLevelThreshold())
    )
  }

  handleChange = (event) => {
      this.setState({
        character: { ...this.state.character, add_to_experience: event.target.value}
      })
  }

  patchRequest = () => {
    const sum = parseInt(this.state.character.add_to_experience) + parseInt(this.state.character.starting_experience)
    fetch("http://localhost:3000/api/v1/characters/" + this.props.match.params.character_id, {
      method: "PATCH",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({
        experience: sum,
      })
    })
  }

  levelUpPatchRequest = (id) => {
    const sum = parseInt(this.state.character.add_to_experience) + parseInt(this.state.character.starting_experience)
    fetch("http://localhost:3000/api/v1/characters/" + this.props.match.params.character_id, {
      method: "PATCH",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({
        experience: sum,
      })
    })
      .then(resp => resp.json())
      .then(() => this.sendToStatUpgrader(id))
  }

  sendToStatUpgrader = (id) => {
    this.props.history.push('/stats-upgrade/' + id)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if ((parseInt(this.state.character.starting_experience) + parseInt(this.state.character.add_to_experience)) >= this.state.levelThreshold) {
      this.levelUpPatchRequest(this.props.match.params.character_id)
    }
    else if ((this.state.character.starting_experience + this.state.character.add_to_experience) < this.state.levelThreshold) {
      this.patchRequest()
    }
  }

  renderCharacterInfo() {
    if (!this.state.loading)
    return (
      <React.Fragment>
        <h1>{this.state.name}</h1>
        <form onSubmit={this.handleSubmit} >
        <label>
        <h4>Experience</h4>
          <input type="number" name="add_to_experience" value={this.state.character.add_to_experience} onChange={this.handleChange} />
        </label>
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    )
  }

  setLevelThreshold() {
    if (this.state.character.level === 1)
      this.setState({levelThreshold: 300})
    else if (this.state.character.level === 2)
      this.setState({levelThreshold: 900})
    else if (this.state.character.level === 3)
      this.setState({levelThreshold: 2700})
    else if (this.state.character.level === 4)
      this.setState({levelThreshold: 6500})
    else if (this.state.character.level === 5)
      this.setState({levelThreshold: 14000})
    else if (this.state.character.level === 6)
      this.setState({levelThreshold: 23000})
    else if (this.state.character.level === 7)
      this.setState({levelThreshold: 34000})
    else if (this.state.character.level === 8)
      this.setState({levelThreshold: 48000})
    else if (this.state.character.level === 9)
      this.setState({levelThreshold: 64000})
    else if (this.state.character.level === 10)
      this.setState({levelThreshold: 85000})
    else if (this.state.character.level === 11)
      this.setState({levelThreshold: 100000})
    else if (this.state.character.level === 12)
      this.setState({levelThreshold: 120000})
    else if (this.state.character.level === 13)
      this.setState({levelThreshold: 140000})
    else if (this.state.character.level === 14)
      this.setState({levelThreshold: 165000})
    else if (this.state.character.level === 15)
      this.setState({levelThreshold: 195000})
    else if (this.state.character.level === 16)
      this.setState({levelThreshold: 225000})
    else if (this.state.character.level === 17)
      this.setState({levelThreshold: 265000})
    else if (this.state.character.level === 18)
      this.setState({levelThreshold: 305000})
    else if (this.state.character.level === 19)
      this.setState({levelThreshold: 355000})
  }


  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        {this.renderCharacterInfo()}
      </React.Fragment>
    )
  }
}

export default UpgradeChar
