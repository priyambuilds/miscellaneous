import axios from "axios"
import { useState } from "react"

export default function App() {
  
  return (
    <div>
      
    </div>
  )
}

function Todo(props) {
  return (
    <div className="m-10, p-20, border-2">
      <div>
        {props.title}
      </div>
    </div>
  )
}