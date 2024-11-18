"use client";
import React, {ReactNode, useState, useEffect, useRef} from 'react';
import { IoGameControllerOutline } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import Image from 'next/image';
import localFont from "next/font/local";
import Link from 'next/link';

import "../styles/globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gifUrl, setGifUrl] = useState("https://s11.gifyu.com/images/SyXSO.gif");
  const hasLoaded = useRef(false);
useEffect(() => {
  window.onload = () => {
  if(!hasLoaded.current) {
  const newGifUrl = `https://s11.gifyu.com/images/SyXSO.gif?cache_bust=${new Date().getTime()}`;
 
  setGifUrl(newGifUrl); 
  hasLoaded.current = true;
  }
}
  return () => {
    window.onload = null;
  }
}, []);
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Image  unoptimized src = {gifUrl}
        width = {500}
        height={300}
        className = "curtainGIF"
        alt = "gif"
        ></Image>
        
    <div className = 'headingSection'>
    <div className = "smallNavBar">
    <Link href="/">
    <IoHomeOutline size = {35}/>
    </Link>
    <Link href = "/Play">
        
        <IoGameControllerOutline size = {35}/>
        </Link>
        <Link href = "/About-Us">
        <RiTeamFill size = {35}/>
        </Link>

    </div>
    <div className = 'titleImage'>
      <Image src = "https://i.ibb.co/vxSS1JF/Untitled-3.png" 
              width = {500}
              height= {500}
              className = "Image"
              alt="DALL-E-2024-10-27-17-18-43-A-bright-carnival-themed-text-design-that-reads-THE-GREATEST-SHOWMAN-in-a"/>
      </div>
      <header className = 'header'>
        <div className = 'logo'>
        <Link href="/">
        <IoHomeOutline size = {60}/>
        <br></br>
        <h2>HOME</h2></Link>
        </div>
     
        <Link href = "/Play">
        <span className = "Icon">
        <IoGameControllerOutline size = {60}/>
        </span>
        <br></br>
        <h2>PLAY</h2>
      
        </Link>
        <Link href = "/About-Us">
        <RiTeamFill size = {60}/>
        <br></br>
        <h2>ABOUT US</h2>
        </Link>
      
      </header>
      </div>
      <main className = "mainContent">

        <div>
        <h2>test</h2>

        </div>
        {children}
      </main>
     
    
    </body>
    </html>
  );
}
