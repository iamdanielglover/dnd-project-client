import React from 'react'

class Landing extends React.Component {


  render() {
    return (
      <div>
        <button onClick={() => this.props.history.push("/create-character")}>Create</button>
        <button onClick={() => this.props.history.push("/view-characters")}>View</button>
      </div>
    )
  }
}

export default Landing
