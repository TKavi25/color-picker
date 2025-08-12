export default function ColorSection({pxColor, hex8, RGBA}){
    return(
        <section className='
          w-screen bg-amber-400 py-[min(2rem,8vw)] flex items-center sm800:justify-center flex-col  sm800:w-[40vw] text-[min(10cqw,2rem)]
        '>
          <div className='
            w-[80%] sm500:w-[60%] aspect-square sm800:w-[75%] rounded-2xl overflow-hidden centered-flex flex-col gap-[min(5cqw,1rem)] @container
          '
            style={{backgroundColor: pxColor}}
          >
            <div className='bg-red-500'>{hex8}</div>
            <div className='bg-red-700'>{RGBA}</div> 
          </div>
        </section>
    )
}