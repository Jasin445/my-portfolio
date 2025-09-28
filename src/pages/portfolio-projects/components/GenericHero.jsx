import React from 'react'
import CarTransition from '../../../components/CarDrive'

const GenericHeroSection = ({title}) => {
  return (
     <section className="md:h-[50vh] bg-[url('/assets/images/project-background.jpg')] bg-cover bg-center">
          <div className="relative h-full">
            <div  className={"absolute inset-x-0 bottom-1 top-52 z-40 translate-y-[100%]"}>

            <CarTransition message={"Scroll to view some of my astonishing projects"}/>
            </div>
            <div className="absolute w-0 h-0 border-l-[140px] border-r-[140px] opacity-10 hover-glow blur-2xl inset-0 -translate-x-32 left-1/2 border-t-[260px] border-l-transparent border-r-transparent border-primary" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a363c]/65 via-card to-[#2a363c]/35" />
            <div className="absolute inset-0 overflow-hidden">
              <div className="hexagon top-10 left-10"></div>
              <div className="hexagon top-1/3 left-1/4"></div>
              <div className="hexagon top-1/2 right-20"></div>
              <div className="hexagon bottom-20 left-1/3"></div>
            </div>

            <div className="flex justify-center items-center h-full pt-28 px-6 bg-gradient-to-b from-[#131426]/15 via-[#0f1115] to-[#2a363c]/65">
              <div className="text-center mb-12 z-10 ">
                <h1 className="text-foreground text-4xl md:text-7xl lg:text-[48px] 3xl:text-[4vw] font-bold mb-8">
                  {title}
                </h1>
              </div>
            </div>
          </div>
          </section>
  )
}

export default GenericHeroSection