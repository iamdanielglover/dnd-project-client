import React from 'react'

class ChooseProficiency extends React.Component {
  state = {
    user: {},
    currentCharKlass: {},
    klassInfo: {},
    chosen_profs: [],
    loading: true,
  }

  setClassInfo() {
    fetch(`http://www.dnd5eapi.co/api/classes/${this.state.currentCharKlass}`)
      .then(resp => resp.json())
      .then(data => this.setState({
        klassInfo: data,
        loading: false
      })
    )
  }


  componentWillMount() {
    fetch('http://localhost:3000/api/v1/users/' + this.props.user)
      .then(resp => resp.json())
      .then(data => this.setState({
        user: data,
        currentCharKlass: [...data.characters].reverse()[0].klass_id
      }, () => this.setClassInfo())
    )
  }

  addOrRemove = (event, name) => {
    if (!this.state.chosen_profs.includes(name)) {
      this.setState({
        chosen_profs: [...this.state.chosen_profs, name],
      })
    }
    if (this.state.chosen_profs.includes(name)) {
      const whats = [...this.state.chosen_profs]
        whats.splice(this.state.chosen_profs.indexOf(name), 1)
      this.setState({
        chosen_profs: whats
      })
    }
  }

  addProficiency = (event, prof) => {
    const name = prof.name.slice(7)
    this.addOrRemove(event, name)
      if (this.state.chosen_profs.length < this.state.klassInfo.proficiency_choices[0].choose) {
        console.log("whoop")
      }
  }

  renderFormAfterLoad() {
      return this.state.klassInfo.proficiency_choices[0].from.map((prof, index) => {
        return (
          <div key={index}>
            <label>
              <input type="checkbox" value={false} onChange={(event) => this.addProficiency(event, prof)} />
                {prof.name.slice(7)}
            </label>
          </div>
        )
      })
    }

    finishedLoading() {
      if (!this.state.loading)
      return (
        <React.Fragment>
          <h3>Choose {this.state.klassInfo.proficiency_choices[0].choose} Skill proficiencies</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderFormAfterLoad()}
            <button>Submit</button>
          </form>
        </React.Fragment>
      )
    }

    handleSubmit = (event) => {
      event.preventDefault()
      if (this.state.chosen_profs.length > 2) {
        alert("selected too many")
      }
      if (this.state.chosen_profs.length  < 3) {
        this.props.setProfIds(this.state.chosen_profs, [...this.state.user.characters].reverse()[0].id)
      }
    }


  render() {
    console.log(this.state.chosen_profs)
    return  (
      <div>
          {
            this.finishedLoading()
          }
      </div>
      )
  }

}

export default ChooseProficiency
