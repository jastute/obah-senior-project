import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";



export default function Contacts() {
    

  return (
    <>
      <main className="mx-auto py-12 md:py-24 lg:py-32 px-5 md:px-10 min-h-screen">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold  sm:text-4xl md:text-5xl">Get in Touch</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <FaPhone className="h-6 w-6 text-gray-500 " />
                <div>
                  <div className="font-medium">Phone</div>
                  <a className="text-gray-500 hover:underline " href="#">
                    +254 721-349-587
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IoMdMail className="h-6 w-6 text-gray-500 " />
                <div>
                  <div className="font-medium">Email</div>
                  <a className="text-gray-500 hover:underline " href="#">
                    obaahketer@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="h-6 w-6 text-gray-500 " />
                <div>
                  <div className="font-medium">Business Hours</div>
                  <p className="text-gray-500 ">Monday - Friday, 9am - 5pm EST</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Us</h2>
            <div className="mt-6 space-y-4">
            <p className="text-gray-500">Welcome to our Medical Equipment Delivery and Rental System. We are dedicated to bridging the gap in healthcare by providing accessible, high-quality medical equipment to hospitals and healthcare providers. </p>
            <h2 className="font-bold">Mission</h2>
            <p className="text-gray-500">Our mission is to ensure that every patient receives the care they need, regardless of financial constraints. With a focus on reliability, efficiency, and exceptional customer service, we strive to support healthcare professionals in delivering optimal patient care</p>
            <p className="text-gray-500">Join us in our commitment to making healthcare more compassionate, accessible, and effective for everyone.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

