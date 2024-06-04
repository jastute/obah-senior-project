  import React, { useState } from "react";
  import { toast, Toaster } from 'react-hot-toast';
  import { useNavigate } from "react-router-dom";
  import { NavLink } from 'react-router-dom'; 

export default function Register() {
  const [loading, setLoading]= useState(false)
        const [formData, setFormData] = useState({
          fullName: "",
          email: "",
          phone: "",
          organization: "",
          password: "",
          confirmPassword: "",
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        };
      
        const navigate = useNavigate();
        
       
  // sumbit data to backend
  const handleSubmit = async(e) => {
    e.preventDefault();
    // setLoading(true);
    toast.loading("Registering Comming Soon", {
      duration: 5000,
      position: "top-center",
    }
    )

    // if (formData.password !== formData.confirmPassword) {
    //   toast.error("Passwords do not match", {
    //     duration: 2000,
    //     position: "top-center",
    //   });
    //   setLoading(false);
    //   return;
    // }

    // try {
    //   const response = await fetch("https://medrent-server.vercel.app/api/auth/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })

    // if (response.status === 201) {
    //   toast.success("Register successful!", {
    //     duration: 2000,
    //     position: "top-center",
    //   });
    //   setTimeout(() => {
    //     navigate("/login");
    //   },2000)
    // } else if (response.status === 400) {
    //   toast.error("User already exists!", {
    //     duration: 2000,
    //     position: "top-center",
    //   });
    // }
    // else throw new Error("Register failed");
    // } catch (error) {
    //   toast.error(error.message, {
    //     duration: 2000,
    //     position: "top-center",
    //   });
    // }finally{
    //   setLoading(false);
    // }
  };

  return (
    <main className="min-h-[90vh] flex items-center bg-gray-50 px-2">
        <div className="w-full max-w-md mx-auto  p-6 bg-white rounded-lg shadow-md border-t-2 border-[#111827] my-6 ">
      <div className="mb-6 ">
        <h2 className="text-2xl font-semibold text-gray-800">Register</h2>
        <p className="text-gray-600">Create your account to get started.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
                required
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#111827] focus:border-[#111827] sm:text-sm"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              required
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#111827] focus:border-[#111827] sm:text-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            required
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#111827] focus:border-[#111827] sm:text-sm"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Hospital/Organization
          </label>
          <input
            required
            id="organization"
            name="organization"
            type="text"
            placeholder="Enter your hospital or organization"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#111827] focus:border-[#111827] sm:text-sm"
            value={formData.organization}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            required
            id="password"
            name="password"
            type="password"
            minLength={6}
            placeholder="Enter your password"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#111827] focus:border-[#111827] sm:text-sm"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            required
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            minLength={6}
            placeholder="Confrim your password"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#111827] focus:border-[#111827] sm:text-sm"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#111827] disabled:cursor-not-allowed text-white font-medium rounded-md hover:bg-[#1c2a3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111827]"
          >
            {loading ? <p className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"></p> : "Register"}
          </button>
          
        </div>
        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <NavLink to="/login" className="text-[#111827] hover:underline">
            Login
          </NavLink>
        </p>
      </form>
    </div>
    <Toaster />
    </main>
  );
}
