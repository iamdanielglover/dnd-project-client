import React from 'react'
import { Table, Button, Form } from 'semantic-ui-react'

class WeaponList extends React.Component {
  state = {
    armors: [],
    character: {},
    searchTerm: "",
  }

  componentDidMount() {
        fetch('http://localhost:3000/api/v1/characters/' + this.props.match.params.character_id)
          .then(resp => resp.json())
          .then(data => this.setState({
            character: data
          }, () => {
            fetch('http://localhost:3000/api/v1/armors')
              .then(resp => resp.json())
              .then(data => this.setState({
                armors: data
          }))
      })
    )
  }



  displayAllArmors() {
    const armors = this.state.armors.filter(armor => armor.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    return armors.map((arm, index) =>
      <Table.Row key={index}>
      <Table.Cell>{arm.name}</Table.Cell>
      <Table.Cell>{arm.armor_class}</Table.Cell>
      <Table.Cell><Button id="add-font" color="black" onClick={() => this.handleClick(arm)}>
      {
        this.state.character.current_armor_id === arm.id ?
        "Unequip"
        :
        "Equip"
      }
        </Button></Table.Cell>
      </Table.Row>
    )
  }

  handleClick = (arm) => {
    this.equipArmor(arm)
  }

  equipArmor(arm) {
    fetch("http://localhost:3000/api/v1/characters/" + this.state.character.id, {
      method: "PATCH",
      headers: {"Content-Type" : "application/json" },
      body: JSON.stringify({
        current_armor_id: arm.id,
      })
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      character: data
    }))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <Button id="add-font" color="black" onClick={() => this.props.history.goBack()}>Go Back</Button>
      <Form>
        <Form.Field>
          <input onChange={this.handleChange} name="searchTerm" value={this.state.searchTerm} placeholder='Search' />
        </Form.Field>
      </Form>
      <Table compact>
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Armor
            </Table.HeaderCell>
            <Table.HeaderCell>
              Armor Class
            </Table.HeaderCell>
            <Table.HeaderCell>
              Equip
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.displayAllArmors()}
        </Table.Body>
      </Table>
      </React.Fragment>
    )
  }
}

export default WeaponList
