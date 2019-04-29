import React from 'react'
import { Table } from 'semantic-ui-react'

class EquipmentProficiencies extends React.Component {
  state = {
    proficiencies: null,
    languages: null,
    loading: true,
    klass_id: null,
    race_id: null,
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/characters/' + this.props.char)
      .then(resp => resp.json())
      .then(data => this.setState({
        klass_id: data.klass_id,
        race_id: data.race_id,
      }, () => {
        fetch('http://www.dnd5eapi.co/api/classes/' + this.state.klass_id)
    	   .then(resp => resp.json())
         .then(data => this.setState({
           proficiencies: data.proficiencies.map(prof => prof.name)
         }, () => {
           fetch('http://www.dnd5eapi.co/api/races/' + this.state.race_id)
            .then(resp => resp.json())
            .then(data => this.setState({
              languages: data.languages.map(lang => lang.name),
              loading: false
            }))
         }))
      }))
  }


   renderStuff() {
     if (!this.state.loading) {
       const expertise = [...this.state.proficiencies, ...this.state.languages]
       return expertise.map((excerpt, index) => <li key={index}>{excerpt}</li>)
     }
   }

   renderLanguages() {
     if (!this.state.loading) {
       return this.state.languages.map((excerpt, index) => <Table.Row key={index}><Table.Cell>{excerpt}</Table.Cell><Table.Cell>Language</Table.Cell></Table.Row>)
     }
   }

   renderProficiencies() {
     if (!this.state.loading) {
       return this.state.proficiencies.map((excerpt, index) => <Table.Row key={index}><Table.Cell>{excerpt}</Table.Cell><Table.Cell>Equipment</Table.Cell></Table.Row>)
     }
   }

  render() {
    return (
      <React.Fragment>
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Proficiency
              </Table.HeaderCell>
              <Table.HeaderCell>
                Type
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderLanguages()}
            {this.renderProficiencies()}
          </Table.Body>
        </Table>
      </React.Fragment>
    )
  }
}

export default EquipmentProficiencies
