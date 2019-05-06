import React from "react"
import { Table } from 'semantic-ui-react'

class EquippedArmor extends React.Component {
  state = {
    character: null,
    equipped_armor: null,
    loading: true
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/characters/' + this.props.char)
      .then(resp => resp.json())
      .then(data => this.setState({
         character: data
       }, () => {
         fetch('http://localhost:3000/api/v1/armors/' + this.state.character.current_armor_id)
          .then(resp => resp.json())
          .then(data => this.setState({ equipped_armor: data, loading: false }))
       }))
  }


  render() {
    console.log(this.state)
    return (

      <React.Fragment>
      {!this.state.loading ?
        <Table.Row>
          <Table.Cell>{this.state.equipped_armor.name}</Table.Cell>
          <Table.Cell>{this.state.equipped_armor.armor_class}</Table.Cell>
          <Table.Cell>{this.state.character.armor_class}</Table.Cell>
        </Table.Row>
        :
        <Table.Row>
        <Table.Cell>My Secret</Table.Cell>
        <Table.Cell>Secret</Table.Cell>
        <Table.Cell>Secret</Table.Cell>
      </Table.Row>
      }
      </React.Fragment>
    )
  }
}

export default EquippedArmor
