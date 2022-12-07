import React from "react";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="flex justify-center gap-20 my-5 py-5 mx-20 font-semibold text-lg">
      <div className="text-red-900">
        <button onClick={() => router.push("/")}>Home</button>
      </div>
      <div className="text-blue-900 underline md:underline-offset-4">
        <button onClick={() => router.push("/blogList")}>Blog</button>
      </div>
    </nav>
  );
};

export default Nav;
