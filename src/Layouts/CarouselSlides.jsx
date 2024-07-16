function CarouselSlides({ title, description, totalSlide, slideNumber, image }) {
    return (
        <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
            <div className="flex items-center justify-center gap-4 px-[15%]">
                <img src={image} className="w-40 rounded-full border-2 border-gray-400" alt={`${title} image`} />
                <div>
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${(slideNumber === 1 ? totalSlide : (slideNumber - 1))}`} className="btn btn-circle">❮</a>
                <a href={`#slide${(slideNumber % totalSlide) + 1}`} className="btn btn-circle">❯</a>
            </div>
        </div>
    );
}

export default CarouselSlides;
