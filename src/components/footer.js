// import React from 'react'

// function Footer() {
//   return (
//     <div>
//         <footer className="bg-gray-900 text-white py-10 px-6 md:px-8 lg:px-10" id="contact">
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-xl font-bold mb-4">Contact Us</h3>
//             <p className="text-gray-400 mb-2">
//               {/* <PhoneIcon className="h-5 w-5 inline-block mr-2" /> */}
//               +1 (555) 555-5555
//             </p>
//             <p className="text-gray-400 mb-2">
//               {/* <MailIcon className="h-5 w-5 inline-block mr-2" /> */}
//               info@medrent.com
//             </p>
//             <p className="text-gray-400 mb-2">
//               {/* <LocateIcon className="h-5 w-5 inline-block mr-2" /> */}
//               123 Main St, Anytown USA
//             </p>
//           </div>
//           <div className="md:col-span-2">
//             <h3 className="text-xl font-bold mb-4">Quick Links</h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <a className="hover:text-gray-400" href="#">
//                 Home
//               </a>
//               <a className="hover:text-gray-400" href="#">
//                 Services
//               </a>
//               <a className="hover:text-gray-400" href="#">
//                 Contact
//               </a>
//               <a className="hover:text-gray-400" href="#">
//                 About Us
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 text-center text-gray-400">© 2024 MedRent. All rights reserved.</div>
//       </footer>
//     </div>
//   )
// }

// export default Footer


import React from 'react'

function Footer() {
  return (
<footer className="bg-white  dark:bg-gray-900">
    <div className="w-full p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                {/* <img src="/images/KLESLogo.png" className="h-8" alt="KLES Logo" /> */}
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MedRent</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="/home" className="hover:underline me-4 md:me-6">Home</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Services</a>
                </li>
                <li>
                    <a href="/aboutus" className="hover:underline me-4 md:me-6">AboutUs</a>
                </li>
                <li>
                    <a href="/aboutus" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© MedRent 2024. All Rights Reserved.</span>
    </div>
</footer>
  )
}

export default Footer