import axios from "../utils/axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const tests = [
  {
    id: 1,
    title: "Mathematics Mock Test",
    duration: "30 mins",
    questions: 25,
    level: "Medium",
  },
  
];

const Home = () => {
  let navigate=useNavigate()
  let submitHandler=async()=>{

    try {
      // let {data}=await axios.get("/user/currentUser")
      // if(data.user.payment == true){
      //   navigate("/test")
      // }else{
      //   navigate("/signup")
      // }

      navigate("/signup")
    } catch (error) {
      console.log(error)
      navigate("/signup")
    }
  }
  return (
    <div className="min-h-screen w-full bg-gray-100 p-6   ">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Online Test Platform
        </h1>
        <p className="text-gray-600 mt-2">
          Select a test below and start practicing!
        </p>
      </header>

      {/* Test Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {test.title}
            </h2>
            <p className="text-gray-600 mb-1">Duration: {test.duration}</p>
            <p className="text-gray-600 mb-1">
              Questions: {test.questions}
            </p>
            <p className="text-gray-600 mb-4">Level: {test.level}</p>
            <button onClick={submitHandler} className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition">
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
