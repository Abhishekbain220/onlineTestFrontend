import axios from '../utils/axios'
import React, { useContext, useState } from 'react'
import { PaymentContext } from '../utils/PaymentContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  let navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false) // 🔹 loading state
  let { pay } = useContext(PaymentContext)

  let submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true) // start loading
      let user = { username, email, password }
      let signup = await axios.post("/user/signup", user)
      
      // Uncomment if you want conditional navigation
      // if(signup.data.message === "Login Successful"){
      //   navigate("/test")
      //   return
      // }
      
      await pay(499) // wait for payment
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false) // stop loading
    }
  }

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              name="username"
              placeholder="Enter Username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading} // disable button while loading
            className={`w-full py-2 rounded-lg font-semibold transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Processing..." : "Signup & Pay ₹499"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm sm:text-base text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signup
