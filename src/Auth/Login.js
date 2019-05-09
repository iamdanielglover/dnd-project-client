import React from 'react'
import { Form, Button, Card } from 'semantic-ui-react'

class LoginForm extends React.Component {
	state = {
		username: "",
		password: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = () => {
		// console.log("LOGGING IN", this.state)
		fetch("http://localhost:3000/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json"
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then((response) => {
			if(response.errors){
				// If login failed
				alert(response.errors)
			} else {
				// If login succeeded
        console.log(response)
				this.props.login(response)
			}
		})
	}

	render(){
		return (
      <div style={{marginTop: "10%"}}>
			<Card centered >
				<Card.Content>
					<Card.Header id="add-font" textAlign="center">Please Login</Card.Header>
					<Form style={{marginTop: "5%"}} onSubmit={this.handleSubmit}>
	  		    <Form.Field>
	  		      <label>Username</label>
	  		      <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
	  		    </Form.Field>
	  		    <Form.Field>
	  		      <label>Password</label>
	  		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
	  		    </Form.Field>
	  		    <Button type='submit'>Submit</Button>
	  		  </Form>
				</Card.Content>
			</Card>
      </div>
		)
	}
}

export default LoginForm
