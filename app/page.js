"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { isSignedIn, userId } = useAuth();

  useEffect(() => {
    if (isSignedIn && userId) {
      fetch("/api/db/login", {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Failed to sync user with MongoDB");
          }
        })
        .catch((error) => {
          console.error("Error during API call:", error);
        });
    }
  }, [isSignedIn, userId]);

  return (
    <>
      <Navbar />
      <div>
        <div className="min-h-[70vh] flex flex-col justify-center items-center">
          <h1 className="lexend-deca-text text-5xl md:text-8xl font-medium flex flex-col justify-center items-center top">
            <span >Fund your </span>
            <span>creative work</span>
          </h1>
          <h3 className="mt-3 text-lg md:text-xl w-[80%] text-center">
            "Start your own landing page and and raise funds for free"
          </h3>
          <div className="flex flex-col justify-center items-center">
            <Link href="/CreateAccount">
              <button className="bg-[#ffdd00] rounded-full text-xl py-5 px-7 mt-10 font-medium hover:scale-110 hover:ease-out duration-300">
                Start your own Page
              </button>
            </Link>
            <p className="mt-4 text-lg">
              It's free and takes less than a minute!
            </p>
          </div>
        </div>
        <div className="w-full mx-auto">
          <div className="flex flex-col w-3/4 mt-7 rounded-3xl mx-auto">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-5xl md:text-6xl font-medium lexend-deca-text text-center">
                Designed for creators,
              </h2>
              <h2 className=" text-center text-5xl md:text-6xl font-medium lexend-deca-text text-gray-800 mt-2">
                not for businesses.
              </h2>
            </div>
            <div className="flex flex-wrap justify-center item-center mt-3 gap-5 mb-9">
              <div className="md:w-[35%] p-6 gap-8 bg-[#faf8f0] flex mt-5 mx-5 rounded-xl text-xl justify-center items-center hover:scale-105 cursor-pointer hover:ease-out duration-300">
                <span className=" hidden md:block font-bold">
                  <lord-icon
                    src="https://cdn.lordicon.com/hmzvkifi.json"
                    trigger="hover"
                    style={{ width: "60px", height: "60px" }}
                  ></lord-icon>
                </span>
                <p>
                  We don't call them "customers" or transactions. They are your
                  supporters.
                </p>
              </div>
              <div className="md:w-[35%] p-6 gap-8 bg-[#faf8f0] flex mt-5 mx-5 rounded-xl text-xl justify-center items-center hover:scale-105 cursor-pointer hover:ease-out duration-300">
                <span className="hidden md:block font-bold">
                  <lord-icon
                    src="https://cdn.lordicon.com/hmzvkifi.json"
                    trigger="hover"
                    style={{ width: "60px", height: "60px" }}
                  ></lord-icon>
                </span>
                <p>
                  You have 100% ownership of your supporters. We never email
                  them, and you can export the list any time you like.
                </p>
              </div>
              <div className="md:w-[35%] p-6 gap-8 bg-[#faf8f0] flex mt-5 mx-5 rounded-xl text-xl justify-center items-center hover:scale-105 cursor-pointer hover:ease-out duration-300">
                <span className="hidden md:block font-bold">
                  <lord-icon
                    src="https://cdn.lordicon.com/hmzvkifi.json"
                    trigger="hover"
                    style={{ width: "60px", height: "60px" }}
                  ></lord-icon>
                </span>
                <p>
                  You get to talk to a human for help, or if you just like some
                  advice to hit the ground running.
                </p>
              </div>
              <div className="md:w-[35%] p-6 gap-8 bg-[#faf8f0] flex mt-5 mx-5 rounded-xl text-xl justify-center items-center hover:scale-105 cursor-pointer hover:ease-out duration-300">
                <span className="hidden md:block font-bold">
                  <lord-icon
                    src="https://cdn.lordicon.com/hmzvkifi.json"
                    trigger="hover"
                    style={{ width: "60px", height: "60px" }}
                  ></lord-icon>
                </span>
                <p>
                  You get paid instantly to your bank account. No more 30-day
                  delays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
