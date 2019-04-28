import React from 'react'
import AttributeList from '../Components/CharacterSheetStuff/AttributeList.js'
import CharacterInfo from '../Components/CharacterSheetStuff/CharacterInfo.js'
import SkillList from '../Components/CharacterSheetStuff/SkillList.js'
import EquipmentProficiencies from '../Components/CharacterSheetStuff/EquipmentProficiencies.js'

const ViewCharacter = (props) => {
    return (
      <div>
        <CharacterInfo char={props.character}/>
        <br/>
        <AttributeList char={props.character} user={props.user}/>
        <br/>
        <SkillList char={props.character}/>
        <br/>
        <EquipmentProficiencies />
      </div>
    )
}

export default ViewCharacter
