import AboutMainImage from "../Assets/Images/aboutMainImage.png"
import { celebrities } from "../Constant/CeleberitiesData"
import CarouselSlide from "../Layouts/CarouselSlides"
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
                {/* render caruouselSlide */}
                 {celebrities && celebrities.map( celebrity => (<CarouselSlide
                                                                     {...celebrity}
                                                                     key={celebrity.slideNumber}
                                                                     totalSlide={celebrities.length} 
                                                                     />))}
                  

                    
                </div>



            </div>
        </HomeLayout>
        
    )
    

}


export default AboutUs