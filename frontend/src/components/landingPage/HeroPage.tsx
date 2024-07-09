import { Navbar } from "./Navbar"


export const HeroPage = () => {
  return (
    <div className="h-screen w-full">
      <Navbar/>
      <div className="h-[90vh] w-full mx-auto max-w-3xl py-20 px-5 text-center">
        <div className="flex flex-col h-full justify-center items-center gap-3">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4">Team <span className="text-[#5051F9]">Tasks</span> Made Easy</h1>
        <p className="text-base lg:text-xl mb-8 text-[#6B7280] font-medium">A simple tool for managing tasks and teams. Assign tasks, track progress, and get work done.</p>
        <button className="text-base lg:text-lg bg-[#5051F9] text-white px-6 py-3 rounded lg:w-2/5 hover:scale-105 duration-200 font-bold">Get Started</button>
        </div>
        </div>
    </div>
  )
}

