import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

import { MovieCardType } from '@/app/types/types';
import MovieCard from './MovieCard';

const Moviecarousel=() =>{

    // const Movies:MovieCardType [] = [
    //     {
    //         title:"jawan",
    //         ImageUrl:"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC42LzEwICAxNDEuMUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00304730-anyygmypht-portrait.jpg",
    //         _id : "1",
    //         rating: 8.5,
    //         type : "action/thriller"
    //     },
    //     {
    //         title:"jawan",
    //         ImageUrl:"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS40LzEwICA0MjMuMUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00311673-bcmpxxhayj-portrait.jpg",
    //         _id : "2",
    //         rating: 8.5,
    //         type : "action/thriller"
    //     },
    //     {
    //         title:"jawan",
    //         ImageUrl:"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS8xMCAgNC4xSyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00377604-tgjmqsnhdy-portrait.jpg",
    //         _id : "3",
    //         rating: 8.5,
    //         type : "action/thriller"
    //     },
    //     {
    //         title:"jawan",
    //         ImageUrl:``,
    //         _id : "4",
    //         rating: 8.5,
    //         type : "action/thriller"
    //     },
    //     {
    //         title:"jawan",
    //         ImageUrl:"",
    //         _id : "5",
    //         rating: 8.5,
    //         type : "action/thriller"
    //     },
    //     {
    //         title:"jawan",
    //         ImageUrl:"",
    //         _id : "6",
    //         rating: 8.5,
    //         type : "action/thriller"
    //     }
    // ];

    const [movies, setMovies] = React.useState<MovieCardType[]>([])
    const [user, setUser] = React.useState<any>(null)
    const getMovies = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.ok){
                    //console.log(data)
                    setMovies(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getUser = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                //console.log(response)
                if(response.ok){
                    setUser(response.data)
                }
                else{
                    window.location.href = "/auth/signin"
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }

    React.useEffect(() => {
        getMovies()
        getUser()
    }, [])

    return(
        <div className="sliderout">
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
                    movies.map((movie) => {
                        return (
                            <SwiperSlide>
                                <MovieCard 
                                    movie={movie}
                                    user={user}
                                />
                            </SwiperSlide>

                        )
                    })
                }
            </Swiper>
        </div>
    )
}

export default Moviecarousel


