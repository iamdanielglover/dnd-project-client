import React from 'react';
import './App.css';
import CreateCharacter from './Containers/CreateCharacter.js'

class App extends React.Component {
  state = {
      user: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/1')
      .then(resp => resp.json())
      .then(data => this.setState({
        user: data
      }))
  }

  render() {
    return (
      <div className="App">
        <h1>Howdy</h1>
        <CreateCharacter user={this.state.user}/>
      </div>
    )
  }
}

export default App;
