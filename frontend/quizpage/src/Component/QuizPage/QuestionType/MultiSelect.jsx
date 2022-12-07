import React, { useContext, useState } from "react";
import styles from "./quiz.module.css";
import ChoicesLayout from "../CommonQuizComponent/ChoicesLayout";
import QuestionTitle from "../CommonQuizComponent/QuestionTitle";
import CorrectAnswerIndicator from "../CommonQuizComponent/CorrectAnswerIndicator";
import ErrorPageIndicator from "../../Indicator/ErrorPageIndicator";
import { updateQuizDetails } from "../../api";
import { AuthContext } from "../../../Context/AuthContext";
import SolveButton from "../SolveButton";
export default function MultiSelect({ data ,fetchDataQuiz}) {
  const { question_name } = data?.question_data;
  const [ choices,setchoices ] = useState(data?.question_data?.choices);
  let [selectedOption,setSelectedOptions]=useState([])
  const [isSolved,setIsSolved]=useState(false)
  const [isCorrect,setIsCorrect]=useState(false)
  const {token,quizId}=useContext(AuthContext)
  const handleSelectChoice=(key)=>{
    if(isSolved)
    return
    choices[key].studentAnswer=!(choices[key]?.studentAnswer);
    setchoices([...choices])
    if(selectedOption?.includes(key)){
      selectedOption=selectedOption?.filter((value)=>value!==key)
      setSelectedOptions([...selectedOption])

      return
    }
      selectedOption.push(key)
      setSelectedOptions([...selectedOption])
  }
  const handleSubmit=async()=>{
    try{
     if(isSolved)
     return
     if(selectedOption?.length<1)
     {
       alert("please choose atlease one answer")
       return
     }
   
      let isCorrect=true
    for(let item of choices){
      if(item?.is_correct!==(item?.studentAnswer||false)){
        isCorrect=false
        break
      }
    }
     setIsCorrect(isCorrect)
 
     await updateQuizDetails(quizId,token,isCorrect||false)
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
      <ChoicesLayout choices={choices} selectedOption={selectedOption} onClick={handleSelectChoice}/>
    </div>
  );
}
