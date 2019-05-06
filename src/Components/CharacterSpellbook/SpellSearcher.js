import React from 'react'
import { Form, Table, Button } from 'semantic-ui-react'

class SpellSearcher extends React.Component {
  state = {
    character_id: this.props.match.params.character_id,
    searchTerm: "",
    spells: [],
    apiSpells: []
  }

  componentDidMount() {
    fetch('http://www.dnd5eapi.co/api/spells')
      .then(resp => resp.json())
      .then(data => this.setState({ spells: data.results }, () => {
        fetch("http://localhost:3000/api/v1/spells/")
          .then(resp => resp.json())
          .then(data => this.setState({ apiSpells: data}))
      }))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = (spell) => {
    console.log(spell)
    fetch('http://localhost:3000/api/v1/spells', {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({
        	character_id: this.state.character_id,
        	api_id: spell.url.slice(34),
        	name: spell.name
        })
    })
  }

  handleDetailsClick = (spell) => {
      this.props.history.push('/unadded-spell/' + spell.url.slice(34))
      console.log(spell.url.slice(34))
  }

  backToSpellbook = () => {
    this.props.history.push('/spellbook/' + this.state.character_id)
  }

  displaySpells() {
      const spells = this.state.spells.filter(spell => spell.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
      return spells.map((spell, index) => <Table.Row key={index}><Table.Cell>{spell.url.slice(34)}</Table.Cell><Table.Cell>{spell.name}</Table.Cell><Table.Cell><Button onClick={() => this.handleClick(spell)}>Add</Button></Table.Cell><Table.Cell><Button onClick={() => this.handleDetailsClick(spell)}>View</Button></Table.Cell></Table.Row>)
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
      <h3>Search For Spells</h3>
      <Button onClick={this.backToSpellbook}>Back to Spellbook</Button>
      <Button onClick={() => this.props.history.push('/view-charactersheet/' + this.state.character_id)}>Back to Character</Button>
        <Form>
          <Form.Field>
            <input onChange={this.handleChange} name="searchTerm" value={this.state.searchTerm} placeholder='Search' />
          </Form.Field>
        </Form>
        <Table compact>
        <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Id
              </Table.HeaderCell>
              <Table.HeaderCell>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell>
                Add to Spellbook
              </Table.HeaderCell>
              <Table.HeaderCell>
                View Details
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.displaySpells()}
          </Table.Body>
        </Table>
      </React.Fragment>
    )
  }
}

export default SpellSearcher
