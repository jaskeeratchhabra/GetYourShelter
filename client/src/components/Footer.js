import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className='flex justify-center text-xl mb-10'>
        <h1 >Reach out to us at <span className='font-semibold'>support@PgDekho.in</span></h1>
      </div>
      <div className="flex md:justify-between mx-auto">
        <div className="w-full md:w-1/3 mb-4 md:mb-0 ml-2">
          <h2 className="text-green-500 text-2xl font-extrabold mb-2">PgDekho.com</h2>
          <p className="text-sm">114, Dehradun, 248002</p>
          <p className="text-sm font-bold mt-4">Rooms for Students/Working professionals/Officers</p>
        </div>
        <div className="w-full md:w-2/3 flex justify-end mr-4">
          <ul className="text-sm mr-8">
            <li className="mb-2"><a href="/MyOrders" className="hover:text-gray-500">Track Booking</a></li>
            <li className="mb-2"><a href="/DeliveryPartnerForm" className="hover:text-gray-500">Add your room</a></li>
            <li className="mb-2"><a href="/ForBusiness" className="hover:text-gray-500">For Businesses</a></li>
            <li className="mb-2"><a href="/PrivacyPolicy" className="hover:text-gray-500">Privacy Policy</a></li>
            <li className="mb-2"><a href="/T&C" className="hover:text-gray-500">T&C</a></li>
          </ul>
          <ul className="text-sm">
            <li className="mb-2"><a href="/DisputeResolution" className="hover:text-gray-500">Dispute Resolution</a></li>
            <li className="mb-2"><a href="/cancellation" className="hover:text-gray-500">Cancellation policy and Charges</a></li>
            <li className="mb-2"><a href="/CommunityGuidlines" className="hover:text-gray-500">Community Guidelines</a></li>
            <li className="mb-2"><a href="/Pricing" className="hover:text-gray-500">Pricing</a></li>
            <li className="mb-2"><a href="/Support" className="hover:text-gray-500">Support</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
