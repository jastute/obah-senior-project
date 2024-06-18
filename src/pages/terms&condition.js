import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen p-2 md:p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p className="mb-4">Welcome to our medical equipment site. Please read these terms and conditions carefully before using our services.</p>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">1. Use of Equipment</h2>
            <p className="mt-2">
              The equipment rented from us is to be used solely for medical purposes and should be handled with care. Any misuse or damage caused by negligence will be the responsibility of the renter.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">2. Rental Period</h2>
            <p className="mt-2">
              The rental period begins on the date the equipment is delivered and ends on the agreed return date. Extensions of the rental period must be requested and approved in advance.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">3. Maintenance and Repairs</h2>
            <p className="mt-2">
              Regular maintenance and minor repairs are included in the rental agreement. However, any significant damage caused by improper use will incur additional charges.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">4. Payment Terms</h2>
            <p className="mt-2">
              Payment for the rental must be made in advance. Failure to make timely payments may result in the termination of the rental agreement and the retrieval of the equipment.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">5. Liability</h2>
            <p className="mt-2">
              We are not liable for any injuries or damages resulting from the use of the rented equipment. The renter assumes all responsibility for the proper use and maintenance of the equipment.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
          <p className="mt-2">
            By using our services, you agree to abide by these terms and conditions. We reserve the right to modify these terms at any time, and it is your responsibility to review them regularly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
