import React from 'react'

export default function ErrorPageIndicator({msg}) {
  return (
    <div
    style={{display:"flex",textAlign:"center",justifyContent:'center',color:"red"}}>
        {msg}
    </div>
  )
}
