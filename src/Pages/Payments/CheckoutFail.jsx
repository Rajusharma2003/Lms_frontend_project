// PaymentFailed.jsx
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';

function CheckoutFail ()  {
  return (

    <HomeLayout>
        <div className=" max-h-[90vh] flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-[0_0_10px_black] text-center">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto" />
        <h1 className="text-2xl font-semibold mt-4">Payment Failed</h1>
        <p className="text-gray-700 mt-2">There was an issue with your payment.</p>

        <Link to="/checkout" className="mt-6 inline-block">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
    </HomeLayout>
    
  );
}

export default CheckoutFail;
