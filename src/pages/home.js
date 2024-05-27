import React from 'react'
import { NavLink } from 'react-router-dom';


function Home() {
  return (
    <main>
        <section className="bg-gray-900 text-white py-20 px-6 md:px-8 lg:px-10 relative">
        <div className="container mx-auto grid grid-cols-1  gap-8 items-center text-center  relative z-10">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-yellow-400">Rent Medical Equipment with Ease</h1>
            <p className="text-md md:text-lg mb-8 md:px-44">
              Our rental service provides high-quality medical equipment for all your needs. Get the equipment you need,
              when you need it.
            </p>
            <NavLink to="/register" className="px-6 py-3 border rounded-xl hover:bg-gray-700 duration-500 ease-in-out" variant="primary">
              Rent Now
            </NavLink>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6 md:px-8 lg:px-10" id="services">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Equipment Rental</h3>
              <p className="text-gray-600">
                Rent high-quality medical equipment for your needs, from wheelchairs to hospital beds.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Delivery</h3>
              <p className="text-gray-600">
                We offer fast and reliable delivery to your location, ensuring your equipment is ready when you need it.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Maintenance</h3>
              <p className="text-gray-600">
                Our team of experts will maintain and service your rented equipment, keeping it in top condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-20 px-6 md:px-8 lg:px-10" id="how-it-works">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div>
                <h3 className="text-xl font-bold mb-2">Search</h3>
                <p className="text-gray-400">Browse our selection of medical equipment and find what you need.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div>
                <h3 className="text-xl font-bold mb-2">Order</h3>
                <p className="text-gray-400">Place your order and we'll handle the rest, from delivery to setup.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div>
                <h3 className="text-xl font-bold mb-2">Return</h3>
                <p className="text-gray-400">
                  When you're done, simply schedule a pickup and we'll take care of the rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home