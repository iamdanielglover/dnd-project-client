import React from 'react'
import "../App.css"

const alignments = [
    "Lawful Good",
    "Neutral Good",
    "Chaotic Good",
    "Lawful Neutral",
    "Neutral",
    "Chaotic Neutral",
    "Lawful Evil",
    "Neutral Evil",
    "Chaotic Evil",
]

class GetAlignment extends React.Component {
  state = {
    alignment: "Neutral"
  }
  alignmentsList() {
    return alignments.map((alignment, index) => <option key={index} value={alignment}>{alignment}</option>)
  }

  handleChange = (event) => {
    this.setState({
      alignment: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.applyingAlignment(this.state.alignment)
  }

  render() {
    return (
      <div className="name-form">
        <h3>Choose an Alignment</h3>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.alignment} onChange={this.handleChange}>
            {this.alignmentsList()}
          </select>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default GetAlignment
