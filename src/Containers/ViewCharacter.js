import React from 'react'
import AttributeList from '../Components/CharacterSheetStuff/AttributeList.js'
import CharacterInfo from '../Components/CharacterSheetStuff/CharacterInfo.js'
import SkillList from '../Components/CharacterSheetStuff/SkillList.js'
import EquipmentProficiencies from '../Components/CharacterSheetStuff/EquipmentProficiencies.js'
import SavingThrows from '../Components/CharacterSheetStuff/SavingThrows.js'

const ViewCharacter = (props) => {
    return (
      <div>
        <CharacterInfo char={props.character}/>
        <br/>
        <AttributeList char={props.character} user={props.user}/>
        <br/>
        <SkillList char={props.character}/>
        <br/>
        <EquipmentProficiencies char={props.character}/>
        <br/>
        <SavingThrows char={props.character}/>
      </div>
    )
}

export default ViewCharacter
