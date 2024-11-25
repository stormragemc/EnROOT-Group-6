import '../../styles/globals.css'
import { Great_Vibes } from 'next/font/google';
import React from 'react'
import Image from 'next/image'
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight:'400',
  variable: '--font-greatVibes'
});
const HomePageC: React.FC = () => {

  return (
    
    <div className={`pagec ${greatVibes.variable}`}>
    <h1 style={{color:'black' ,fontSize:55,marginBottom:30, textAlign:'center'}}>What is Our Event?</h1>
      <p>Step right up and witness the spectacle! The Greatest Showman is here to light up your night with an unforgettable blend of music, dance, and pure entertainment. 🎪✨</p>
      <p>🗓 Date: 27th November</p>
      <p>📍 Location: Think Tank 21, Level 3 /t Think Tank 26, Level 6</p>
      <p>⏰ Time: 19:00 - 21:30</p>
      <p>Prepare to be amazed as the stage transforms into a playground of vibrant performances and high-energy games infused with the rhythm of music and dance. Whether you're a fan of breathtaking choreography or heart-pounding beats, this event promises a whirlwind of fun and excitement for all.</p>
      <h2>Why Attend?</h2>
      <p>•Electrifying music and dance games that will get everyone on their feet.</p>
      <p>•Stunning performances designed to entertain and inspire.</p>
      <p>•A perfect evening to unwind, laugh, and create lasting memories.</p>
      <p>Don’t miss your chance to be part of The Greatest Showman experience! <a style  = {{textDecoration: 'underline', fontWeight:'bold'}} href = 'https://forms.office.com/r/tcgwyttTP9?origin=lprLink'>Sign up here</a> and get ready for a night of spectacular entertainment.</p>
      <p>Let the show begin! 🎭✨</p>
      <div>
      <Image
      src = 'https://i.ibb.co/CwfPjkt/root-logo-black-removebg-preview.png'
      width = {125}
      height = {125}
      style = {{marginTop:40}}
      alt = 'root logo'
      />
      </div>
    </div>
    
  )
}

export default HomePageC