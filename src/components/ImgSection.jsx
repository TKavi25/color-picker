import { useEffect, useRef, useState } from "react"
import ImgSectionDOM from "./ImgSectionDOM";

export default function ImgSection({setPxColor, setHex8, setRGBA}){

  const canvasDivRef = useRef(null);
  const canvasRef = useRef(null);

  const [imgLoaded, setImgLoaded] = useState(false);

  const inputRef = useRef(null);

  const logoRef = useRef(null);
  const [imgLoading, setImgLoading] = useState(false)

  const [pointerDown, setPointerDown] = useState(false);

  const imageSectionRef = useRef(null)
  const [pasteMenuPos, setPasteMenuPos] = useState({x:0, y:0, visible:false});

  const pasteMenuRef = useRef(null);
  

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

  
  


  useEffect(()=>{
    const imageSection = imageSectionRef.current
    const pasteMenu = pasteMenuRef.current
    const pasteMenuWidth = pasteMenu.clientWidth
    const pasteMenuHeight = pasteMenu.clientHeight
    const handleRightClick = (e)=>{
      if((window.innerWidth - e.pageX) >= pasteMenuWidth && (window.innerHeight - e.pageY) >= pasteMenuHeight){
        e.preventDefault()
        setPasteMenuPos({x: e.pageX, y: e.pageY, visible: true})
      }else if((window.innerWidth - e.pageX) >= pasteMenuWidth && (window.innerHeight - e.pageY) < pasteMenuHeight){
        e.preventDefault()
        setPasteMenuPos({x: e.pageX, y: (e.pageY - pasteMenuHeight), visible: true})
      }else if((window.innerWidth - e.pageX) < pasteMenuWidth && (window.innerHeight - e.pageY) >= pasteMenuHeight){
        e.preventDefault();
        setPasteMenuPos({x: (e.pageX - pasteMenuWidth), y: e.pageY, visible: true});
      }else if((window.innerWidth - e.pageX) < pasteMenuWidth && (window.innerHeight - e.pageY) < pasteMenuHeight){
        e.preventDefault();
        setPasteMenuPos({x: (e.pageX - pasteMenuWidth), y: (e.pageY - pasteMenuHeight), visible: true});
      }
    }
    
    

    const handleClickPaste = async ()=>{
      try {
        const clipboardItems = await navigator.clipboard.read()
        for (const item of clipboardItems){
          for (const type of item.types){
            if(type.startsWith("image/")){
              const img = await item.getType(type)
              imgUpload(img)
            }
          }
        }
        
      } catch (error) {
        window.alert("Clipboard read failed", err)
      }finally {
        setPasteMenuPos(position => ({...position, visible: false}))
      }  
    }
    const closePasteMenu = ()=>{
      setPasteMenuPos(position => ({...position, visible: false}))
    }

    imageSection.addEventListener("contextmenu", handleRightClick)
    pasteMenu.addEventListener("click", handleClickPaste)
    document.addEventListener("click", closePasteMenu)
    


    return()=>{
      imageSection.removeEventListener("contextmenu", handleRightClick)
      pasteMenu.removeEventListener("click", handleClickPaste)
      document.removeEventListener("click", closePasteMenu)
      
    }
  }, [pasteMenuPos.visible])



  const getColor = (e) => {
    const canvas = canvasRef.current
    const displayedCanvas = canvas.getBoundingClientRect()
    const pointerX = e.clientX - displayedCanvas.left
    const pointerY = e.clientY - displayedCanvas.top
    const scaleX = canvas.width / displayedCanvas.width
    const scaleY = canvas.height / displayedCanvas.height

    const canvasPxX = pointerX * scaleX;
    const canvasPxY = pointerY * scaleY;

    const ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(canvasPxX, canvasPxY, 1, 1).data;

    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];
    const a = pixel[3]

    const RGBA = `rgba(${r}, ${g}, ${b}, ${(a/255).toFixed(2)})`;

    const toHex = (n) => n.toString(16).padStart(2, "0");
    const hex8 = `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`
    console.log(hex8)
    setPxColor(hex8);
    setHex8(hex8)
    setRGBA(RGBA)

  }

  useEffect(() => {
      const canvas = canvasRef.current
      const handlePointerDown = ()=>{setPointerDown(true)}
      const handlePointerUp = ()=>{setPointerDown(false)}
      const handlePointerMove = (e)=>{
        if(pointerDown) getColor(e);
      }

      canvas.addEventListener("pointerdown", handlePointerDown)
      canvas.addEventListener("pointermove", handlePointerMove)
      canvas.addEventListener("pointerup", handlePointerUp)

      return ()=>{
        canvas.removeEventListener("pointerdown", handlePointerDown)
        canvas.removeEventListener("pointermove", handlePointerMove)
        canvas.removeEventListener("pointerup", handlePointerUp)
      }
      
    }, [pointerDown, getColor])


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
      getColor={getColor}
      imageSectionRef={imageSectionRef}
      pasteMenuPosX={pasteMenuPos.x}
      pasteMenuPosY={pasteMenuPos.y}
      pasteMenuPosVisible={pasteMenuPos.visible}
      pasteMenuRef={pasteMenuRef}
    />
  )

}