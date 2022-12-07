import React, { useRef } from "react";
import MultipleChoice from "./QuestionType/MultipleChoice";
import MultiSelect from "./QuestionType/MultiSelect";

export default function QuizController({questiondData ,quizDetails,fetchDataQuiz}) {
  const choicesRef=useRef([])
  return (
    <><div
    style={{display:"flex",flexDirection:"column",width:"80%",margin:"auto"}}
    >
      {
     
          <div style={{
            display:"flex",
            textAlign:"center",
            justifyContent:"space-evenly",
            marginTop:"1rem"
          }}>
            <div><h5>Q-{quizDetails?.currentQuestion}</h5></div>
            <div><h5>Attempt- {quizDetails?.attempt}</h5></div>
            <div><h5>Level- {quizDetails?.currentLevel}</h5></div>
          </div>
        
      }
      {questiondData?.question_type === "multiple_choice" ? (
        <MultipleChoice data={questiondData} fetchDataQuiz={fetchDataQuiz}/>
      ) : questiondData?.question_type === "multiple_select" ? (
        <MultiSelect data={questiondData} fetchDataQuiz={fetchDataQuiz}/>
      ) : null}
      </div>
    </>
  );
}
