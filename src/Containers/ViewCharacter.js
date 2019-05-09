import React from 'react'
import AttributeList from '../Components/CharacterSheetStuff/AttributeList.js'
import CharacterInfo from '../Components/CharacterSheetStuff/CharacterInfo.js'
import SkillList from '../Components/CharacterSheetStuff/SkillList.js'
import EquippedWeapon from '../Components/CharacterInventory/EquippedWeapon.js'
import EquippedArmor from '../Components/CharacterInventory/EquippedArmor.js'
import './StyleSheet.css'
import { Grid, Button, Table, Segment, Image, Dimmer, Loader } from 'semantic-ui-react'

class ViewCharacter extends React.Component {
  state = {
    loading: true,
    character: null,
    user: null,
    characters: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/users/" + this.props.user)
      .then(resp => resp.json())
      .then(data => this.setState({
        loading: false,
        character: this.props.match.params.character_id,
        user: this.props.user,
        characters: data.characters.map(character => character.id)
      }))
  }

  handleClick = () => {
    this.props.history.push("/spellbook/" + this.state.character)
  }


  renderCharacter() {
    console.log(this.state)
    // if (!this.state.loading && this.state.characters.some(character => character === this.state.character))
    if (!this.state.loading)
      return <Grid className={'main'} id="card-border-2">
        <Grid.Row>
          <Grid.Column>
            <CharacterInfo char={this.state.character} sendUpgrade={this.props.sendUpgrade}/>
          </Grid.Column>
          </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>

            <AttributeList char={this.state.character} user={this.props.user}/>
            <div style={{marginTop: "6%", marginBottom: "4%", textAlign: "center"}}>
              <Segment style={{width: "50%", left: "25%"}} id="card-border">
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTp8Y6SSyfkRU2XoYgLjt-YYquuEw89TsmdI2x_CiNEOKnQpMhg" size="tiny" circular centered />
                <br/>
                <Button id="add-font" color="black" onClick={this.handleClick}>Spellbook</Button>
              </Segment>
              </div>

          </Grid.Column>
          <Grid.Column>

              <SkillList char={this.state.character}/>

              <Segment>
              <Table className={'main'} compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Weapon</Table.HeaderCell>
                    <Table.HeaderCell>ATK Bonus</Table.HeaderCell>
                    <Table.HeaderCell>ATK Bonus (ranged/small weps)</Table.HeaderCell>
                    <Table.HeaderCell>Damage</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <EquippedWeapon char={this.state.character} />
                </Table.Body>
              </Table>
              <Button id="add-font" color="black" fluid={true} attached="top" onClick={() => this.props.history.push("/arsenal/" + this.state.character)}>Weapon Inventory</Button>
              </Segment>

              <Segment>
              <Table compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Armor</Table.HeaderCell>
                    <Table.HeaderCell>Armor Class</Table.HeaderCell>
                    <Table.HeaderCell>Armor Class unequipped</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <EquippedArmor char={this.state.character} />
                </Table.Body>
              </Table>
              <Button id="add-font" color="black" fluid={true} attached="top" onClick={() => this.props.history.push("/armory/" + this.state.character)}>Armor Inventory</Button>
              </Segment>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    }

  render() {
      return (
        <div>
          {
            this.state.loading ?
            <div>
              <Dimmer active>
                <Loader />
              </Dimmer>
            </div>
            :
            <React.Fragment>
            {this.renderCharacter()}
            </React.Fragment>
          }
        </div>
      )
    }
}

export default ViewCharacter
