// PaymentSuccessful.jsx
import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';
import { getUserData } from '../../Redux/Slices/AuthSlice';

function CheckoutSuccess () {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserData())
    },[])
  return (
    
    <HomeLayout>
         <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
        <h1 className="text-2xl font-semibold mt-4">Payment Successful</h1>
        <p className="text-gray-700 mt-2">Thank you for your payment!</p>

        <Link to="/" className="mt-6 inline-block">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
    </HomeLayout>
   
  );
}

export default CheckoutSuccess;
