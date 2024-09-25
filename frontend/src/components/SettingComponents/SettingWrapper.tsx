import { useState } from "react";
import Particles from "../magicui/particles";
import Header from "../designConstants/Header";
import Navigation from "../designConstants/Navigation";

const SettingWrapper = () => {
     const [color, setColor] = useState("#5051F9");
  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="inner-wrapper pt-0">
        {" "}
        <Header />
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Coming Soon...
          </span>
          <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            color={color}
            refresh
          />
        </div>
      </div>
    </div>
  );
}

export default SettingWrapper