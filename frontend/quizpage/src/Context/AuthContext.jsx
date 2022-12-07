import React, { createContext, useEffect, useState } from 'react'
import { autoLogin } from '../Component/api'
export const AuthContext=createContext("Auth Context")
export default function AuthContextProvider({children}) {
  const [isLogin,setIsLogin]=useState(false)
  const [loading,setIsLoading]=useState(false)
  const [showSignUpPage,setShowSignUpPage]=useState(false)
  const [token,setToken]=useState("");
  const [currentRole,setCurrentRole]=useState("")
  const [quizId,setQuizId]=useState("")
const tokenValidator=async (token,email)=>{
try{
const {data}=await autoLogin(email,token)
if(data?.status){
  setIsLoading(false)
  setIsLogin(true)
  setCurrentRole(data?.data?.role)
  setToken(token)

}
}
catch(e){
  console.log(e)
  setIsLogin(false)
  setIsLoading(false)
  
}
}
const successfullySignIn=(token,role,email)=>{
setIsLoading(false)
setIsLogin(true)
setToken(token)
setCurrentRole(role)
localStorage.setItem("token",token)
localStorage.setItem('email',email)
}
const handleCheckToken=()=>{
  const search=window.location.search
 
  const params=new URLSearchParams(search)
  const quizId=params.get("quizId")
  setQuizId(quizId||"")
  let token=localStorage.getItem('token')
  let email=localStorage.getItem('email')
 
  if(token&&email){
    setIsLoading(true)
    
    tokenValidator(token,email)

  }
}

useEffect(()=>{
handleCheckToken()
},[])
const value={
  isLogin,
  setIsLogin,
  loading,
  setIsLoading,
  showSignUpPage,
  setShowSignUpPage,
  setCurrentRole,
  currentRole,
  setToken,
  successfullySignIn,
  quizId,
  token
}
  return (
    <>
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
    </>
  )
}
