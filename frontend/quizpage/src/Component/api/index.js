import axios from "axios"

const Base_Url="https://vercel-node-three-ruddy.vercel.app/"
export function getQuestionData(quizId,token){
  
  var config = {
    method: 'get',
    url: `${Base_Url}quizquestion?quizId=${quizId}`,
    headers: { 
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }
  };
  return axios(config)
}
export function updateQuizDetails(quizId,token,isCorrect){
  console.log(token)
  var config = {
    method: 'get',
    url: `${Base_Url}updateQuizDetails?quizId=${quizId}&isCorrect=${isCorrect}`,
    headers: { 
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }
  };
  return axios(config)
}
export function createUser(data){
    var config = {
        method: 'post',
        url: `${Base_Url}createUser`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
    return axios(config)
}
export function userSignIn({email,password}){
  return axios.get(`${Base_Url}signIn`,{
    params:{
      email,
      password
    }
  })
}
export function autoLogin(email,token){
  return axios.get(`${Base_Url}autoLogin`,{
    params:{
      email,token
    }
  })
}
export function getQuizOptionData(email,token){
  var config = {
    method: 'get',
    url: `${Base_Url}getQuizDetails`,
    headers: { 
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }
  };
  return axios(config)
}
export function createNewQuiz(token,data){
  var config = {
    method: 'post',
    url: `${Base_Url}createNewQuiz`,
    headers: { 
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    },
    data:data
  };
  return axios(config)
}
export function fetchAllQuizData(token){
  var config = {
    method: 'get',
    url: `${Base_Url}getAllQuizData`,
    headers: { 
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }
  };
  return axios(config)
}
