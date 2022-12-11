import React, { useContext } from 'react'
import { Table } from 'react-bootstrap'
import { AuthContext } from '../../Context/AuthContext'
import GraphResult from './CommonQuizComponent/graphResult'

export default function QuizResult({data}) {
    const {quizId}=useContext(AuthContext)
  return (
    <div
    style={{display:"flex",flexDirection:"column",maxWidth:700,margin:"auto",width:"90%",margin:"auto",alignItems:"center",gap:"1rem",marginTop:"2rem"}}
    
    >
        <h5>Result</h5>
        <h5>Quiz id: {quizId}</h5>
        <Table>
            <thead>
                <tr>
                    <th>Total Question</th>
                    <th>No. of Attempt</th>
                    <th>level</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data?.currentQuestion}</td>
                    <td>{data?.attempt}</td>
                    <td>{data?.currentLevel}</td>
                    <td>{data?.score}</td>
                </tr>
            </tbody>
        </Table>
        <div>
            <h2>Graph</h2>
            <GraphResult dataset={data?.data_varient||[]}/>
        </div>
    </div>
  )
}
