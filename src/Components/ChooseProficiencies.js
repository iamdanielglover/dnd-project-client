import React from 'react'
import '../App.css'
import {  Card, Button } from 'semantic-ui-react'

class ChooseProficiency extends React.Component {
  state = {
    user: {},
    currentCharKlass: {},
    klassInfo: {},
    chosen_profs: [],
    choose: null,
    from: null,
    loading: true,
  }

  setClassInfo() {
    fetch(`http://www.dnd5eapi.co/api/classes/${this.state.currentCharKlass}`)
      .then(resp => resp.json())
      .then(data => this.setState({
        klassInfo: data
      }, () => this.setupFromAndChoose())
    )
  }

  setupFromAndChoose() {
    if (this.state.klassInfo.name === "Monk") {
      this.setState({
        choose: this.state.klassInfo.proficiency_choices[this.state.klassInfo.proficiency_choices.length - 1].choose,
        from: this.state.klassInfo.proficiency_choices[this.state.klassInfo.proficiency_choices.length - 1].from,
        loading: false
      })
    } else {
      this.setState({
        choose: this.state.klassInfo.proficiency_choices[0].choose,
        from: this.state.klassInfo.proficiency_choices[0].from,
        loading: false
      })
    }
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/v1/users/' + this.props.user)
      .then(resp => resp.json())
      .then(data => this.setState({
        user: data,
        currentCharKlass: data.characters.reverse()[0].klass_id
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
  }

  renderFormAfterLoad() {
      return this.state.from.map((prof, index) => {
        return (
          <div key={index}>
            <label id="add-font">
              <input type="checkbox" value={false} onChange={(event) => this.addProficiency(event, prof)} />
               {prof.name.slice(7)}
            </label>
            <br/>
          </div>
        )
      })
    }

    finishedLoading() {
      if (!this.state.loading)
      return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit}>
            {this.renderFormAfterLoad()}
            <br/>
            {
              (this.state.chosen_profs.length > this.state.choose || this.state.chosen_profs.length < 1) ?
              <p id="add-font" floated={'right'}>Select at least {this.state.choose} proficiencies to continue.</p>
              :
              <Button id="add-font" color="black" floated={"right"} >Submit</Button>
            }
          </form>
        </React.Fragment>
      )
    }

    handleSubmit = (event) => {
      event.preventDefault()
      if (this.state.chosen_profs.length > this.state.choose) {
        alert("selected too many")
      }
      if (this.state.chosen_profs.length  <= this.state.choose) {
        this.props.setProfIds(this.state.chosen_profs)
      }
    }


  render() {
    return  (
      <div style={{marginTop: "12.5%"}}>
        <Card id='card-border' centered style={{width: "30vw"}}>
          <Card.Content>
            <Card.Header id='add-font'>Pick {this.state.choose} Skill proficiencies</Card.Header>
            <br/>
          {
            this.finishedLoading()
          }
          </Card.Content>
        </Card>
      </div>
      )
  }

}

export default ChooseProficiency
