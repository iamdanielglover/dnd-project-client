import React from 'react'
import { Table, Grid } from 'semantic-ui-react'

class CharacterInfo extends React.Component {
  state = {
    name: null,
    race: null,
    klass: null,
    max_hp: null,
    current_hp: null,
    level: null,
    speed: null,
    experience: null,
    alignment: null,
    race_id: null,
    klass_id: null,
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/characters/" + this.props.char)
      .then(resp => resp.json())
      .then(data => this.setState({
        name: data.name,
        klass_id: data.klass_id,
        max_hp: data.max_hp,
        current_hp: data.current_hp,
        level: data.level,
        speed: data.speed,
        experience: data.experience,
        alignment: data.alignment,
        race_id: data.race_id
      }, () => {
        fetch('http://localhost:3000/api/v1/races/')
	       .then(resp => resp.json())
	       .then(data => this.setState({
           race: data.find(raceObj => raceObj.id === this.state.race_id).name
         }, () => {
           fetch('http://localhost:3000/api/v1/klasses/')
            .then(resp => resp.json())
            .then(data => this.setState({
              klass: data.find(classObj => classObj.id === this.state.klass_id).name
            }))
         }))
      }))
  }

  render() {
    return (
      <div>
        <Grid columns={3}>
          <Grid.Column>
            <Table definition compact>
              <Table.Body>

                <Table.Row>
                  <Table.Cell>
                    Name
                  </Table.Cell>
                  <Table.Cell>
                    {this.state.name}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    Alignment
                  </Table.Cell>
                  <Table.Cell>
                    {this.state.alignment}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    Speed
                  </Table.Cell>
                  <Table.Cell>
                    {this.state.speed}
                  </Table.Cell>
                </Table.Row>


              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table definition compact>
              <Table.Body>

                <Table.Row>
                  <Table.Cell>
                    Race
                  </Table.Cell>
                  <Table.Cell>
                    {this.state.race}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    Class
                  </Table.Cell>
                  <Table.Cell>
                    {this.state.klass}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    Experience
                  </Table.Cell>
                  <Table.Cell>
                    {this.state.experience} <button style={{"float": "right"}} onClick={() => this.props.sendUpgrade(this.props.char)}>add XP</button>
                  </Table.Cell>
                </Table.Row>


              </Table.Body>

            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table definition compact>
              <Table.Body>

                <Table.Row>
                  <Table.Cell>
                    Max HP
                  </Table.Cell>
                  <Table.Cell>
                    {this.state.max_hp}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    Current HP
                  </Table.Cell>
                  <Table.Cell>
                    {this.state.current_hp}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    Level
                  </Table.Cell>
                  <Table.Cell>
                    {this.state.level}
                  </Table.Cell>
                </Table.Row>


              </Table.Body>

            </Table>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default CharacterInfo
