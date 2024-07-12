import AboutMainImage from "../Assets/Images/aboutMainImage.png"
import apj from "../Assets/Images/apj.png"
import billGates from "../Assets/Images/billGates.png"
import einstein from "../Assets/Images/einstein.png"
import nelsonMandela from "../Assets/Images/nelsonMandela.png"
import steveJobs from "../Assets/Images/steveJobs.png"
import HomeLayout from "../Layouts/HomeLayout"



function AboutUs() {


    return (

        <HomeLayout>
 
                <div className="pl-20 pt-20 flex flex-col text-white">

                <div className="flex items-center gap-5 mx-10">

                    <section className="w-1/2 space-y-10">

                            <h1 className="text-5xl text-yellow-500 font-semibold">
                                Afordable and quality education 
                            </h1>

                            <p className="text-xl text-gray-200">
                                Our gole is to provide the afordable and quality education to the world.
                                we are providing the platform for espiring teacher and student who share
                                their skills, creativity and knowledge to each other to empower and contrubute in the growth and wellness of mankind. 
                            </p>

                    </section>

                    <div className=" w-1/2">
                        <img
                        id="test1"
                        style={{
                            filter : "drop-shadow(0px 10px 10px rgb(0 ,0, 0))"
                        }}
                        className="drop-shadow-2xl" 
                        src={AboutMainImage} 
                        alt="AboutMainImage" />
                    </div>
                </div>


                <div className="carousel w-1/2 my-16 m-auto">
                    <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex items-center justify-center gap-4 px-[15%]">
                            <img src={billGates} className="w-40 rounded-full border-2 border-gray-400" />
                            <div>
                                <h3 className="text-2xl font-semibold">Bill Gates</h3>
                                <p>{"Don't compare yourself with anyone in this world. If you do so, you are insulting yourself. - Bill Gates"}</p>
                            </div>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide6" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>

                    <div id="slide2" className="carousel-item relative w-full">
                        <div className="flex items-center justify-center gap-4 px-[15%]">
                            <img src={steveJobs} className="w-40 rounded-full border-2 border-gray-400" />
                            <div>
                                <h3 className="text-2xl font-semibold">Steve Jobs</h3>
                                <p>{"Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs"}</p>
                            </div>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>

                    <div id="slide3" className="carousel-item relative w-full">
                        <div className="flex items-center justify-center gap-4 px-[15%]">
                            <img src={nelsonMandela} className="w-40 rounded-full border-2 border-gray-400" />
                            <div>
                                <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
                                <p>{"Education is the most powerful weapon which you can use to change the world. - Nelson Mandela"}</p>
                            </div>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>

                    <div id="slide4" className="carousel-item relative w-full">
                        <div className="flex items-center justify-center gap-4 px-[15%]">
                            <img src={einstein} className="w-40 rounded-full border-2 border-gray-400" />
                            <div>
                                <h3 className="text-2xl font-semibold">Albert Einstein</h3>
                                <p>{"Life is like riding a bicycle. To keep your balance you must keep moving. - Albert Einstein"}</p>
                            </div>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide3" className="btn btn-circle">❮</a>
                            <a href="#slide5" className="btn btn-circle">❯</a>
                        </div>
                    </div>

                    <div id="slide5" className="carousel-item relative w-full"> 
                        <div className="flex items-center justify-center gap-4 px-[15%]">
                            <img src={apj} className="w-40 rounded-full border-2 border-gray-400" />
                            <div>
                                <h3 className="text-2xl font-semibold">A. P. J. Abdul Kalam</h3>
                                <p>{"Dream, dream, dream. Dreams transform into thoughts and thoughts result in action. - A. P. J. Abdul Kalam"}</p>
                            </div>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>



            </div>
        </HomeLayout>
        
    )
    

}


export default AboutUs