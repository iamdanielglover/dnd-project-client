import React from 'react'
import { Switch, Route, withRouter } from "react-router-dom"
import CreateCharacter from './CreateCharacter.js'
import ViewChars from './ViewChars'

class Landing extends React.Component {


  render() {
    return (
      <div>
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
        <button onClick={() => this.props.history.push("/create-character")}>Create</button>
        <button onClick={() => this.props.history.push("/view-characters")}>View</button>
      </div>
    )
  }
}

export default withRouter(Landing)
