import React from 'react'

const alignments = [
    "Lawful Good",
    "Neutral Good",
    "Chaotic Good",
    "Lawful Neutral",
    "Neutral",
    "Chaotic Neutral",
    "Lawful Evil",
    "Neutral Evil",
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
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.alignment} onChange={this.handleChange}>
          {this.alignmentsList()}
        </select>
        <button>Submit</button>
      </form>
    )
  }
}

export default GetAlignment
