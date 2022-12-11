import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "../assets/logo.svg";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-50 flex justify-between gap-20 py-5 px-20 font-semibold text-sm bg-white shadow-sm">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <Logo />
      </div>
      <div className="flex gap-10 items-center text-[#2A3039]">
        <div>
          <button className="hover:text-blue-700" onClick={() => router.push("/")}>
            Project
          </button>
        </div>
        <div>
          <button className="hover:text-blue-700" onClick={() => router.push("/")}>
            Use Cases
          </button>
        </div>
        <div>
          <button className="hover:text-blue-700" onClick={() => router.push("/blogList")}>
            Blog
          </button>
        </div>
        <div>
          <button className="hover:text-blue-700" onClick={() => router.push("/blogList")}>
            Resources
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
