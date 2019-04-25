import React from 'react'
import GetName from '../Components/GetName.js'
import GetRace from '../Components/GetRace.js'
import GetAlignment from '../Components/GetAlignment.js'
import GetStats from '../Components/GetStats.js'

class CreateCharacter extends React.Component {
  state = {
    character: {
        name: "",
        klass_id: null,
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
    page: "stats"
  }

  renderPage() {
    switch (this.state.page) {
      case "name":
        return <GetName />
      case "race":
        return <GetRace />
      case "class":
        console.log("class")
        break;
      case "alignment":
        return <GetAlignment />
      case "stats":
        return <GetStats />

        default:
          return null
    }
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
