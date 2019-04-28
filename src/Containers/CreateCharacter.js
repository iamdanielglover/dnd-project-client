import React from 'react'
import GetName from '../Components/GetName.js'
import GetRace from '../Components/GetRace.js'
import GetClass from '../Components/GetClass.js'
import GetStats from '../Components/GetStats.js'
import GetAlignment from '../Components/GetAlignment.js'


class CreateCharacter extends React.Component {
  state = {
    character: {
        user_id: this.props.userID,
        name: "",
        klass_id: 5,
        race_id: null,
        alignment: "",
        level: 1,
        experience: 0,
        strength: null,
        dexterity: null,
        constitution: null,
        intelligence: null,
        wisdom: null,
        charisma: null
    },
    page: "name"
  }

  renderPage() {
    switch (this.state.page) {
      case "name":
        return <GetName applyingName={this.applyingName} />
      case "race":
        return <GetRace applyingRace={this.applyingRace} />
      case "class":
        return <GetClass applyingKlass={this.applyingKlass} />
      case "stats":
        return <GetStats applyingStats={this.applyingStats} />
      case "alignment":
        return <GetAlignment applyingAlignment={this.applyingAlignment} />

        default:
          return null
    }
  }

  applyingName = (name) => {
    this.setState({
      character: {...this.state.character, name: name },
      page: "race"
    })
  }

  applyingRace = (id) => {
    this.setState({
      character: {...this.state.character, race_id: id },
      page: "class"
    })
  }

  applyingKlass = (id) => {
    this.setState({
      character: {...this.state.character, klass_id: id },
      page: "stats"
    })
  }

  applyingStats = (stats) => {
    this.setState({
      character: {...this.state.character,
        strength: stats.strength,
        dexterity: stats.dexterity,
        constitution: stats.constitution,
        intelligence: stats.intelligence,
        wisdom: stats.wisdom,
        charisma: stats.charisma
      },
      page: "alignment"
    })
  }

  applyingAlignment = (string) => {
    this.setState({
      character: {...this.state.character,
        alignment: string
      }
    }, () => this.props.sendCharacterToApi(this.state.character))
  }

  render() {
    return (
      <div>
        {this.renderPage()}
      </div>
    );
  }
}



export default CreateCharacter
