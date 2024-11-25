"use client";
import React, {ReactNode, useState, useEffect} from 'react';
import { IoGameControllerOutline } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import {Great_Vibes} from 'next/font/google';
import Image from 'next/image';
import localFont from "next/font/local";
import Link from 'next/link';

import "../styles/globals.css";
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight:'400',
  variable: '--font-greatVibes'
});
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

useEffect(() => {
  window.onload = () => {
  
  const newGifUrl = `https://s11.gifyu.com/images/SyXSO.gif?cache_bust=${new Date().getTime()}_${Math.random()}`;
 
  setGifUrl(newGifUrl); 
  
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
        priority
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
    
    <div className ={ `titleImage ${greatVibes.variable}`}>
      
      
      {/* <Image src = "https://i.ibb.co/vxSS1JF/Untitled-3.png" 
              width = {500}
              height= {500}
              style = {{zIndex:3}}
              alt="DALL-E-2024-10-27-17-18-43-A-bright-carnival-themed-text-design-that-reads-THE-GREATEST-SHOWMAN-in-a"/> */}

      <p>The Greatest Showman</p>
      
      </div>
      <header className = {`header ${greatVibes.variable}`}>
      
        <div className = 'logo'>
        <Link href="/">
        <IoHomeOutline size = {60}/>
        <br></br>
        <h2>Home</h2></Link>
        </div>
     <div>
        <Link href = "/Play">
        <span className = "Icon">
        <IoGameControllerOutline size = {60}/>
        </span>
        <br></br>
        <h2>Secret<br></br>Challenge</h2>
      
        </Link>
        </div>
        <div>
        <Link href = "/About-Us">
        <RiTeamFill size = {60}/>
        <br></br>
        <h2>About Us</h2>
        </Link>
        </div>
      </header>
      </div>
      <main className = "mainContent">

       
        {children}
      </main>
  
        <footer style = {{borderStyle:'none', backgroundColor:'peachpuff',padding:15, color:'black',display:'flex', alignItems:'left', justifyContent:'center', flexDirection:'column'}}>
          
         <h3 style = {{marginBottom:15}}>All credits go to Spotify, Genius and respective artists for all songs and lyrics used in this website</h3>
          
         <h3>Links to materials used:</h3>
         <ul className = 'footerList' style = {{margin:8, textDecoration:'underline',display:'flex',flexDirection:'row', flexWrap:'wrap',listStyle:'none'}}>
          <li><a href = 'https://open.spotify.com/track/5HCyWlXZPP0y6Gqq8TgA20?si=gdFNKh4WQGS3ME346M35cA'>STAY</a></li>
          <li><a href = 'https://open.spotify.com/track/1oOeNxRRihuDAkJohJSsOQ?si=cAf0iHVvTK2od7Zv_oMOxg'>STAY -Instrumental</a></li>
          <li><a href = 'https://open.spotify.com/track/6mQLN3zRtAp6ovjusyYKrV?si=8hqQgo5wQR-KZwaajuQm8Q'>Rewrite The Stars</a></li>
          <li><a href = 'https://open.spotify.com/track/1HaEK966dKgZOLxA6Bphpu?si=BJmlrWCSSJyk9LBPQcnv5A'>Rewrite The Stars -Instrumental</a></li>
          <li><a href  = 'https://open.spotify.com/track/3RiPr603aXAoi4GHyXx0uy?si=wVLQYdD8QS67GEIyD2X5Ew'>Hymn for the Weekend</a></li>
          <li><a href = 'https://open.spotify.com/track/5GeVnOW1GEneFnHGxEhqku?si=QR6IccEvQQWq2758S4rTwQ'>Hymn for the Weekend -Instrumental</a></li>
          <li><a href = 'https://open.spotify.com/track/3qhlB30KknSejmIvZZLjOD?si=gBrZtxJ_RMashPi1A4pyPg'>End of Beginning</a></li>
          <li><a href = 'https://open.spotify.com/track/02KipAjgBmDGe7V9pWNeFt?si=XtceRbYYQCWJN9AIMShvjw'>End of Beginning -Instrumental</a></li>
          <li><a href = 'https://open.spotify.com/track/61dCUoMCg28qEBzrW6htYM?si=iRCNlqZ1SUaStIwhSVAKfw'>Rather Be</a></li>
          <li><a href = 'https://open.spotify.com/track/677n1KtrVvILUOsq0ULF3J?si=pDLVOUHvRviy7PW9N0IiAA'>Rather Be -Instrumental</a></li>
          <li><a href = 'https://open.spotify.com/track/3e7sxremeOE3wTySiOhGiP?si=dhltxo-IRfGN810m4OuKrQ'>Dusk Till Dawn</a></li>
          <li><a href = 'https://open.spotify.com/track/5jojHL7JCX2eqar1f1LUFK?si=0xXbd77ARN-I_ijD1_228g'>Dusk Till Dawn -Instrumental</a></li>
          <li><a href = 'https://open.spotify.com/track/5vNRhkKd0yEAg8suGBpjeY?si=w-I9PULeTq6-rajLRaSxvQ'>APT.</a></li>
          <li><a href = 'https://open.spotify.com/track/6LLHpfUuR5vfGLHH2bcGyc?si=qWPB2oOpR4afsoky9Dp7ag'>APT. -Instrumental</a></li>
          <li><a href = 'https://open.spotify.com/track/1BxfuPKGuaTgP7aM0Bbdwr?si=5Io8KjTOQ5KOULBfZtEkng'>Cruel Summer</a></li>
          <li><a href = 'https://open.spotify.com/track/1BxfuPKGuaTgP7aM0Bbdwr?si=5Io8KjTOQ5KOULBfZtEkng'>Counting Stars</a></li>
          <li><a href = 'https://open.spotify.com/track/3P3pw6C19j31Rnzgo3JG7o?si=aIKxt8WYTOCUhJVjobakuw'>Perfect Strangers</a></li>
          </ul>
        </footer>
    </body>
    </html>
  );
}
