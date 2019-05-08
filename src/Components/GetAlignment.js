import React from 'react'
import "../App.css"
import { Form, Card, Button, Grid } from 'semantic-ui-react'

const alignments = [
    "Lawful Good",
    "Neutral Good",
    "Chaotic Good",
    "Lawful Neutral",
    "Neutral",
    "Chaotic Neutral",
    "Lawful Evil",
    "Neutral Evil",
    "Chaotic Evil",
]

class GetAlignment extends React.Component {
  state = {
    alignment: "Neutral"
  }
  alignmentsList() {
    return alignments.map((alignment, index) => <option key={index} value={alignment}>{alignment}</option>)
  }

  handleChange = (event) => {
    this.setState({
      alignment: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.applyingAlignment(this.state.alignment)
  }

  description() {
    if (this.state.alignment === "Lawful Good") {
      return (
        <p>A lawful good character typically acts with compassion and always with honor and a sense of duty, though will often regret taking any action they fear would violate their code; even if they recognize such action as being good. Such characters include righteous knights, paladins, and most dwarves. Lawful good creatures include the noble golden dragons.</p>
      )
    } else if (this.state.alignment === "Neutral Good") {
      return (
        <p>A neutral good character typically acts altruistically, without regard for or against lawful precepts such as rules or tradition. A neutral good character has no problems with cooperating with lawful officials, but does not feel beholden to them. In the event that doing the right thing requires the bending or breaking of rules, they do not suffer the same inner conflict that a lawful good character would.</p>
      )
    } else if (this.state.alignment === "Chaotic Good") {
      return (
        <p>A chaotic good character does what is necessary to bring about change for the better, disdains bureaucratic organizations that get in the way of social improvement, and places a high value on personal freedom, not only for oneself, but for others as well. Chaotic good characters usually intend to do the right thing, but their methods are generally disorganized and often out of sync with the rest of society.</p>
      )
    } else if (this.state.alignment === "Lawful Neutral") {
      return (
        <p>A lawful neutral character typically believes strongly in lawful concepts such as honor, order, rules, and tradition, but often follows a personal code in addition to, or even in preference to, one set down by a benevolent authority. Examples of lawful neutral characters include a soldier who always follows orders, a judge or enforcer who adheres mercilessly to the letter of the law, and a disciplined monk.</p>
      )
    } else if (this.state.alignment === "Neutral") {
      return (
        <p>A neutral character (also called "true neutral") is neutral on both axes and tends not to feel strongly towards any alignment, or actively seeks their balance. Druids frequently follow this dedication to balance and, under Advanced Dungeons & Dragons rules, were required to be this alignment. In an example given in the Second Edition Player's Handbook, a typical druid might fight against a band of marauding gnolls, only to switch sides to save the gnolls clan from being totally exterminated.</p>
      )
    } else if (this.state.alignment === "Chaotic Neutral") {
      return (
        <p>A chaotic neutral character is an individualist who follows their own heart and generally shirks rules and traditions. Although chaotic neutral characters promote the ideals of freedom, it is their own freedom that comes first; good and evil come second to their need to be free.</p>
      )
    } else if (this.state.alignment === "Lawful Evil") {
      return (
        <p>A lawful evil character sees a well-ordered system as being easier to exploit and shows a combination of desirable and undesirable traits. Examples of this alignment include tyrants, devils, corrupt officials, and undiscriminating mercenary types who have a strict code of conduct.</p>
      )
    } else if (this.state.alignment === "Neutral Evil") {
      return (
        <p>A neutral evil character is typically selfish and has no qualms about turning on allies-of-the-moment, and usually makes allies primarily to further their own goals. A neutral evil character has no compunctions about harming others to get what they want, but neither will they go out of their way to cause carnage or mayhem when they see no direct benefit for themselves. Another valid interpretation of neutral evil holds up evil as an ideal, doing evil for evil's sake and trying to spread its influence. Examples of the first type are an assassin who has little regard for formal laws but does not needlessly kill, a henchman who plots behind their superior's back, or a mercenary who readily switches sides if made a better offer. An example of the second type would be a masked killer who strikes only for the sake of causing fear and distrust in the community.</p>
      )
    } else if (this.state.alignment === "Chaotic Evil") {
      return (
        <p>A chaotic evil character tends to have no respect for rules, other people's lives, or anything but their own desires, which are typically selfish and cruel. They set a high value on personal freedom, but do not have much regard for the lives or freedom of other people. Chaotic evil characters do not work well in groups because they resent being given orders and do not usually behave themselves unless there is no alternative. Examples of this alignment include higher forms of undead, such as liches, and violent killers who strike for pleasure rather than profit.</p>
      )
    }
  }

  render() {
    return (
      <div style={{paddingTop: "15%"}}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Card id='card-border' centered>
                  <Card.Content textAlign={"center"}>
                    <Card.Header id='add-font'>Choose An Alignment</Card.Header>
                      <Form.Field style={{marginTop: "8%"}}>
                        <Form onSubmit={this.handleSubmit}>
                          <select value={this.state.alignment} onChange={this.handleChange}>
                            {this.alignmentsList()}
                          </select>
                            <Button style={{marginTop: "8%"}} fluid={true} type="submit">Submit</Button>
                        </Form>
                      </Form.Field>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <h1>Understanding Alignment - {this.state.alignment}</h1>
                  {this.description()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    )
  }
}

export default GetAlignment
