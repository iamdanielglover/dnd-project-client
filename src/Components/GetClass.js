import React from 'react'
import '../App.css'

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

  render() {
    return (
      <div className="name-form">
        <h3>Choose a Class</h3>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.chosen_klass} onChange={this.handleChange}>
            {this.renderKlasses()}
          </select>
        <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default GetClass

  render() {
    return (
      <div style={{paddingTop: "15%"}}>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Card id='card-border' centered>
                <Card.Content textAlign={"center"}>
                  <Card.Header id='add-font'>Choose A Race</Card.Header>
                    <Form.Field style={{marginTop: "8%"}}>
                      <Form onSubmit={this.handleSubmit}>
                        <select value={this.state.chosen_race} onChange={this.handleChange}>
                          {this.renderRaces()}
                        </select>
                          <Button style={{marginTop: "8%"}} fluid={true} type="submit">Submit</Button>
                      </Form>
                    </Form.Field>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <h1>Race Description</h1>
                {this.description()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
