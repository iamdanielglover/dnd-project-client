import React from 'react'
import { Button, Grid, Card } from 'semantic-ui-react'

// const weirdChars = ['â', '€', '�', 'â', '€', '™']
const weirdCharsRegEx = /[€�â€™]/g

class Spell extends React.Component {
  state = {
    spell_id: this.props.match.params.spell_id,
    api_id: null,
    spell: {
      name: null,
      description: null,
      range: null,
      duration: null,
      castingTime: null,
      level: null,
      school: null,
      classes: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/spells/' + this.state.spell_id)
      .then(resp => resp.json())
      .then(data => this.setState({ api_id: data.api_id}, () => {
        fetch('http://www.dnd5eapi.co/api/spells/' + this.state.api_id)
          .then(resp => resp.json())
          .then(data => this.setState({
            spell: {
              name: data.name,
              description: data.desc.join(" ").replace(weirdCharsRegEx, ""),
              range: data.range,
              duration: data.duration,
              castingTime: data.casting_time,
              level: data.level,
              school: data.school.name,
              classes: data.classes.map(klass => klass.name)
            }
          }))
      }))
    }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <Button id="add-font" color="black" onClick={() => this.props.history.goBack()}>Back</Button>
      <div style={{paddingTop: "3%"}}>
          <Grid>
            <Grid.Row>
                <Card centered id="card-border">
                  <Card.Content>
                    <Card.Header textAlign="center">
                      {this.state.spell.name}
                    </Card.Header>
                    <br/>
                      <p><strong>Range:</strong> {this.state.spell.range}</p>
                      <p><strong>Duration:</strong> {this.state.spell.duration}</p>
                      <p><strong>Casting Time:</strong> {this.state.spell.castingTime}</p>
                      <p><strong>Level Requisite:</strong> {this.state.spell.level}</p>
                      <p><strong>School:</strong> {this.state.spell.school}</p>
                      <p><strong>Classes:</strong> {
                        this.state.spell.classes.map(klass => <li>{klass}</li>)
                      }</p>
                  </Card.Content>
                </Card>
              </Grid.Row>
              <Grid.Row>
                <h1>Spell Description</h1>
                  <p>{this.state.spell.description}</p>
              </Grid.Row>
            </Grid>
      </div>
      </React.Fragment>
    )
  }
}

export default Spell
