import React from "react";
import Navbar from "./Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="w-3/4 mx-auto mb-8">
        <h1 className="mt-4 text-3xl font-medium">About Get Me a Lemonade</h1>
        <div className="text-xl">
          <p className="mt-3">
            Get Me a Lemonade is a crowdfunding platform designed for creators
            to fund their projects/contents with the support of their fans.
            It&apos;s a space where your fans can directly contribute to your
            creative endeavors by buying you a lemonade. Unlock the potential of
            your fanbase and bring your projects/content to life.
          </p>
        </div>
        <div className="mt-9">
          <h2 className="text-2xl font-medium mb-4">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-center mb-6 gap-3">
              <lottie-player
                src="https://lottie.host/d66a7a1e-5d02-41d3-a082-127f7c8dd1b0/WHyWnv9iEM.json"
                background="##FFFFFF"
                speed="1"
                style={{ width: "60px", height: "60px" }}
                loop
                autoplay
                direction="1"
                mode="normal"></lottie-player>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Fans Want to Collaborate
                </h3>
                <p className="text-lg">
                  Your fans are enthusiastic about collaborating with you on
                  your projects.
                </p>
              </div>
            </div>
            <div className="flex items-center mb-6 gap-3">
              <lottie-player
                src="https://lottie.host/ddaa195d-77e3-44f1-9736-e1228d8e734a/GZzm8x0j4N.json"
                background="##FFFFFF"
                speed="1"
                style={{ width: "90px", height: "90px" }}
                loop
                autoplay
                direction="1"
                mode="normal"></lottie-player>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Support Through Lemonade
                </h3>
                <p className="text-lg">
                  Receive support from your fans in the form of lemonade
                  purchases, directly contributing to your project funding.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 justify-center items-center mt-14">
          <div className="w-[37%] bg-[#faf8f0] rounded-xl py-4 px-6 hover:scale-105 duration-700 ease-out ">
            <h2 className="text-2xl font-semibold mb-4">
              Benefits for Creators
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                Direct financial support from your fanbase
              </li>
              <li className="mb-2">
                Engage with your fans on a more personal level
              </li>
              <li className="mb-2">
                Access to a platform tailored for creative projects
              </li>
              {/* Add more benefits */}
            </ul>
          </div>

          <div className="w-[37%] bg-[#faf8f0] rounded-xl py-4 px-6 hover:scale-105 duration-300 ease-out">
            <h2 className="text-2xl font-semibold mb-4">Benefits for Fans</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                Directly contribute to the success of your favorite creators
              </li>
              <li className="mb-2">
                Exclusive rewards and perks for supporting creators
              </li>
              <li className="mb-2">
                Be part of the creative process and connect with creators
              </li>
              {/* Add more benefits */}
            </ul>
          </div>

          <div className="w-[37%] bg-[#faf8f0] rounded-xl py-4 px-6 hover:scale-105 duration-300 ease-out">
            {/* Additional sections */}
            <h2 className="text-2xl font-semibold mb-4">
              Benefits of Collaboration
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                Unlock new opportunities through collaboration with fellow
                creators
              </li>
              <li className="mb-2">
                Expand your network and reach a wider audience
              </li>
              <li className="mb-2">
                Combine skills and resources to create innovative projects
              </li>
              {/* Add more benefits */}
            </ul>
          </div>

          <div className="w-[37%] bg-[#faf8f0] rounded-xl py-4 px-6 hover:scale-105 duration-300 ease-out">
            <h2 className="text-2xl font-semibold mb-4">
              Community Engagement
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                Interact with a supportive community of like-minded individuals
              </li>
              <li className="mb-2">
                Receive valuable feedback and encouragement from peers
              </li>
              <li className="mb-2">
                Participate in discussions and events centered around your
                interests
              </li>
              {/* Add more benefits */}
            </ul>
          </div>

          <div className="w-[37%] bg-[#faf8f0] rounded-xl py-4 px-6 hover:scale-105 duration-300 ease-out">
            <h2 className="text-2xl font-semibold mb-4">Access to Resources</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                Gain access to resources such as tutorials, templates, and tools
              </li>
              <li className="mb-2">
                Receive guidance and mentorship from experienced creators
              </li>
              <li className="mb-2">
                Stay updated on industry trends and best practices
              </li>
              {/* Add more benefits */}
            </ul>
          </div>

          <div className="w-[37%] bg-[#faf8f0] rounded-xl py-4 px-6 hover:scale-105 duration-300 ease-out">
            <h2 className="text-2xl font-semibold mb-4">
              Recognition and Exposure
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                Showcase your work to a global audience and gain recognition
              </li>
              <li className="mb-2">
                Feature in promotional materials and campaigns
              </li>
              <li className="mb-2">
                Build your portfolio and increase your credibility as a creator
              </li>
              {/* Add more benefits */}
            </ul>
          </div>

          <div className="w-[37%] bg-[#faf8f0] rounded-xl py-4 px-6 hover:scale-105 duration-300 ease-out">
            <h2 className="text-2xl font-semibold mb-4">
              Supportive Community
            </h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                Join a community that values creativity, diversity, and
                inclusivity
              </li>
              <li className="mb-2">
                Find encouragement and inspiration from fellow members
              </li>
              <li className="mb-2">
                Collaborate on projects and share resources for mutual growth
              </li>
              {/* Add more benefits */}
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
