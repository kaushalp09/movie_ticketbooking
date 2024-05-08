"use client"
import React from 'react'
import './Navbar.css'
import { BiUserCircle,BiSearch } from 'react-icons/bi'
import { RiArrowDropDownFill } from 'react-icons/ri'
import logo from '@/app/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillChrome, AiFillRead } from 'react-icons/ai'
import LocationPopup from '@/popups/location/LocationPopup'
import navbar from '@/app/components/Navbar/Navbar'



function Navbar() {
    const [showLocationPopup, setShowLocationPopup] = React.useState<boolean>(false)

    const [user, setUser] = React.useState<any>(null)
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false)

    const getuser = async () => {

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
                if(response.ok){
                    setUser(response.data)
                    setLoggedIn(true)
                }
                else{
                    setLoggedIn(false)
                   
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        getuser()
    }, [])

    const handleLogout = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`, {
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
                console.log(response)
                if (response.ok) {
                   
                }

            })
            .catch((error) => {
                console.log(error)
                

            })
    }

    return (
       <nav>
            <div className="left">
                <Image src={logo} alt="logo" width={100} height={100} 
                onClick={
                    ()=>window.location.href='/'
                }
                />
                <div className="searchbox">
                    <BiSearch className='searchbtn'/>
                    <input type="text" placeholder="search for a movie" />
                </div>
            </div>
            <div className="right">
                
            <p className='dropdown'
                    onClick={() => setShowLocationPopup(true)}
                >
                    {user ? user.city : "Select City"}
                     <RiArrowDropDownFill className="dropicon" /></p>
                {
                     loggedIn ?
                     <button className='theme_btn1 linkstylenone' onClick={handleLogout}>Logout</button>
                     :
                        <Link href="/auth/signin" className='theme_btn1 linkstylenone'>
                            Login
                        </Link>
                }
                <Link href="/profile" className='linkstylenone'>
                        <BiUserCircle className='theme_icon1' />
                </Link>
                
            </div>
            {
                showLocationPopup &&
                <LocationPopup
                    setShowLocationPopup={setShowLocationPopup}
                />
            }
        
        </nav>
      
    )
}

export default Navbar;




// <p className='dropdown'
//                 onClick={()=> setShowLocationPopup(true)}

                
//                 >SURAT<RiArrowDropDownFill className="dropicon" /></p>