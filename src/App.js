import React from 'react';
import './App.css';
import Navbar from './Containers/Navbar.js'

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
        <Navbar />

      </div>
    )
  }
}

export default App;
