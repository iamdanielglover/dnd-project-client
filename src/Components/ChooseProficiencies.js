import React from 'react'

class ChooseProficiency extends React.Component {
  state = {
    klassInfo: {},
    chosen_profs: [],
    loading: true
  }


  componentDidMount() {
    fetch('http://www.dnd5eapi.co/api/classes/' + this.props.user.characters[this.props.user.characters.length -1].klass_id)
      .then(resp => resp.json())
      .then(data => this.setState({
        // klassList: data.proficiency_choices[0].from.map(prof => prof.name.slice(7)),
        klassInfo: data,
        loading: false
      })
    )
  }

  finishedLoading() {
    if (this.state.loading) return;
    return (
      <React.Fragment>
        <h3>Choose {this.state.klassInfo.proficiency_choices[0].choose} Skill proficiencies</h3>
        {this.renderFormAfterLoad()}
      </React.Fragment>
    )
  }

  addProficiency = (prof) => {
    if (this.state.chosen_profs.find(chosenProf => chosenProf === prof)) return;
    if (this.state.chosen_profs.length >= this.state.klassInfo.proficiency_choices[0].choose)
      console.log("whaaaaa")
    else
      this.setState({
        chosen_profs: [...this.state.chosen_profs, prof],
    })
  }

  renderFormAfterLoad() {
      return this.state.klassInfo.proficiency_choices[0].from.map((prof, index) =>
      <React.Fragment key={index}>
        <label>
          {prof.name.slice(7)}
          <button onClick={() => this.addProficiency(prof)}>Add</button>
          <br/>
        </label>
      </React.Fragment>)
    }

  render() {
      console.log(this.state.chosen_profs)

    return (
      <div>
        {this.finishedLoading()}
      </div>
    )
  }
}

export default ChooseProficiency
// renderCategories = () => this.props.categories.map((category, index) => <option key={index} value={category.name}> {category.name} </option>)



        // <label>
        //   <input type="radio" name="order" value="Alphabetically" checked={null} onChange={this.props.setSearchBy}/>
        //   Alphabetically
        // </label>
        // <label>
        //   <input type="radio" name="order" value="Price" checked={null} onChange={this.props.setSearchBy}/>
        //   Price
        // </label>
        // <label>
        //   <input type="radio" name="order" value="Unordered" checked={null} onChange={this.props.setSearchBy}/>
        //   Default
        // </label>

// <input type="radio" name="proficiency" value={prof.name.slice(7)} checked={null} /><br/>
