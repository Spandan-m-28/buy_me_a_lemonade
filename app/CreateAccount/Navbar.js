import React from "react";
import Link from "next/link";

const Navbar = ({username}) => {
  return (
    <>
      <div className="flex justify-end h-20 bg-[#faf8f0] z-10">
        <Link href={`/${username}`}>
        <button className="bg-[#ffdd00] mr-10 flex items-center justify-center rounded-full text-xl py-3 px-7 mt-3 font-medium hover:scale-110 hover:ease-out duration-300">
          Dashboard&rarr;
        </button>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
