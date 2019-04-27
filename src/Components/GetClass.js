import React from 'react'
import '../App.css'

class GetClass extends React.Component {
  state = {
    klasses: [],
    chosen_klass: "Barbarian",
  }

  componentDidMount() {
    this.fetchKlasses()
  }

  fetchKlasses() {
    fetch('http://localhost:3000/api/v1/klasses')
      .then(resp => resp.json())
      .then(data => this.setState({
        klasses: data
      }))
  }

  handleChange = (event) => {
    this.setState({
      chosen_klass: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const klass = this.state.klasses.find(klass => klass.name === this.state.chosen_klass)
    this.props.applyingKlass(klass.id)
  }

  renderKlasses = () => this.state.klasses.map((klass, index) => <option key={index} value={klass.name}>{klass.name}</option>)

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.chosen_klass} onChange={this.handleChange}>
          {this.renderKlasses()}
        </select>
      <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default GetClass
