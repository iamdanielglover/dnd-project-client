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

  alignmentsList() {
    return alignments.map(alignment => <li>{alignment}</li>)
  }

  render() {
    return (
      <div>
        {this.alignmentsList()}
      </div>
    )
  }
}

export default GetAlignment
