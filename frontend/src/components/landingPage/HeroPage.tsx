import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { FadeText } from "../magicui/fade-text";
import Particles from "../magicui/particles";
import { useState } from "react";
import BlurFade from "../magicui/blur-fade";

export const HeroPage = () => {
  const [color, setColor] = useState("#5051F9");
  return (
    <div className="relative h-screen w-full">
      <Navbar />
      <div className="h-[90vh] w-full mx-auto max-w-3xl py-20 px-5 text-center">
        <div className="flex flex-col h-full justify-center items-center gap-4">
          <h1 className="flex gap-2 text-2xl md:text-4xl lg:text-6xl font-bold mb-4">
            <FadeText
              className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"
              direction="up"
              framerProps={{ show: { transition: { delay: 0.5 } } }}
              text="Team"
            />
            <FadeText
              className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-[#5051F9] to-[#5051F9]/30 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent"
              direction="up"
              framerProps={{ show: { transition: { delay: 0.5 } } }}
              text="Tasks"
            />

            <FadeText
              className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"
              direction="up"
              framerProps={{ show: { transition: { delay: 0.5 } } }}
              text="Made Easy"
            />
          </h1>

          {/* <p className="text-base lg:text-xl mb-8 text-[#6B7280] font-medium">
            A simple tool for managing tasks and teams. Assign tasks, track
            progress, and get work done.
          </p> */}
          <FadeText
            className="text-base lg:text-xl mb-8 text-[#6B7280] font-medium"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.8 } },
            }}
            text="A simple tool for managing tasks and teams. Assign tasks, track
            progress, and get work done."
          />
          <BlurFade className="mt-4 z-10" delay={0.25} inView>
            <Link to="login">
              {" "}
              <button className="text-base lg:text-lg bg-[#5051F9] text-white px-6 py-3 rounded z-10  hover:scale-105 duration-200 font-bold">
                Get Started
              </button>
            </Link>
          </BlurFade>
        </div>
      </div>
      <Particles
        className="absolute inset-0"
        quantity={500}
        ease={80}
        color={color}
        staticity={30}
        refresh
      />
    </div>
  );
};
