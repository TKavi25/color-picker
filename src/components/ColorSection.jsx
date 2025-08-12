export default function ColorSection({pxColor, hex8, RGBA}){
    return(
        <section className='
          w-screen py-[min(2rem,8vw)] flex items-center sm800:justify-center flex-col  sm800:w-[40vw] text-primary-charcoal
        '>
          <div className='
            w-[80%] sm500:w-[60%] aspect-square sm800:w-[75%] rounded-2xl overflow-hidden centered-flex flex-col gap-[min(5cqw,1rem)] @container shadow-2xl
          '
            style={{backgroundColor: pxColor}}
          >
            <div className='bg-primary-gray p-[0.2em] text-[min(7cqw,2rem)]'>{hex8}</div>
            <div className='bg-primary-gray p-[0.2em] text-[min(7cqw,2rem)]'>{RGBA}</div> 
          </div>
        </section>
    )
}