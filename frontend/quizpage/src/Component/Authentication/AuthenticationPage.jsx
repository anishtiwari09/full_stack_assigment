import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Navbar from '../Navbar/Navbar'
import SignIn from './SignIn'
import SignUp from './Signup'

export default function AuthenticationPage() {
    const {  showSignUpPage}=useContext(AuthContext)
  return (
    <>
     <Navbar />
   {showSignUpPage? 
   <SignUp />:
   <SignIn />
  }
    </>
  )
}
