import React from 'react'
import { Switch, Route, withRouter } from "react-router-dom"
import CreateCharacter from './CreateCharacter.js'
import ViewChars from './ViewChars'

class Navbar extends React.Component {


  render() {
    return (
      <div>
      <span>
        <h1>WELCOME</h1>
        <button onClick={() => this.props.history.push("/create-character")}>Create</button>
        <button onClick={() => this.props.history.push("/view-characters")}>View</button>
      </span>
        <Switch>
          <Route
            path="/create-character"
            render={(routerProps) => <CreateCharacter {...routerProps} /> }
          />
          <Route
            path="/view-characters"
            render={(routerProps) => <ViewChars {...routerProps} /> }
          />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Navbar)
