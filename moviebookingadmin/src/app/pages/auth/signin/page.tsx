"use client";
import React, { useState } from "react";
import '../auth.css';
import { ToastContainer, toast } from "react-toastify";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + '/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        const data = await response.text();
        throw new Error(data || response.statusText);
      }

      const data = await response.json();
      // Handle successful signup, e.g., show a success message
      console.log('Admin login successful', data);

      toast.success('Admin login Successful', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      
        //position: toast.POSITION.TOP_CENTER,
      });
      window.location.href = '/pages/movie/createmovie';
      // Window.location.href = '/page/movie/createmovie';
    } catch (error) {

      console.error('Admin login failed', error);
      toast.error('Admin login Failed', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        onOpen: () => console.log("toast opened"),
        onClose: () => console.log("toast closed")
      
        //position: toast.POSITION.TOP_RIGHT,
        //position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <div className="formpage">
       
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handlelogin}>Sign in</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default SigninPage;



// position: "top-right",
// autoClose: false,
// hideProgressBar: true,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,




// position: "top-center",
// autoClose: 5000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// onOpen: () => console.log("toast opened"),
// onClose: () => console.log("toast closed")
