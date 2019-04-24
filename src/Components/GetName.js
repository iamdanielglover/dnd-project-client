import React from 'react'
import '../App.css'

const GetName = (props) => {
  return (
    <div className="name-form">
      <form>
        <input type="text" placeholder="Enter Name"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default GetName
