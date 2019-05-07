import React from 'react'
import { Card, Button, Form } from "semantic-ui-react"
import '../App.css'

class GetName extends React.Component {
  state = {
    input: ""
  }

  handleChange = (event) => {
    if (event.target.value.length < 20)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.applyingName(this.state.input)
  }

  render() {
    return (
        <div style={{paddingTop: "15%"}}>
          <Card id='card-border' centered>
            <Card.Content textAlign={"center"}>
              <Card.Header id='add-font'>Enter A Name</Card.Header>
                <Form.Field style={{marginTop: "8%"}}>
                  <Form onSubmit={this.handleSubmit}>
                      <input type="text" placeholder="Enter Name" name="input" value={this.state.input} onChange={this.handleChange} />
                      <br/>
                      <Button style={{marginTop: "8%"}} fluid={true} type="submit">Submit</Button>
                  </Form>
                </Form.Field>
            </Card.Content>
          </Card>
        </div>
    )
  }
}

export default GetName
