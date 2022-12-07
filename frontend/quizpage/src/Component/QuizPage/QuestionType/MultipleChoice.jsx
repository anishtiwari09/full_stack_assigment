import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext';
import { updateQuizDetails } from '../../api';
import ErrorPageIndicator from '../../Indicator/ErrorPageIndicator';
import ChoicesLayout from '../CommonQuizComponent/ChoicesLayout';
import CorrectAnswerIndicator from '../CommonQuizComponent/CorrectAnswerIndicator';
import QuestionTitle from '../CommonQuizComponent/QuestionTitle';
import SolveButton from '../SolveButton';
import styles from "./quiz.module.css";
export default function MultipleChoice({data,fetchDataQuiz}) {
  const { question_name } = data?.question_data;
  const { choices } = data?.question_data;
  const [isSolved,setIsSolved]=useState(false)
  const [isCorrect,setIsCorrect]=useState(false)
  const {token,quizId}=useContext(AuthContext)
  let [selectedOption,setSelectedOptions]=useState("")
  const handleSelectChoice=(key)=>{
    if(isSolved)
    return
   setSelectedOptions(key)
  }
  const handleSubmit=async()=>{
   try{
    if(isSolved)
    return
    if(selectedOption==="")
    {
      alert("please choose atlease one answer")
      return
    }
  
      setIsCorrect(choices[selectedOption]?.is_correct||false)
      
    

    await updateQuizDetails(quizId,token,choices[selectedOption]?.is_correct||false)
    setIsSolved(true)
   }
   catch(e){
    console.log(e)
    setIsSolved(false)
   }
  }
  const handleNextQuestion=()=>{
    fetchDataQuiz()
  }
  return (
    <div className={styles.container}>
      {isSolved?(!isCorrect?<ErrorPageIndicator msg={"Incorrect"}/>:<CorrectAnswerIndicator msg={"Correct"}/>):""}
      <SolveButton isSolved={isSolved} onClick={isSolved?handleNextQuestion:handleSubmit}/>
    <QuestionTitle question_name={question_name} />
    <ChoicesLayout choices={choices} selectedOption={[selectedOption]} onClick={handleSelectChoice}/>
  </div>
  )
}
