import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { userSignIn } from '../api'
import ErrorPageIndicator from '../Indicator/ErrorPageIndicator'
import LoadingIndicator from '../Indicator/LoadingIndicator'
import styles from "./Authentication.module.css"
export default function SignIn() {
  const emailRef=useRef()
  const passwordRef=useRef()
  const [errorMsg,setErrorMsg]=useState("")
  const [showError,setShowError]=useState(false)
  const [loading,setLoading]=useState(false)
  const {successfullySignIn}=useContext(AuthContext)
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(loading)
    return
try{
  setLoading(true)
  let email=emailRef?.current?.value
  let password=passwordRef?.current?.value
  
  var {data}=await userSignIn({email,password})
  setLoading(false)
  
  if(data?.status){
   
    typeof successfullySignIn=="function"&&successfullySignIn(data?.data?.token,data?.data?.role,data?.data?.email)
  }
  else{
    setShowError(true)
    setErrorMsg(data?.msg)



  }
}
catch(e){
setLoading(false)
setShowError(true)
console.log(e)
    setErrorMsg(e?.response?.data?.msg)
}

  }
  console.log(errorMsg)
  return (
    <div >
      {loading?<LoadingIndicator />:showError?<ErrorPageIndicator msg={errorMsg}/>:""  
    }
      <form method="post" onSubmit={handleSubmit} className={styles.container}>
        <div>
          <div className={styles.bolderFont}>Email:</div>
          <div>
            <input type="email" placeholder='someone@gmail.com' className={styles.inputBox} ref={emailRef}/>
          </div>
        </div>
        <div>
          <div className={styles.bolderFont}>Password:</div>
          <div>
            <input type="password" placeholder='password' className={styles.inputBox} ref={passwordRef}/>
          </div>
          
        </div>
      {!loading&&  <div>
            <input type="submit" value="login"/>
          </div>}
      </form>
    </div>
  )
}
