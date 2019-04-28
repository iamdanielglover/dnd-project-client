import React from 'react'

class SkillList extends React.Component {
  state = {
    character: {
      strength: null,
      dexterity: null,
      constitution: null,
      intelligence: null,
      wisdom: null,
      charisma: null,
    },
    proficiencies: [],
    proficiencyBonus: null,
    skills: [],
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/characters/" + this.props.char)
      .then(resp => resp.json())
      .then(data => this.setState({
        character: {
          strength: data.strength,
          dexterity: data.dexterity,
          constitution: data.constitution,
          intelligence: data.intelligence,
          wisdom: data.wisdom,
          charisma: data.charisma,
        },
          proficiencies: this.getUnique(data.proficiencies, "id"),
          proficiencyBonus: data.proficiency_bonus
      }, () => {
        fetch('http://localhost:3000/api/v1/proficiencies')
          .then(resp => resp.json())
          .then(data => this.setState({
            skills: data
          }))
      }))
  }

  setSkillBonus(skill) {
    if (this.state.proficiencies.some(prof => prof.name.includes(skill.name))) {
      return this.assignAbilityScore(this.findStatByMod(skill.mod)) + this.state.proficiencyBonus
    } else {
      return this.assignAbilityScore(this.findStatByMod(skill.mod))
    }
  }

  assignAbilityScore = (number) => {
    if (number < 2)
      return -5
    else if (number < 4)
      return -4
    else if (number < 6)
      return -3
    else if (number < 8)
      return -2
    else if (number < 10)
      return -1
    else if (number < 12)
      return 0
    else if (number < 14)
      return 1
    else if (number < 16)
      return 2
    else if (number < 18)
      return 3
    else if (number < 20)
      return 4
    else if (number => 20)
      return 5
  }

  getUnique(arr,comp) {
     const unique =  arr.map(e=> e[comp])
                    .map((e,i,final) =>final.indexOf(e) === i && i)
                   .filter((e)=> arr[e]).map(e=>arr[e]);
    return unique
  }

  findStatByMod = (a) => {
    const keys = Object.keys(this.state.character)
    const values = Object.values(this.state.character)

      return values[keys.indexOf(keys.find(key => key === a))]
  }

  render() {
    return (
      <React.Fragment>
        <table>
          <tbody>
            <tr>
              <th>
                Skill
              </th>
              <th>
                Bonus
              </th>
            </tr>

            {this.state.skills.map((skill, index) => <tr key={index}><td>{skill.name}</td><td>{this.setSkillBonus(skill)}</td></tr>)}

          </tbody>
        </table>

      </React.Fragment>
    )
  }
}

export default SkillList
