import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AuthenticationPage from './Component/Authentication/AuthenticationPage';
import SignIn from './Component/Authentication/SignIn';
import SignUp from './Component/Authentication/Signup';
import Navbar from './Component/Navbar/Navbar';
import QuizController from './Component/QuizPage/QuizController';
import RolePage from './Component/RolePage';
import { AuthContext } from './Context/AuthContext';
import logo from './logo.svg';


function App() {
  const {  isLogin,loading}=useContext(AuthContext)
  const handleSignOut=()=>{
    localStorage.clear()
    window.location.reload()
  }
  if(loading)
  return <h1>Loading...</h1>

  return (
    <>
    {/* <QuizController /> */}
    <>
   {isLogin?<div style={{width:"90%",margin:"auto"}}>
<div style={{
  width:"80%",
  margin:"auto",
  marginTop:"2rem"
}}>
<Button onClick={handleSignOut}>Logout</Button>
</div>
    <RolePage />
   </div>:<AuthenticationPage />}
    </>
    </>
  );
}

export default App;
