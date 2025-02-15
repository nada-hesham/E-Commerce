import React, { createContext, useState } from 'react'
export let conText=createContext()
export default function ContextProvider({children}) {

    const [token , setToken]=useState(localStorage.getItem("token"))
  return <conText.Provider value={{token , setToken}}>
    {children}
  </conText.Provider>
}
