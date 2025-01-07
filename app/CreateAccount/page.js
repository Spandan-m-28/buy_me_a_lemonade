import React from "react";

const page = () => {
  return (
    <div className="h-screen w-screen flex bg-white">
      <div className="w-[30vw] h-screen bg-white flex justify-center items-center">
        <img src="/lemonade_logo.svg" width={"400"} height={"400"} alt="tmkc" />
      </div>
      <div className="w-[70vw] h-screen rounded-l-[100px] bg-[#faf8f0] flex flex-col justify-center items-center">
        <div>
          <h2 className="text-3xl">Enter your details</h2>
        </div>
        <div className="flex justify-center items-center">
            <form action="" className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-lg">Name</label>
                    <input type="text" id="name" placeholder="Enter your name" className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-lg">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-lg">Username</label>
                    <input type="text" id="username" placeholder="Enter your username" className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="profilepic" className="text-lg">Profile pic</label>
                    <input type="text" id="profilepic" placeholder="Enter link for your profile pic" className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="coverpic" className="text-lg">Cover pic</label>
                    <input type="text" id="coverpic" placeholder="Enter link for your cover pic" className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="razorpayid" className="text-lg">Razorpay Id</label>
                    <input type="text" id="raxorpayid" placeholder="Enter Razorpay Id" className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"/>
                </div>  
                <div className="flex flex-col gap-2">
                    <label htmlFor="razorpaysecret" className="text-lg">Razorpay Secret</label>
                    <input type="text" id="razorpaysecret" placeholder="Enter Razorpay secret" className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"/>
                </div>
                <div  className="flex justify-center items-center mt-8">
                    <button type="submit" className="bg-[#ffdd00] w-[400px] h-12 rounded-full text-xl font-medium hover:scale-110 hover:ease-out duration-300">Save</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default page;
