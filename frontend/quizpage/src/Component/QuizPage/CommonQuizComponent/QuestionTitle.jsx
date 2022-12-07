import React from 'react'
import styles from "../QuestionType/quiz.module.css"
export default function QuestionTitle({question_name,questionNo}) {
  return (
    <div className={styles.questionName}>
       
        <div>{question_name}</div>
    </div>
  )
}
