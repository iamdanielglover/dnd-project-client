import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import './Landing.css'

class Landing extends React.Component {

  render() {
    return (
      <div>
        <h1 className="landing" style={{textAlign: "center"}}>Welcome</h1>
          <Card id="card-border" centered>
            <Card.Content>
              <p  id="landing" style={{textAlign: "center"}}>This is CHAR-me-D&D! <br/> Build a character sheet in no time at all, with step-to-step guidance. Revisit your characters, add experience points to them to level up. Build a catalogue of armor and weapons to use, and build your own spellbook.</p>
            </Card.Content>
          </Card>
        <Card.Group centered>
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
