import React from 'react'
import GetName from '../Components/GetName.js'
import GetRace from '../Components/GetRace.js'
import GetAlignment from '../Components/GetAlignment.js'
import GetStats from '../Components/GetStats.js'
import ChooseProficiency from '../Components/ChooseProficiencies.js'

class CreateCharacter extends React.Component {
  state = {
    character: {
        name: "",
        klass_id: 5,
        race_id: null,
        alignment: null,
        level: 1,
        experience: null,
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
        console.log("class")
        break;
      case "alignment":
        return <GetAlignment />
      case "stats":
        return <GetStats />
      case "proficiencies":
        return <ChooseProficiency klassID={this.state.character.klass_id} />

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

  render() {
    console.log(this.state.character)
    return (
      <div>
        {this.renderPage()}
      </div>
    );
  }
}



export default CreateCharacter
