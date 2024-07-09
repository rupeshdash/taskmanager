import { Link } from "react-router-dom";
import { navItems } from "./constants";
import { useState } from "react";
import { MenuIcon, crossIcon } from "../../assets/Images";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="h-[10vh] sticky z-50 border-b-[.08rem] px-5 lg:px-36 bg-white">
      <div className="h-full flex justify-between items-center lg:text-lg text-base">
        <div>Logo</div>
        <ul className="hidden lg:flex space-x-8">
          {navItems.map((item, index) => (
            <li className="text-[#6B7280] font-medium hover:text-slate-950" key={index}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex gap-3">
          <button className="bg-white text-[#6B7280] px-5 py-2 border-[.15rem] rounded hover:text-black duration-200 font-semibold">
            <Link to={"/login"}>Sign in</Link>
          </button>
          <button className="bg-[#5051F9] text-white rounded px-5 py-3 hover:bg-[#7575ff] duration-200 font-semibold">
            <Link to={"/signup"}>Sign up free</Link>
          </button>
        </div>
        {/* Mobile Menu*/}
        <div className="w-full lg:hidden flex flex-col items-end gap-8 z-20">
          <button onClick={toggleMenu}>
            {menuOpen ? crossIcon() : MenuIcon()}
          </button>
          {menuOpen && (
            <div className="w-full fixed top-20 left-0 bg-white border-b-2 flex flex-col items-center transition-all duration-300 ease-in-out z-10">
              <ul className="flex flex-col items-center py-5 w-full">
                {navItems.map((item, index) => (
                  <li key={index} className="py-2 w-full text-center">
                    <a href={item.href} onClick={toggleMenu}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-center gap-3 py-5 w-full">
                <button className="bg-white text-[#6B7280] px-5 py-2 border-[.15rem] rounded w-2/4 hover:scale-105 duration-200 font-semibold">
                  <Link to={"/login"} onClick={toggleMenu}>Sign in</Link>
                </button>
                <button className="bg-[#5051F9] text-white rounded px-5 py-2 w-2/4 hover:scale-105 duration-200 font-semibold">
                  <Link to={"/signup"} onClick={toggleMenu}>Sign up free</Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
