import { useNavigate } from "react-router-dom";

import errorPage  from "../Assets/Images/errorPage.png"

const NotFound = () => {

    const navigator = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a2238] flex flex-col justify-center items-center">
      

      <img className="rounded-full" src={errorPage} alt="errorPage" />

      <button className="mt-5">
        <a
          className="relative inline-block text-sm font-semibold text-black group  active:text-orange-500 focus:outline-none focus:ring">

          <span onClick={() => navigator(-1)} className="relative block px-8 py-3 bg-gray-100 border border-current rounded-md">
            Go Home
          </span>
        </a>
      </button>
    </div>
  );
}

export default NotFound;
