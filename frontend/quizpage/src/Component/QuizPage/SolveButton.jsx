import React from 'react'
import { Button } from 'react-bootstrap'

export default function SolveButton({onClick,isSolved}) {
  return (
    <div>
        <Button onClick={onClick}>
           {isSolved?" Next":"Solve"}
        </Button>
    </div>
  )
}
