import { useEffect, useState } from 'react'
import './App.css'
import ColorSection from './components/ColorSection'
import Header from './components/Header'
import ImgSection from './components/ImgSection'

function App() {
 

  const screenAspect = window.innerWidth / window.innerHeight;

  const [pxColor, setPxColor] = useState("#FFFFFF")
  const [hex8, setHex8] = useState("#FFFFFF")
  const [RGBA, setRGBA] = useState("rgba(255, 255, 255, 1)")

  return(
    <>
      <Header />
      <main className='flex flex-col h-[calc(100vh-(6.2*min(5vw,0.6rem)))] sm800:flex-row'>
        <ImgSection setPxColor={setPxColor} setHex8={setHex8} setRGBA={setRGBA} />
        <ColorSection pxColor={pxColor} hex8={hex8} RGBA={RGBA} />
      </main>
    </>
  )
  
}

export default App
