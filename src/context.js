// import {createContext, useState} from 'react'

// export const Mycontext = createContext(null)


//  function  Message ({children}){
//       const [num,setNum] = useState('')
//     return (
//         <Mycontext.Provider value={{num,setNum}}>
//           {children}
//         </Mycontext.Provider>
//     )
//  }
//  export default Message




import { useReducer } from "react";

import React from 'react'

function context() {
    const InitialValue = {
        count:0
    }
    const  reducer = (state,action)=>{
        switch(action){
            case action.type:'One'
            return {state:state+action.Payload}
            case action.type:'Two'
            return {state:state-action.Payload}
        }
    }

   const [state,dispatch] = useReducer(reducer,InitialValue)
  return (
    <div>
        <button onClick={()=>{dispatch({type:'One',Payload:5})}}></button>
        <button onClick={()=>{dispatch({type:'Two',Payload:2})}}></button>
        <h1>{state.count}</h1>
    </div>
  )
}

export default context