import React, { useState } from "react";
import {toast, Toaster} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';


export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate()


  // sumbit data to backend
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://medrent-server.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
if (response.status === 200) {
      toast.success("Login successful!", {
        duration: 2000,
        position: "top-center",
      });
    
      //  extract the user redentials from the response
    const data= await response.json();
    // store the data in session storage
    sessionStorage.setItem("user", JSON.stringify(data.user));
    
    if(data.user.role === "admin"){
      navigate("/admin")
    }
    else{
      navigate("/")
    }
      // // redirect to dashboard
      // setTimeout(() => {
      //   window.location.href = "/";
        
      // },1000)
    }else if (response.status === 401) throw new Error("Invalid credentials")
     else throw new Error("Login failed");
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
        position: "top-center",
      });
    }finally{
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[90vh] flex items-center bg-gray-50 px-2">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border-t-2 border-[#111827] ">
        <div className="mb-6 ">
          <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
          <p className="text-gray-600">Login to your account to get started.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#111827] focus:border-[#111827] sm:text-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#111827] focus:border-[#111827] sm:text-sm"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-[#111827] disabled:cursor-not-allowed text-white font-medium rounded-md hover:bg-[#1c2a3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111827]"
            >
              {loading ? <p className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"></p> : "Login"}
            </button>
          </div>
         
          <p>Don't have an account? <NavLink to="/register" className="text-blue-500">Register</NavLink></p>
        </form>
      </div>
      <Toaster/>
    </main>
  );
}
