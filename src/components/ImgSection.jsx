import { useEffect, useRef, useState } from "react"
import ImgSectionDOM from "./ImgSectionDOM";

export default function ImgSection(){

  const canvasDivRef = useRef(null);
  const canvasRef = useRef(null);

  const [imgLoaded, setImgLoaded] = useState(false);

  const inputRef = useRef(null);

  const logoRef = useRef(null);
  const [imgLoading, setImgLoading] = useState(false)

  const imgUpload = (file)=>{
    
    const imgFile = file;
    if(!imgFile) {
      setImgLoaded(false)
      return
    }else{
      setImgLoading(true)
      
    }

    const img = new Image();
    img.onload = ()=>{
      const canvasDiv = canvasDivRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d");
      
      const canvasDivWidth = canvasDiv.clientWidth
      const canvasDivHeight = canvasDiv.clientHeight 
      const canvasDivAspect = canvasDivWidth / canvasDivHeight
      const imgAspect = img.width / img.height;

      if(imgAspect > canvasDivAspect){
        canvas.style.width = "100%";
        canvas.style.height = "auto"
        canvas.style.aspectRatio = `${imgAspect}`;
      }else{
        canvas.style.height = "100%"
        canvas.style.width = "auto"
        canvas.style.aspectRatio = `${imgAspect}`;
      }

      canvas.width = img.width
      canvas.height = img.height
      
      
      

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0);
      canvasDiv.style.border = 'none'

      setImgLoaded(true);
      setImgLoading(false)
    }

    img.src = URL.createObjectURL(imgFile);

  }

  const canvasDivclick = ()=>{
    if(inputRef.current && !imgLoaded) inputRef.current.click()
  };


  useEffect(() => {

    const pasteImg = (e) => {
      const clipboardItems = e.clipboardData.items;
      for (let item of clipboardItems) {
        const clipboardImg = item.type.startsWith("image/")

        if(clipboardImg){
          const clipboardImgFile = item.getAsFile()
          if(clipboardImgFile){
            imgUpload(clipboardImgFile)
          }
        }
        
      };
    }

    document.addEventListener("paste", pasteImg);

    return () => {
      document.removeEventListener("paste", pasteImg)
    }
  }, [])

  return(
    <ImgSectionDOM 
      imgLoaded={imgLoaded} 
      imgLoading={imgLoading} 
      canvasDivRef={canvasDivRef} 
      canvasRef={canvasRef} 
      logoRef={logoRef} 
      canvasDivclick={canvasDivclick} 
      imgUpload={imgUpload}
      inputRef={inputRef}
    />
  )
}