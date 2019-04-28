import React from 'react'

class SkillList extends React.Component {
  state = {

  }

  getUnique(arr,comp){
     const unique =  arr.map(e=> e[comp])
                    .map((e,i,final) =>final.indexOf(e) === i && i)
                   .filter((e)=> arr[e]).map(e=>arr[e]);
    return unique
  }

  render() {
    return (

    )
  }
}
