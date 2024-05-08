"use client"
import React from 'react'
import { BsShare } from 'react-icons/bs'
import { BsFillStarFill } from 'react-icons/bs';
import './MoviePage.css'
import Moviecarousel from '@/app/components/Navbar/moviecarousel/MovieCarousel';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import CelebCard from '@/app/components/Navbar/CelebCard/CelebCard';
import { usePathname,useParams } from 'next/navigation';
import Link from 'next/link';
import MovieCarousel from '@/app/components/Navbar/moviecarousel/MovieCarousel';


const Moviepage = () => {
    const pathname = usePathname()
    const { movieid } = useParams()
   
    const [movie, setMovie] = React.useState<any>(null)
    console.log(movieid)

    const getMovies = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies/${movieid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.ok){
                    console.log(data)
                    setMovie(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(()=>{
        getMovies();
    },[])

   

    // const movie = {
    //     wideposter:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/fighter-et00304730-1704191105.jpg",
    //     portraitposter:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/fighter-et00304730-1704191105.jpg",
    //     titile:"javan",
    //     rating:8.5,
    //     halls: [
    //         "2D",
    //         "3D",  
    //     ],
    //     language: [
    //         "Telugu",
    //         "Hindi",
    //         "English",
    //     ],
    //     duration: "2h 15m",
    //     type:"action/thriller",
    //     releasedat:"set 3,2023",
    //     cast:[ 
    //         {
    //             _id:"1",
    //             name: "RR",
    //             role: "Actor",
    //             imageUrl:"",
    //         },
    //         {
    //             _id:"1",
    //             name: "",
    //             role: "Actor",
    //             imageUrl:"",
    //         },
    //         {
    //             _id:"1",
    //             name: "",
    //             role: "Actor",
    //             imageUrl:"",
    //         },
    //         {
    //             _id:"1",
    //             name: "",
    //             role: "Actor",
    //             imageUrl:"",
    //         },
    //         {
    //             _id:"1",
    //             name: "",
    //             role: "Actor",
    //             imageUrl:"",
    //         },
    //         {
    //             _id:"1",
    //             name: "",
    //             role: "Actor",
    //             imageUrl:"",
    //         },
    //         {
    //             _id:"1",
    //             name: "",
    //             role: "Actor",
    //             imageUrl:"",
    //         },
    //         {
    //             _id:"1",
    //             name: "",
    //             role: "Actor",
    //             imageUrl:"",
    //         },
    //     ],
    //     crew:[
    //         {
    //             _id:"1",
    //             name: "",
    //             role: "Actor",
    //             imageUrl:"",
    //         },
    //         {
    //             _id:"1",
    //             name: "",
    //             role: "Actor",
    //             imageUrl:"",
    //         },
    //         {
    //             _id:"1",
    //             name: "",
    //             role: "Actor",
    //             imageUrl:"",
    //         },
    //     ],
    //     about:"Top IAF aviators come together in the face of imminent danger, to form Air Dragons. Fighter unfolds their camaraderie, brotherhood and battles, internal and external."
    // }
    return(
        <>  
        {
                movie &&
                <div className='moviepage'>
                    <div className='c1' style={{
                        backgroundImage: `url(${movie.landscapeImgUrl})`
                    }}>
                        <div className='c11'>
                            <div className='left'>
                                <div className='movie_poster'
                                    style={{
                                        backgroundImage: `url(${movie.portraitImgUrl})`
                                    }}
                                >
                                    <p>In cinemas</p>
                                </div>
                                <div className='movie_details'>
                                    <p className='title'>
                                        {movie.title}
                                    </p>
                                    <p className='rating'>
                                        <BsFillStarFill className='star' />&nbsp;&nbsp;
                                        {movie.rating}/10
                                    </p>
                                    {/* <div className='halls_languages'>
                                <p className='halls'>
                                    {
                                        movie.halls.map((hall, index) => {
                                            return (
                                                <span key={index}>{hall} </span>
                                            )
                                        })
                                    }
                                </p>
                                <p className='languages'>
                                    {movie.languages.map((language, index) => {
                                        return (
                                            <span key={index}>{language} </span>
                                        )
                                    })}
                                </p>
                            </div> */}
                                    <p className='duration_type_releasedat'>
                                        <span className='duration'>
                                            {movie.duration}
                                        </span>
                                        <span>•</span>
                                        <span className='type'>
                                            {movie.genre.join(', ')}
                                        </span>
                                        {/* <span>•</span>
                                <span className='releasedat'>
                                    {movie.releasedate}
                                </span> */}
                                    </p>
                                    <Link
                                        href={`${pathname}/buytickets`}
                                        className='linkstylenone'
                                    >
                                        <button className='bookbtn'>Book Tickets</button>
                                    </Link>

                                </div>
                            </div>
                            <div className='right'>

                                <button className='sharebtn'><BsShare className='shareicon' />Share</button>
                            </div>
                        </div>
                    </div>

                    <div className='c2'>
                        <h1>About the Movie</h1>
                        <p>{movie.description}</p>
                        {
                            movie.cast.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Cast</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        movie.cast.map((cast, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <CelebCard {...cast} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        }
                        {
                            movie.crew.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Crew</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        movie.crew.map((cast, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <CelebCard {...cast} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        }
                        <div className='line'></div>
                        <h1>Your might also like</h1>
                        <MovieCarousel />
                    </div>


            </div>

        }

        </>
            
    )
}


export default Moviepage



{/* <div className="moviepage">
<div className='c1'   style={{
            backgroundImage: `url(${movie.wideposter})`
        }}>
    <div className="c11">
        <div className="left">
            <div className='movie_poster'
                style={{
                    backgroundImage: `url(${movie.portraitposter})`
                }}
            >
                <p>In cinemas</p>
            </div>
            <div className='movie_details'>
                <p className='title'>
                    {movie.titile}
                </p>
                <p className='rating'>
                    <BsFillStarFill className='star' />&nbsp;&nbsp;
                    {movie.rating}/10
                </p>
                <div className='halls_languages'>
                    <p className='halls'>
                        {
                            movie.halls.map((hall, index) => {
                                return (
                                    <span key={index}>{hall} </span>
                                )
                            })
                        }
                    </p>
                    <p className='languages'>
                        {movie.language.map((language, index) => {
                            return (
                                <span key={index}>{language} </span>
                            )
                        })}
                    </p>
                </div>
                <p className='duration_type_releasedat'>
                    <span className='duration'>
                        {movie.duration}
                    </span>
                    <span>•</span>
                    <span className='type'>
                        {movie.type}
                    </span>
                    <span>•</span>
                    <span className='releasedat'>
                        {movie.releasedat}
                    </span>
                </p>
                <Link
                href={`${pathname}/buytickets`}
                className='linkstylenone'
                >
                    <button className='bookbtn'>Book Tickets</button>
                </Link>
                
            </div>
        </div>
        <div className="right">
        <button className='sharebtn'><BsShare className='shareicon' />Share</button>
        </div>
    </div>



</div>
<div className="c2">
    <h1>About the Movie</h1>
    <p>{movie.about}</p>
    <div className="line"></div>
    <h1>Cast</h1>
    <div className="circlecardslider">
        <Swiper
                        slidesPerView={1}
                        spaceBetween={1}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            '@0.00': {
                                slidesPerView: 1,
                                spaceBetween: 2,
                            },
                            '@0.75': {
                                slidesPerView: 2,
                                spaceBetween: 2,
                            },
                            '@1.00': {
                                slidesPerView: 3,
                                spaceBetween: 2,
                            },
                            '@1.50': {
                                slidesPerView: 6,
                                spaceBetween: 2,
                            },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                         {
                            movie.cast.map((cast, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <CelebCard title={''} ImageUrl={'https://in.bmscdn.com/iedb/artist/images/website/poster/large/hrithik-roshan-833-1705302956.jpg'} {...cast} />
                                    </SwiperSlide>
                                )
                            })
                        }
        </Swiper>
    </div>
    <div className="line"></div>
    <h1>Crew</h1>
    <div className="circlecardslider">
    <Swiper
                        slidesPerView={1}
                        spaceBetween={1}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            '@0.00': {
                                slidesPerView: 1,
                                spaceBetween: 2,
                            },
                            '@0.75': {
                                slidesPerView: 2,
                                spaceBetween: 2,
                            },
                            '@1.00': {
                                slidesPerView: 3,
                                spaceBetween: 2,
                            },
                            '@1.50': {
                                slidesPerView: 6,
                                spaceBetween: 2,
                            },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                         {
                            movie.crew.map((cast, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <CelebCard title={''} ImageUrl={'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/abbas-dalal-2032687-1702017919.jpg'} {...cast} />
                                    </SwiperSlide>
                                )
                            })
                        }
        </Swiper>
    </div>
    <div className="line"></div>
    <h1>Your might also like</h1>
    <Moviecarousel/>
</div> 
                    </div>*/}
