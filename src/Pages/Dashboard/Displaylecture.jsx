
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseLecture, getCourseLecture } from "../../Redux/Slices/LectureSlice";

function Displaylecture() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state?.lectures);
    const role = useSelector((state) => state?.auth?.role);
    
    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        console.log(courseId, lectureId);
        await dispatch(deleteCourseLecture({ courseId: courseId, lectureId: lectureId }));
        await dispatch(getCourseLecture(courseId));
    }

    useEffect(() => {
        if (!state) navigate("/courses");
        dispatch(getCourseLecture(state._id));
    }, [state, navigate, dispatch]);

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] text-white mx-5">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name: {state?.title}
                </div>

                {(lectures && lectures.length > 0) ? (
                    <div className="flex justify-center w-full gap-10">
                        {/* Left section for playing videos and displaying course details to Admin */}
                        <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                            <video 
                                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"
                            >
                            </video>

                            <div>
                                <h1>
                                    <span className="text-yellow-500">Title: </span>
                                    {lectures && lectures[currentVideo]?.title}
                                </h1>

                                <p>
                                    <span className="text-yellow-500 line-clamp-4">
                                        Description: 
                                    </span>
                                    {lectures && lectures[currentVideo]?.description}
                                </p>
                            </div>
                        </div>

                        {/* Right section for listing all the lectures video */}
                        <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                                <p>Lectures List</p>

                                {role === "ADMIN" && (
                                    <button 
                                        onClick={() => navigate('/course/addlecture', { state: { ...state } })} 
                                        className="btn-primary px-2 py-1 font-semibold rounded-md text-sm"
                                    >
                                        Add New Lecture
                                    </button>
                                )}
                            </li>

                            {lectures &&
                                lectures.map((lecture, idx) => {
                                    return (
                                        <li className="space-y-2" key={lecture._id}>
                                            <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                                <span>
                                                    {" "} Lecture {idx + 1}: {" "}
                                                </span>
                                                {lecture?.title}
                                            </p>
                                            {role === "ADMIN" && (
                                                <button 
                                                    onClick={() => onLectureDelete(state?._id, lecture?._id)} 
                                                    className="btn-accent px-2 py-1 font-semibold rounded-md text-sm"
                                                >
                                                    Delete Lecture
                                                </button>
                                            )}
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                ) : (
                    role === "ADMIN" && (
                        <button 
                            onClick={() => navigate('/course/addlecture', { state: { ...state } })} 
                            className="btn-primary px-2 py-1 font-semibold rounded-md text-sm"
                        >
                            Add New Lecture
                        </button>
                    )
                )}
            </div>
        </HomeLayout>
    );
}

export default Displaylecture;
