import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import AdminPanel from './AdminPanel/AdminPanel'
import GeneralUser from './UserComponent/GeneralUser'

export default function RolePage() {
    const {currentRole}=useContext(AuthContext)
  return (
   <> <div style={{display:"flex",justifyContent:"center"}}>
       {currentRole=="admin"?<h1>Admin Panel</h1>:""} 
    </div>
   
       {currentRole=="admin"?<AdminPanel />:<GeneralUser />}
    </>
  )
}
