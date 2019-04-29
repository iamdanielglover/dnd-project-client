import React from 'react'

class UpgradeChar extends React.Component {
  state = {
    name: null,
    experience: null,
    loading: true,
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/characters/" + this.props.match.params.character_id)
      .then(resp => resp.json())
      .then(data => this.setState({
        name: data.name,
        experience: data.experience,
        loading: false
      })
    )
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  renderCharacterInfo() {
    if (!this.state.loading)
    return (
      <React.Fragment>
        <h1>{this.state.name}</h1>
        <form>
        <label>
        <h4>Experience</h4>
          <input type="number" name="experience" value={this.state.experience} onChange={this.handleChange} />
        </label>
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    )
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
