import React from 'react'
import { Menu } from 'semantic-ui-react'

class Navbar extends React.Component {

  handleClickHome = () => {
    this.props.sendHome()
  }

  handleClickCharacters = () => {
    this.props.sendList()
  }

  whatToRender = () => {
    if (this.props.user) {
      return (
        <Menu style={{backgroundColor: "#d4d4d594"}}>
            <Menu.Item
            onClick={() => this.handleClickHome()}
            >
            Home
          </Menu.Item>
          <Menu.Item
            onClick={() => this.handleClickCharacters()}
            >
            Characters
          </Menu.Item>
          <Menu.Item
          position={"right"}
            onClick={() => this.props.logOut()}
            >
            Logout
          </Menu.Item>
        </Menu>
      )
    }
     if (this.props.user === null) {
      return (
        <Menu style={{backgroundColor: "#d4d4d594"}}>
          <Menu.Item
            onClick={() => this.props.sendLogin()}
            >
            Login
          </Menu.Item>
          <Menu.Item
            onClick={() => this.props.sendSignup()}
            >
            Signup
          </Menu.Item>
        </Menu>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.whatToRender()}
      </React.Fragment>
    )
  }
}

export default Navbar
