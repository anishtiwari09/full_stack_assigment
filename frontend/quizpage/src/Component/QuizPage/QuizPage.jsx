import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { AuthContext } from '../../Context/AuthContext'
import { getQuestionData } from '../api'
import QuizController from './QuizController'
import QuizResult from './QuizResult'


export default function QuizPage() {
  const {quizId,token}=useContext(AuthContext)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)
  const [invalidQuizId,setInvalidQuizId]=useState(false)
  const [quizCompleted,setQuizCompleted]=useState(false)
  const [questiondData, setQuestionData] = useState({})
  const [quizDetails, setQuizDetails] = useState({})
 
  const fetchDataQuiz = async () => {
    console.log('workkk')
    setLoading(true)
    try {
      if(!quizId)
      {
        setInvalidQuizId(true)
        return
      }
      const { data } = await getQuestionData(quizId,token);
      if(data?.status){
        if(!data?.quizCompleted)
      setQuestionData(data?.quizData||{})
      else
      setQuizCompleted(true)
      setQuizDetails(data?.quizDetails||{})
      
      
    }
      setLoading(false)
   
    } catch (e) {
      setLoading(false)
      setInvalidQuizId(true)
      
      console.log(e);
    }
  };
  useEffect(()=>{

    fetchDataQuiz()
    return ()=>{console.log('unmounting')}
  },[])
  return (
    <div>
    {loading?<div>
      <h5>Loading...</h5>
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>:invalidQuizId?<h5>No quiz assigned to this batch</h5>:quizCompleted?<QuizResult data={quizDetails}/>:<QuizController questiondData={questiondData} quizDetails={quizDetails} fetchDataQuiz={fetchDataQuiz}/>}
    </div>
  )
}
