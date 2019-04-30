import React from 'react'
import { Card, Button } from 'semantic-ui-react'

class Landing extends React.Component {


  render() {
    return (
      <div>
        <h1 style={{textAlign: "center"}}>Welcome to the Project</h1>
        <Card.Group centered style={{paddingTop: "15%"}}>
        <Card>
          <Card.Content>
            <Card.Header>Create Your Own Character</Card.Header>
            <br/>
            <Button style={{float: "right"}} onClick={() => this.props.history.push("/create-character")}>Create</Button>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>View Charactersheet Library</Card.Header>
            <br/>
            <Button style={{float: "right"}} onClick={() => this.props.history.push("/view-characters")}>View</Button>
          </Card.Content>
        </Card>
        </Card.Group>
      </div>
    )
  }
}

export default Landing
