import React from 'react'
import { Menu } from 'semantic-ui-react'

class Navbar extends React.Component {

  handleClickHome = () => {
    this.props.sendHome()
  }

  handleClickCharacters = () => {
    this.props.sendList() 
  }

  render() {
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
      </Menu>
    )
  }
}

export default Navbar
