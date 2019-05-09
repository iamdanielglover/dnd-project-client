import React from 'react'
import '../App.css'
import { Form, Card, Button, Grid } from 'semantic-ui-react'

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

  description() {
    if (this.state.chosen_klass === "Barbarian") {
      return (
        <p>A fierce warrior of a primitive background who can enter a battle rage.</p>
      )
    } else if (this.state.chosen_klass === "Bard") {
      return (
        <p>An inspiring magician whose power echoes the music of creation.</p>
      )
    } else if (this.state.chosen_klass === "Cleric") {
      return (
        <p>A priestly champion who wields divine magic in service of a higher power.</p>
      )
    } else if (this.state.chosen_klass === "Druid") {
      return (
        <p>A priest of the Old Faith, wielding the powers of nature— moonlight and plant growth, fire and lightning—and adopting animal forms.</p>
      )
    } else if (this.state.chosen_klass === "Fighter") {
      return (
        <p>A master of martial combat, skilled with a variety of weapons and armor.</p>
      )
    } else if (this.state.chosen_klass === "Monk") {
      return (
        <p>A master of martial arts, skilled with fighting hands and martial monk weapons.</p>
      )
    } else if (this.state.chosen_klass === "Paladin") {
      return (
        <p>A holy warrior bound to a sacred oath.</p>
      )
    } else if (this.state.chosen_klass === "Ranger") {
      return (
        <p>A master of ranged combat, one with nature.</p>
      )
    } else if (this.state.chosen_klass === "Rogue") {
      return (
        <p>A scoundrel who uses stealth and trickery to overcome obstacles and enemies.</p>
      )
    } else if (this.state.chosen_klass === "Sorcerer") {
      return (
        <p>A spellcaster who draws on inherent magic from a gift or bloodline.</p>
      )
    } else if (this.state.chosen_klass === "Warlock") {
      return (
        <p>A wielder of magic that is derived from a bargain with an extraplanar entity.</p>
      )
    } else if (this.state.chosen_klass === "Wizard") {
      return (
        <p>A scholarly magic-user capable of manipulating the structures of reality.</p>
      )
    }
  }

  render() {
    return (
      <div style={{paddingTop: "10%"}}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Card id='card-border' centered>
                  <Card.Content textAlign={"center"}>
                    <Card.Header id='add-font'>Choose A Class</Card.Header>
                      <Form.Field style={{marginTop: "8%"}}>
                        <Form onSubmit={this.handleSubmit}>
                          <select value={this.state.chosen_klass} onChange={this.handleChange}>
                            {this.renderKlasses()}
                          </select>
                            <Button id="add-font" color="black" style={{marginTop: "8%"}} fluid={true} type="submit">Submit</Button>
                        </Form>
                      </Form.Field>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <h1>Description of {this.state.chosen_klass}</h1>
                  {this.description()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    )
  }
}

export default GetClass
