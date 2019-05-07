import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import './Landing.css'

class Landing extends React.Component {


  render() {
    return (
      <div>
        <h1 className="landing" style={{textAlign: "center", paddingTop: "2%"}}>Welcome to the Project</h1>
        <Card.Group centered style={{paddingTop: "8%"}}>
        <Card id="card-border">
          <Card.Content textAlign={"center"}>
            <Card.Header id="landing">Create Your Own Character</Card.Header>
            <br/>
            <Button style={{float: "center"}} onClick={() => this.props.history.push("/create-character")}>Create</Button>
          </Card.Content>
        </Card>
        <Card id="card-border">
          <Card.Content textAlign={"center"}>
            <Card.Header id="landing">View Charactersheet Library</Card.Header>
            <br/>
            <Button style={{float: "center"}} onClick={() => this.props.history.push("/view-characters")}>View</Button>
          </Card.Content>
        </Card>
        </Card.Group>
      </div>
    )
  }
}

export default Landing
