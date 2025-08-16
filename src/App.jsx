import { useState, useCallback ,useEffect,useRef} from 'react'
import { Sun, Moon } from "lucide-react";
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [isDark, setIsDark] = useState(true)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "@!#$%^&*(){}[]|"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)

    }
     setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed,passwordGenerator])
  const passwordRef = useRef(null)
  const CopytoClipBoard =()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  
  return (
   <div className={`w-full h-screen flex justify-center pt-20 ${isDark ? "bg-indigo-950" : "bg-amber-200"}`}>


      <div
      className={`w-[37rem] h-60 rounded-lg shadow-lg p-2
        ${isDark ? "bg-violet-950 text-white" : "bg-amber-500 text-black"}`} >
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-amber-100 transition-colors"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-white" />
            )}
          </button>

        <div className='flex justify-center text-white text-center  m-2 font-bold text-3xl'>Password Generator</div>
        <div className='w-full '>
          <input className={`bg-white h-10  w-120  border-2 rounded-tl-lg rounded-bl-lg ${isDark ? "text-violet-800" : "text-amber-600"}`}
          type="text" 
          value={password}
          placeholder='Password'
          readOnly
          ref={passwordRef} />
          <button className={`${isDark ? "bg-violet-800" : "bg-amber-600"} text-white  border-black  rounded-tr-lg  rounded-br-lg shadow-lg h-10 w-20 font-bold active:bg-amber-200 `}
          onClick={CopytoClipBoard}
          >Copy</button>
        </div>
        <div className='m-2 p-2 '>
          <input type="range" 
          min={6}
          max={50}
          value={length}
          className={`cursor-pointer ${isDark ? "accent-violet-200" : "accent-amber-600"}`} 
          onChange={(e) => setLength(Number(e.target.value))}
          
          />
          <label className='text-white  p-1 m-1'>Length: {length}</label>
          <input type="checkbox"
          id="numberallowed" 
          defaultChecked={numberAllowed}
          className={`cursor-pointer ${isDark ? "accent-violet-200" : "accent-amber-600"}`} 
          onChange={()=>{
            setNumberAllowed((prev) => !prev)
          }}
          />
          <label className='text-white p-1 m-1'>Numbers</label>
          <input type="checkbox"
          id="charallowed" 
          className={`cursor-pointer ${isDark ? "accent-violet-200" : "accent-amber-600"}`} 
          defaultChecked={charAllowed}
          onChange={()=>{
            setCharAllowed((prev) => !prev)
          }}
          />
          <label className='text-white p-1 m-1'>Characters</label>
        </div>


      </div>
    
    

    </div>
    
  )
}

export default App

