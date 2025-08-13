import { useState } from 'react'
import './App.css'
import ColorSection from './components/ColorSection'
import Header from './components/Header'
import ImgSection from './components/ImgSection'

function App() {
 



  const [pxColor, setPxColor] = useState("#FFFFFF")
  const [hex8, setHex8] = useState("#FFFFFF")
  const [RGBA, setRGBA] = useState("rgba(255, 255, 255, 1)")

  return(
    <>
      <Header />
      <main className='flex flex-col gap-[5vw] w-screen  h-[full] sm800:flex-row sm800:gap-0'>
        <ImgSection setPxColor={setPxColor} setHex8={setHex8} setRGBA={setRGBA} />
        <ColorSection pxColor={pxColor} hex8={hex8} RGBA={RGBA} />
      </main>
    </>
  )
  
}

export default App
