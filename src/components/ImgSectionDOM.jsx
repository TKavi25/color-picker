import logo from '../assets/logo.svg'

export default function ImgSectionDOM({
  imgLoaded,
  imgLoading,
  canvasDivRef,
  canvasRef,
  logoRef,
  canvasDivclick,
  inputRef,
  imgUpload,
  getColor,
  imageSectionRef,
  pasteMenuPosX,
  pasteMenuPosY,
  pasteMenuPosVisible,
  pasteMenuRef
}) {
  return(
    <section className=' 
      w-screen  mt-[min(1rem,3vw)] gap-[min(2rem,5vw)] centered-flex sm800:w-[60vw] sm800:justify-center sm800:p-[2rem] sm800:mt-0 flex-col  sm800:h-full 
    ' 
      ref={imageSectionRef}
    > 
      <div className={`bg-primary-blue absolute z-50 rounded-md text-[1.2rem] p-[0.2rem_0.8rem] text-primary-gray shadow-[0px_0.4rem__0.5rem_black] ${pasteMenuPosVisible ? "block" : "hidden"} cursor-pointer hover:bg-primary-blue-hover`} 
        style={{top: pasteMenuPosY + "px", left: pasteMenuPosX + "px"}}
        ref={pasteMenuRef}
      >Paste Image</div>
      <div className={`
        w-[90vw] h-[60vw]  border-dashed border-3 p-0 border-primary-blue sm500:w-[70%] sm500:h-[46.5vw] sm800:w-[72%] sm800:h-[28.8vw] centered-flex ${imgLoaded ? "cursor-default" : "cursor-pointer" } @container relative
      `}
      ref={canvasDivRef}
      onClick={canvasDivclick}
      >
        <img src={logo} className={`absolute z-10 animate-spin ${imgLoading ? "block" : "hidden"} w-[20%] `} ref={logoRef}/>
        <p className={`text-primary-blue text-[8cqw] text-center ${imgLoaded ? "hidden" : "block"} `}>Upload or paste(Ctr + V) image.</p>
        <canvas ref={canvasRef} className={` ${imgLoaded ? "cursor-crosshair block" : "hidden"} ${imgLoading && "hidden"} select-none touch-none `} 
          onClick={
            (e)=>getColor(e)
          }
        ></canvas>
      </div>
      <input type='file' accept='image/*' className='
        bg-primary-blue rounded-[5px] h-[2.5rem] cursor-pointer p-[0.5rem] text-white w-[min(15rem,90vw)] hover:bg-primary-blue-hover duration-100
      '
        onChange={(e) => imgUpload(e.target.files[0])}
        ref={inputRef}
      />
    </section>
  )
}