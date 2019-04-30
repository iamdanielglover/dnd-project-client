import React from 'react'
import '../App.css'

class GetName extends React.Component {
  state = {
    input: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.applyingName(this.state.input)
  }

  render() {
    return (
      <div className="name-form">
        <h3>Enter a Name</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Enter Name" name="input" value={this.state.input} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default GetName
