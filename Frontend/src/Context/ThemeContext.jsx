import React, { createContext, useState } from 'react'
export const ThemeContext = createContext();

function ThemeProvider({children}) {
const [theme,setTheme]= useState('light')
    const toggelTheme = ()=>{
        setTheme((prev)=>(prev=="light"?'dark':'light'));
    }
  return (
    <ThemeContext.Provider value={{theme,toggelTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;