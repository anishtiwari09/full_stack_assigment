import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { AuthContext } from '../../Context/AuthContext'
import { fetchAllQuizData } from '../api'
import CreateNewQuiz from './CreateNewQuiz'

export default function AdminPanel() {
    const [createQuiz,setCreateQuiz]=useState(false)
    const [quizData,setQuizData]=useState([])
    const {token}=useContext(AuthContext)
    const handleCreateNewQuiz=()=>{
      setCreateQuiz(true)
    }
   const fetchQuizData=async()=>{
    try{
      let {data}=await fetchAllQuizData(token)
      if(data?.status){
        setQuizData(data?.data||[])
      }

    }
    catch(e){
      console.log(e)
    }
    
   }
   useEffect(()=>{
    if(!createQuiz)
    fetchQuizData()
},[createQuiz])
  return (
    <>
   {!createQuiz&& <div>
      <div><h3>Quiz List</h3></div>
      <Table>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Id</th>
            <th>Quiz Link</th>
          </tr>
        </thead>
        <tbody>
          {
            quizData?.map((item,i)=><tr key={i}>
              <td>
                {i+1}
              </td>
              <td>
                {item?._id}
              </td>
              <td>
                <a href={`/?quizId=${item?.test_name}` } target="_blank">{item?.test_name}</a>
              </td>
            </tr>)
          }
        </tbody>
      </Table>
    </div>}
    {createQuiz?<CreateNewQuiz setCreateQuiz={setCreateQuiz}/>:<div>
        <div>
            <button onClick={handleCreateNewQuiz}>Create new Quiz</button>
        </div>
    </div>}
    </>
  )
}
