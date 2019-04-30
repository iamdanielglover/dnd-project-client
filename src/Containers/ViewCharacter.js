import React from 'react'
import AttributeList from '../Components/CharacterSheetStuff/AttributeList.js'
import CharacterInfo from '../Components/CharacterSheetStuff/CharacterInfo.js'
import SkillList from '../Components/CharacterSheetStuff/SkillList.js'
import { Grid } from 'semantic-ui-react'

class ViewCharacter extends React.Component {
  state = {
    loading: true,
    character: null,
    user: null
  }

  componentDidMount() {
    this.setState({
      loading: false,
      character: this.props.match.params.character_id,
      user: this.props.user
    })
  }

  renderCharacter() {
    if (!this.state.loading)
      return <Grid>
        <Grid.Row>
          <Grid.Column>
            <CharacterInfo char={this.state.character} sendUpgrade={this.props.sendUpgrade}/>
          </Grid.Column>
          </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column style={{backgroundColor: "red"}}>
            <AttributeList char={this.state.character} user={this.props.user}/>
          </Grid.Column>
          <Grid.Column style={{backgroundColor: "blue"}}>
              <SkillList char={this.state.character}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }

  render() {
      return (
        <div style={{paddingLeft: 100, paddingRight: 100}}>
          {this.renderCharacter()}
        </div>
      )
    }
}

export default ViewCharacter
