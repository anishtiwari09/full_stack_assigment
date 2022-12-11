import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AuthContext } from "../../Context/AuthContext";
import ConfirmationModal from "../../Utils.jsx/ConfirmationModal";
import { createNewQuiz,  getQuizOptionData } from "../api";
import ErrorPageIndicator from "../Indicator/ErrorPageIndicator";
import LoadingIndicator from "../Indicator/LoadingIndicator";

export default function CreateNewQuiz({setCreateQuiz}) {
  const [userArray, setUserArray] = useState([]);
  const { token } = useContext(AuthContext);
  const [questionArray, setQuestionArray] = useState([]);
  const [loading,setLoading]=useState(false)
  const [showError,setError]=useState(false)
  const [errorMsg,setErrorMsg]=useState("")
  const [selectedQuestionId,setSelectedQuestionId]=useState([])
  const [selectedUserId,setSelectedUserId]=useState([])
  const fetchQuizOptions = async () => {
try{
  setLoading(true)
  console.log(token)
const {data}=await getQuizOptionData("",token)
setLoading(false)
if(data.status){
  setUserArray(data?.userData)
  setQuestionArray(data?.questionBanks)
  
}
else{
 
  setError(true)
  setErrorMsg(data?.msg)
}
}
catch(e){
  console.log(e)
  setError(true)
  setErrorMsg(e?.response?.data?.msg)
  setLoading(false)
}
  };
  useEffect(()=>{
    fetchQuizOptions()
  },[])
  const handleAddQuestion=(id)=>{
if(selectedQuestionId?.length>=10){
alert('you can only add 10 question')
return
}
selectedQuestionId.push(id)
setSelectedQuestionId([...selectedQuestionId])
  }
  const handleAddUser=(id)=>{
    selectedUserId?.push(id)
    setSelectedUserId([...selectedUserId])
  }
  const quizRef=useRef()
  const handleSubmit=async()=>{
    setLoading(true)
    try{

  let quizId=quizRef.current?.value
  if(!quizId)
  {
    setLoading(false)
    setError(true)
    setErrorMsg("Quiz Id Can not be empty")

    return 

  }
  if(selectedQuestionId?.length!=10)
  {
    setLoading(false)
    setError(true)
    setErrorMsg("please add atleas one question")

    return 

  }
  if(selectedUserId?.length<1)
  {
    setLoading(false)
    setError(true)
    setErrorMsg("please add atleast one user")

    return 

  }
  let data=await createNewQuiz(token,{allUsersId:selectedUserId,questionIds:selectedQuestionId,quizId:quizId})

if(data?.status)
setShowModal(true)
setError(false)
setLoading(false)

}
catch(e){
setLoading(false)
console.log(e)
setError(true)
setErrorMsg(e?.response?.data?.msg)
}

  }
const [showModal,setShowModal]=useState(false)
const handleCloseModal=()=>{
  setCreateQuiz(false)
  setShowModal(false)
}
  return (<>
     <ConfirmationModal 
     show={showModal}
     onHide={() => handleCloseModal()}
     />
    <div>
   
{loading?<LoadingIndicator />:showError?<ErrorPageIndicator msg={errorMsg}/>:""}
      <div style={{ display: "flex", gap: "0.8rem",marginBottom:20 }}>
        <div>Enter Quiz Unique Id:</div>
        <div>
          <input type="text" placeholder="UniqueQuizId" ref={quizRef} style={{height:40,borderRadius:5}}/>
        </div>
      </div>
    <div style={{display:"flex",gap:"1rem",justifyContent:"space-evenly",flexWap:"wrap"}}>
   {selectedQuestionId?.length>0&& <div >
        <div><h4>Selected Question Id</h4></div>
    <div>
      <Table>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>_id</th>
          </tr>
        
        </thead>
        <tbody>
          {
            selectedQuestionId?.map((item,i)=><tr>
              <td>{i+1}</td>
              <td>{item}</td>
            </tr>)
          }
        </tbody>
      </Table>
    </div>
      </div>}
     {selectedUserId?.length>0&& <div >
        <div><h4>Selected User Id</h4></div>
    <div>
      <Table>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>_id</th>
          </tr>
        
        </thead>
        <tbody>
          {
            selectedUserId?.map((item,i)=><tr>
              <td>{i+1}</td>
              <td>{item}</td>
            </tr>)
          }
        </tbody>
      </Table>
    </div>
      </div>}
    </div>
      <div>
        <div><h4>Add Users</h4></div>
        <div>
          <Table responsive="lg"  >
            <thead>
              <tr>
                <th>Sr.</th>
                <th>
                  Id
                </th>
                <th>
                  Name
                </th>
                <th>
                  Email
                </th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>{
                userArray?.map((item,i)=>
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{item?._id}</td>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td >{selectedUserId?.includes(item?._id)?"Added":<Button onClick={()=>handleAddUser(item?._id)}>Add</Button>}</td>
                  </tr>
              )
              }
                </tbody>
           
          </Table>
        </div>
      </div>
      <div><div><h4>
       Add Questions
        </h4></div>
        <div>
         { <Table>
            <thead>
              <tr>
                <th>
                  Sr.
                </th>
                <th>
                 Question id
                </th>
                <th>
                  Question Type
                </th>
                <th>
                 
                </th>
              </tr>
            </thead>
            <tbody>
              {questionArray?.map((item,i)=>{
                return <tr key={i}>
                   <td>{i+1}</td>
                   <td>{item?._id}</td>
                   <td>{item?.question_type}</td>
                   <td><Button onClick={()=>handleAddQuestion(item?._id)}>Add</Button></td>
                </tr>
              })}
            </tbody>
          </Table>}
        </div>
        </div>
     {!loading&& <div><Button onClick={handleSubmit}>Submit</Button></div>}
    </div>
    </>
  );
}
