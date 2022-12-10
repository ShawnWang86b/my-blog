import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-50 flex justify-around gap-20 py-5 font-semibold text-sm bg-white shadow-sm">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <Image src="/Group 1.png" alt="shawn's blog logo" width={150} height={150} />
      </div>
      <div className="flex gap-10 items-center">
        <div className="text-[#2A3039]  hover:text-blue-700">
          <button onClick={() => router.push("/")}>Platform</button>
        </div>
        <div className="text-[#2A3039]  hover:text-blue-700">
          <button onClick={() => router.push("/")}>Use Cases</button>
        </div>
        <div className="text-[#2A3039]  hover:text-blue-700">
          <button onClick={() => router.push("/blogList")}>Blog</button>
        </div>
        <div className="text-[#2A3039]  hover:text-blue-700">
          <button onClick={() => router.push("/blogList")}>Partners</button>
        </div>
        <div className="text-[#2A3039]  hover:text-blue-700">
          <button onClick={() => router.push("/")}>Pricing</button>
        </div>
        <button className="border-[1px] border-blue-500 rounded-full px-8 py-2 hover:bg-blue-700 hover:text-white hover:border-blue-700 hover:-translate-y-1 transition duration-500">
          Get in touch
        </button>
      </div>
    </nav>
  );
};

export default Nav;
