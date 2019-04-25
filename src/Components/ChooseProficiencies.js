import React from 'react'

class ChooseProficiency extends React.Component {
  state = {
    klassInfo: {},
    chosen_profs: [],
    loading: true
  }


  componentDidMount() {
    fetch('http://www.dnd5eapi.co/api/classes/' + this.props.klassID)
      .then(resp => resp.json())
      .then(data => this.setState({
        klassList: data.proficiency_choices[0].from.map(prof => prof.name.slice(7)),
        klassInfo: data,
        loading: false
      })
    )
  }

  render() {
      !this.state.loading && console.log(this.state.klassInfo.proficiency_choices[0].from)

    return (
      <div>
      </div>
    )
  }
}

export default ChooseProficiency
