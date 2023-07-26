import { Button } from '@mui/material'
import React ,{useRef,useState}from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate =useNavigate()
  
  return (
    <div className='homeContainer'>
      <video autoPlay loop playsInline muted  style={{ width: '100%', height: "100vh", objectFit:"cover"}}>
        <source src={require("../video.mp4")} type="video/mp4"  />
      </video>
      <div className='homeButtons'>
        <h1 style={{color:"white"}}>Login/Register Page</h1>
        <div style={{width:"309.4px"}}>
        <button className='loginBtn' onClick={()=>navigate("/login")}>Login Page</button>
        <button className='loginBtn' onClick={()=>navigate("/register")}>Register Page</button>
        </div>
      </div>
    </div>
  )
}
