import React from "react";
import { useRouter } from "next/router";
import Logo from "../assets/logo.svg";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-50 font-semibold text-sm bg-white shadow-sm ">
      <div className="flex justify-between gap-60 py-5 m-auto max-w-5xl">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Logo />
        </div>
        <div className="flex gap-10 items-center text-[#2A3039]">
          <div>
            <button className="hover:text-blue-700" onClick={() => router.push("/blogList")}>
              Project proposal
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
