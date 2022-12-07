import React from 'react'

export default function CorrectAnswerIndicator({msg}) {
  return (
    <div
    style={{display:"flex",textAlign:"center",justifyContent:'center',color:"green"}}>
        {msg}
    </div>
  )
}
