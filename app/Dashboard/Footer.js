import React from "react";

const Footer = () => {
  return (
    <div className="rounded-lg flex w-3/4 mx-auto justify-between px-6 mt-10 items-center">
      <div className="flex flex-col justify-center items-center gap-4 mx-auto">
        <div className="text-xl font-medium">Contact Us</div>
        <div className="flex justify-center items-center gap-10">
          <span className="cursor-pointer">
            <lord-icon
              src="https://cdn.lordicon.com/yizwahhw.json"
              trigger="hover"
              stroke="bold"
              style={{ width: "35px", height: "35px" }}></lord-icon>
          </span>
          <span className="cursor-pointer">
            <lord-icon
              src="https://cdn.lordicon.com/tgyvxauj.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#000000"
              style={{ width: "40px", height: "40px" }}></lord-icon>
          </span>
          <span className="cursor-pointer">
            <lord-icon
              src="https://cdn.lordicon.com/vpbspaec.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#000000"
              style={{ width: "50px", height: "50px" }}></lord-icon>
          </span>
          <span className="cursor-pointer">
            <lottie-player
              src="https://lottie.host/6c3337be-51f2-4230-9211-86f2f358b058/MOPSEjTG93.json"
              background="##FFFFFF"
              speed="1"
              style={{ width: "45px", height: "45px" }}
              hover
              autoplay
              direction="1"
              mode="normal"></lottie-player>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
