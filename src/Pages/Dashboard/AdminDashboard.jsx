import {ArcElement , BarElement,CategoryScale , Chart as ChartJS , Legend , LinearScale , Title ,Tooltip } from 'chart.js'
import { useEffect } from 'react';
import {Bar, Pie} from 'react-chartjs-2'
import { BsCollectionPlayFill, BsTrash2 } from 'react-icons/bs';
import {FaUsers} from 'react-icons/fa'
import {FcSalesPerformance} from 'react-icons/fc'
import {GiMoneyStack} from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourse } from '../../Redux/Slices/CourseSlice';
import { getPaymentRecord } from '../../Redux/Slices/RazorpaySlice';
import { getStatsData } from '../../Redux/Slices/StatSlice';


ChartJS.register(ArcElement , BarElement , CategoryScale, Legend , LinearScale , Title , Tooltip)

function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {allUserCount , subscribeCount} = useSelector( (state) => state.stat)
    const {allPayment  , monthlySalesRecord} = useSelector( (state) => state.razorpay)


    // let arrange the data in the charts. => This is the userData.
    const userData = {
        labels : ['Registered User' , "Enrolled User" ],
        fontColour : 'white',
        datasets : [{
              label : 'User Details',
              data  : [allUserCount , subscribeCount],
              backgroundColor : ['yellow' , 'green'],
              borderWidth : 1,
              borderColour : ['yellow' , 'green']
        }]
    }


    // This is our SalesData chart.
    const salesData = {
        labels : ['Jan' , 'Feb' , 'Mar' , 'Apr' , "May" , 'Jun' , 'Jul' , "Aug" , "Set" , 'Oct' , 'Nov' ,"Dec"],
        fontColour : 'white',
        datasets : [{
                label : 'Sales / Month',
                data : monthlySalesRecord,
                backgroundColor : ['rgb(255, 99, 132)'],
                borderColour : 'white',
                borderWidth : 2
        }]
    }


    const myCourses = useSelector((state) => state?.course?.courseData)


//   Fix  => there is not success message inside it there is the requeststatus
    async function onCourseDelete(id) {
        if (window.confirm('Are you sure you want to delete the course?')) {
            try {
                const res = await dispatch(deleteCourse(id));
                console.log("deleteCourse response:", res);
    
                if (res?.meta?.requestStatus === 'fulfilled') {
                    await dispatch(getAllCourse());
                    console.log('Courses fetched successfully');
                } else {
                    console.error('Failed to delete the course');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
    }
    
    


    useEffect( () => {
      (
        async() => {
            await dispatch(getAllCourse());
            await dispatch(getStatsData());
            await dispatch(getPaymentRecord());
        }
      )()
    } ,[])

    return (

        <HomeLayout>

            <div className=" min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                <h1 className=' text-center text-5xl font-semibold text-yellow-500'>
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                    {/* Thsi is the first part of the grid inside it there is the data of Subscribed and totaluser info */}
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className=' w-80 h-80'>
                            <Pie data={userData}/>                         
                        </div>

                        <div className=" grid grid-cols-2 gap-5">

                            {/* This is for the registered users */}
                            <div className=" flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold"> Registered Users</p>
                                    <h3 className="text-4xl font-bold">{allUserCount}</h3>
                                </div>
                                <FaUsers className="text-5xl text-yellow-500" />
                            </div>

                            {/* This is for the enrolled users */}
                            <div className=" flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold"> Subscribed Users</p>
                                    <h3 className="text-4xl font-bold">{subscribeCount}</h3>
                                </div>
                                <FaUsers className="text-5xl text-green-500" />
                            </div>
                        </div>
                    </div>

                    {/* This is the second part of this grid inside it there is the data of salesData  */}
                    <div className="flex flex-col items-center gap-5 p-5 shadow-lg rounded-md">
                        {/* This is the Bar graph data */}
                        <div className='h-80 w-full relative'>
                            <Bar className='absolute bottom-0 h-80 w-full' data={salesData}/>
                        </div>
                        
                        {/* this is the AllPayments data */}
                        <div className='grid grid-cols-2 gap-5'>
                        <div className=" flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold"> Subscription Count</p>
                                    <h3 className="text-4xl font-bold">{allPayment?.count}</h3>
                                </div>
                                <FcSalesPerformance className="text-5xl text-yellow-500" />
                            </div>

                            {/* This is the Total revenue data */}
                        <div className=" flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Total Revenue</p>
                                    <h3 className="text-4xl font-bold">{allPayment?.count * 499}</h3>
                                </div>
                                <GiMoneyStack className="text-5xl text-green-500" />
                            </div>
                        </div>
                    </div>
                </div>
                    {/* This is for the overview section */}
                      <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-center text-3xl font-semibold">
                                Courses Overview
                            </h1>
                            {/* This is for the button for the navigate(/course/create) */}
                            <button onClick={ () => {navigate('/course/create')}} className=" py-2 px-4 font-semibold text-lg cursor-pointer rounded w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Create New Course
                            </button>
                        </div>

                    {/* This is for the Table our course data */}
                    <table className='table overflow-x-scroll'>

                        <thead>
                            <tr>
                                <th>S No</th>
                                <th>Course Title</th>
                                <th>Course Category</th>
                                <th>Instrutor</th>
                                <th>TotalLectures</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myCourses.map((course , idx) => {
                                return (
                                    <tr key={course?._id}>
                                        {/* This is for the course index */}
                                        <td>{idx+1}</td>
                                        {/* This is for the course Title */}
                                        <td>
                                            <textarea readOnly value={course?.title} className='w-40 h-auto bg-transparent resize-none'></textarea>
                                        </td>
                                        {/* This is for the course category */}
                                        <td>{course?.category}</td>
                                        <td>{course?.createdBy}</td>
                                        <td>{course?.numberOfLectures}</td>
                                        <td className='max-w-28 overflow-hidden text-ellipsis whitespace-nowrap'>
                                            <textarea value={course?.description} readOnly className='w-80 h-auto bg-transparent resize-none'></textarea>
                                        </td>
                                        <td className=' flex items-center gap-4'>
                                            <button onClick={() => navigate('/course/displaylecture' , {state : {...course}})} 
                                            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                            >
                                            <BsCollectionPlayFill/>
                                            </button>
                                            <button onClick={() => onCourseDelete(course._id)} 
                                            className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                            >
                                            <BsTrash2/>
                                            </button>

                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>

                      </div>

            </div>

        </HomeLayout>
    )
}


export default AdminDashboard