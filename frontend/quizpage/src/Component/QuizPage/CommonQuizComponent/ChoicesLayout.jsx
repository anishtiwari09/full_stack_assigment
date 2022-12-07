import React from 'react'
import styles from "../QuestionType/quiz.module.css"
export default function ChoicesLayout({choices,selectedOption,onClick}) {
 
  return (
    <div className={styles.choiceContainer}>
    {choices?.map((item,key)=>{
     return <div key={key} className={`${styles.choices}  ${selectedOption?.includes(key)&&styles.selectedChoiceType}`} onClick={()=>onClick(key)}>
      <div >{String.fromCharCode(65+key)}</div>
      <div>
      {item?.value}
      </div>
     </div>
    })}
  </div>
  )
}
