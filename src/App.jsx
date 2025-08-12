import { useEffect, useState } from 'react'
import './App.css'
import ColorSection from './components/ColorSection'
import Header from './components/Header'
import ImgSection from './components/ImgSection'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const hideSpinner = () => setLoading(false);
    window.addEventListener("load", hideSpinner);


    return () => {
      window.removeEventListener("load", hideSpinner)
    }
  }, [])

  const screenAspect = window.innerWidth / window.innerHeight;

  return(
    <>
      <div className={`bg-[#000000B3] fixed z-50 centered-flex w-screen h-screen ${loading ? "visible pointer-events-auto" : "invisible pointer-events-none"} `}>
        <img src="src/assets/logo.svg" alt="loading spinner" className={`animate-spin 
          ${
            screenAspect > 1 ? "w-[20vh] " : "w-[20vw] "
          }
         `}/>
      </div>
      <Header />
      <main className='flex flex-col h-[calc(100vh-4rem)] sm800:flex-row'>
        <ImgSection />
        <ColorSection />
      </main>
    </>
  )
  
}

export default App
