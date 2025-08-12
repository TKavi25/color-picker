export default function ImgSectionDOM({
  imgLoaded,
  imgLoading,
  canvasDivRef,
  canvasRef,
  logoRef,
  canvasDivclick,
  inputRef,
  imgUpload
}) {
  return(
    <section className=' 
      w-screen p-[min(1rem,3vw)] flex items-center sm800:w-[60vw] sm800:justify-center bg-amber-900 sm800:p-[2rem]  flex-col gap-[min(2rem,5vw)] sm800:h-full 
    ' > 
      <div className={`
        w-[95%] aspect-[1.5]  border-dashed border-3 border-blue-500 rounded-2xl sm500:w-[70%] sm800:w-[90%] centered-flex ${imgLoaded ? "cursor-default" : "cursor-pointer" } @container relative
      `}
      ref={canvasDivRef}
      onClick={canvasDivclick}
      >
        <img src="src/assets/logo.svg" className={`absolute z-10 animate-spin ${imgLoading ? "block" : "hidden"} w-[20%] `} ref={logoRef}/>
        <p className={`text-blue-500 text-[8cqw] text-center ${imgLoaded ? "hidden" : "block"} `}>Upload or paste(Ctr + V) image.</p>
        <canvas ref={canvasRef} className={`${imgLoaded ? "cursor-crosshair block" : "hidden"} ${imgLoading && "hidden"}`} ></canvas>
      </div>
      <input type='file' accept='image/*' className='
        bg-blue-700 rounded-[5px] h-[2.5rem] cursor-pointer p-[0.5rem] text-white w-[min(15rem,90vw)] hover:bg-blue-600 duration-100
      '
        onChange={(e) => imgUpload(e.target.files[0])}
        ref={inputRef}
      />
    </section>
  )
}