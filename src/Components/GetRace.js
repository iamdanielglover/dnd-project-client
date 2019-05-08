import React from 'react'
import '../App.css'
import { Form, Card, Button, Grid } from 'semantic-ui-react'

class GetRace extends React.Component {
  state = {
    races: [],
    chosen_race: "Dwarf",
  }

  componentDidMount() {
    this.fetchRaces()
  }

  fetchRaces() {
    fetch('http://localhost:3000/api/v1/races')
      .then(resp => resp.json())
      .then(data => this.setState({
        races: data
      }))
  }

  handleChange = (event) => {
    this.setState({
      chosen_race: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const race = this.state.races.find(race => race.name === this.state.chosen_race)
    this.props.applyingRace(race.id)
  }

  renderRaces = () => this.state.races.map((race, index) => <option key={index} value={race.name}>{race.name}</option>)

  description() {
    if (this.state.chosen_race === "Dwarf") {
      return (
        <p> Dwarves are well liked and widely accepted, and are well known for their work ethic, whether they are a blacksmith, baker, or politician. Stereotypes tend to cast dwarves as being overly fond of both money and alcohol, though in truth most will put family and clan above all else. Most worship the Sovereign Host, especially Dol Arrah, Kol Korran, and Onatar. Hill dwarves and mountain dwarves appear with equal consistency across the entire race, though individual clans tend to lean one way or the other. Regardless of subrace, most dwarves hold grudge with orcs, especially the Jhorash'Tar clan, who fought the dwarves for control of the Ironroot mountains many thousands of years ago. The dwarves traveled there seeking to escape the harsh cold of their native lands, the Frostfell. Dragonmarked dwarves are of House Kundarak, which was once a clan like any other before it gained great influence thanks to the Mark of Warding. As a result, most of the economy rests in the hands of dwarves, because House Kundarak controls the banking system. Between their sheer economic strength and good reputation, they also exert a considerable political pressure on every nation in Khorvaire.</p>
      )
    } else if (this.state.chosen_race === "Elf") {
      return (
        <p> Elves are a magical people of otherworldly grace, living in the world but not entirely part of it. They live in places of ethereal beauty, in the midst of ancient forests at in silvery spires glittering with faerie light, where soft music drifts through the air and gentle fragrances waft on the breeze. Elves lave nature and magic, art and artistry, music and poetry, and the good things of the world.</p>
      )
    } else if (this.state.chosen_race === "Dragonborn") {
      return (
        <p> Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by draconic gods OI the dragons themselves, dragonborn originally hatched from dragon eggs as a unique race, combining the best attributes of dragons and humanoids. Some dragonborn are faithful servants to true dragons, others form the ranks of soldiers in great wars, and still others find themselves adrift, with no clear calling in life.</p>
      )
    } else if (this.state.chosen_race === "Human") {
      return (
        <p> In the reckonings of most worlds, humans are the youngest of the common races, late to arrive on the world scene and short-lived in comparison to dwarves, elves, and dragons. Perhaps it is because of their shorter lives that they strive to achieve as much as they can in the years they are given. Or maybe they feel they have something to prove to the elder races, and that's why they build their mighty empires on the foundation of conquest and trade. Whatever drives them. humans are the innovators, the achievers, and the pioneers of the worlds.
</p>
      )
    } else if (this.state.chosen_race === "Gnome") {
      return (
        <p> A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their closeknit communities. Louder sounds punctuate the hum: a crunch of grinding gears here, a minor explosion there, a yelp of surprise or triumph, and especially bursts of laughter. Gnomes take delight in life, enjoying every moment of invention, exploration, investigation, creation, and play.</p>
      )
    } else if (this.state.chosen_race === "Tiefling") {
      return (
        <p> To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struck generations ago infused the essence of Asmodeus-overlord of the Nine Hells-into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin, for which they and their children and their children's children will always be held accountable.</p>
      )
    } else if (this.state.chosen_race === "Half-Orc") {
      return (
        <p> Whether united under the leadership of a mighty warlock, having fought to a standstill after years of conflict, orc and human tribes sometimes form alliances, joining forces into a larger horde lo the terror of civilized lands nearby. When these alliances are sealed by marriages, half-orcs are born. Some half-orcs rise to become proud chiefs of orc tribes, their human blood giving them an edge over their full-blooded orc rivals. Some venture into the world lo prove their worth among humans and other more civilized races. Many of these become adventurers, achieving greatness for their mighty deeds and notoriety for their barbaric customs and savage fury.</p>
      )
    } else if (this.state.chosen_race === "Half-Elf") {
      return (
        <p> Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition tempered by the refined senses, love of nature, and artistic tastes of the elves. Some half-elves live among humans, set apart by their emotional and physical differences, watching friends and loved ones age while time barely touches them. Others live with the elves, growing restless as they reach adulthood in the timeless elven realms, while their peers continue to live as children. Many half-elves, unable to fit into either society, choose lives of solitary wandering or join with other misfits and outcasts in the adventuring life.</p>
      )
    } else if (this.state.chosen_race === "Halfling") {
      return (
        <p> The comforts of home are the goals of most halflings lives: a place to settle in peace and quiet, far from marauding monsters and lashing armies; a blazing tire and a generous meal; fine drink and fine conversation. Though some halflings live out their days in remote, agricultural communities, others form nomadic bands that travei constantly, lured by the open road and the wide horizon to discover the wonders of new lands and peoples. But even these wanderers love peace, food, hearth, and home, though home might be a wagon jostling along an dirt road or a raft floating downriver.</p>
      )
    }

  }

  render() {
    return (
      <div style={{paddingTop: "10%"}}>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Card id='card-border' centered>
                <Card.Content textAlign={"center"}>
                  <Card.Header id='add-font'>Choose A Race</Card.Header>
                    <Form.Field style={{marginTop: "8%"}}>
                      <Form onSubmit={this.handleSubmit}>
                        <select value={this.state.chosen_race} onChange={this.handleChange}>
                          {this.renderRaces()}
                        </select>
                          <Button style={{marginTop: "8%"}} fluid={true} type="submit">Submit</Button>
                      </Form>
                    </Form.Field>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <h1>Description of {this.state.chosen_race}</h1>
                {this.description()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}



export default GetRace
