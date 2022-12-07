import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import styles from "./Navbar.module.css";
export default function Navbar() {
    const {  showSignUpPage,setShowSignUpPage}=useContext(AuthContext)
    const handleTabChange=(val)=>{
setShowSignUpPage(val)
    }
  return (
    <div className={styles.container}>
      <div className={showSignUpPage?styles.selectedTab:""} onClick={()=>handleTabChange(true)}>Signup</div>
      <div className={!showSignUpPage?styles.selectedTab:""} onClick={()=>handleTabChange(false)}>SignIn</div>
    </div>
  );
}
