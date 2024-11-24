'use client';
import React, { useEffect, useState, useRef } from 'react'
import '../../styles/playPageStyle.css';
import { FaPlay } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { SiGenius } from "react-icons/si";
import { MdOutlineReplay } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from 'next/image';
import { GoContainer } from 'react-icons/go';
const PlayPageC: React.FC = () => {

    interface LyricsData {

        url: string;
        id: string;
        song: object;



    }
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [data, setData] = useState<LyricsData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [stage, setStage] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [hasEnded, setHasEnded] = useState<boolean>(false);
    
    // useEffect(() => {
      
    //     }
    //     const audio = audioRef.current;
    //     console.log('audioRef', audioRef.current)
    //     if (!audio) return;

    //     const handlePlay = () => 
    //         console.log('is the song playing',isPlaying)
    //     };

    //     const handlePause = () => {
    //         console.log('pause event')
    //         setIsPlaying(false);

    //     }
    //     const handleEnded = () => {
    //         setIsPlaying(false);
    //         setHasEnded(true);
    //     };

    //     audio.addEventListener('play', handlePlay);
    //     audio.addEventListener('pause', handlePause);
    //     audio.addEventListener('ended', handleEnded);

    //     return () => {
    //         audio.removeEventListener('play', handlePlay);
    //         audio.removeEventListener('pause', handlePause);
    //         audio.removeEventListener('ended', handleEnded);
    //     };
    
    // }, []);

    console.log('stage', stage)

    useEffect(() => {
        if (stage != 0 && stage != 2) {
            const fetchLyrics = async () => {
                try {
                    const response = await fetch('/api/lyric-guessing?action=lyrics');
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);

                    }
                    const result = await response.json();
                    result.song.title = result?.song.title.slice(0, result.song.title.indexOf("by")).trim().toLowerCase()
                    result.song.title = result?.song.title.replace(/[(),.!?]/g, '').trim()
                    result.song.lyrics = getPartFromLyrics(result?.song.lyrics)

                    console.log(result)

                    setData(result)
                    console.log('data', data)
                    console.log(data?.song)
                } catch (error: any) {
                    setError(error.message);
                }
            }
            fetchLyrics()
        } else if (stage === 2) {
            const fetchInstrumental = async () => {
                try {
                    const response = await fetch('/api/lyric-guessing?action=instrumental');
                    if (!response.ok) {
                        throw new Error(`Http Error! Status: ${response.status}`)

                    }
                    const result = await response.json();
                    result.song.title = result?.song.title.slice(0, result.song.title.indexOf("by")).trim().toLowerCase()
                    result.song.title = result?.song.title.replace(/[(),.!?]/g, '').trim()
                    setData(result)
                    console.log(result)
                } catch (error: any) {
                    setError(error.message);
                }
            }
            fetchInstrumental()
        }


    }, [stage])

    if (error) return <div>Error: {error}</div>
    function getPartFromLyrics(lyrics: string) {
        const cleanedLyrics = lyrics.replace(/\[.*?\]/g, '').trim();
        const paragraphs = cleanedLyrics.split(/\n\n/).map(p => p.trim()).filter(p => p);

        // Ensure there are paragraphs to choose from
        if (paragraphs.length === 0) {
            return null;
        }

        // Generate a random index
        const randomIndex = Math.floor(Math.random() * paragraphs.length);

        // Return the random paragraph
        return paragraphs[randomIndex];
    }
    const line = data?.song.lyrics.split('\n')

    const startGame = () => {
        setStage(1)
    }
    const nextStage = () => {
        document.getElementById('answerInput').hidden = false;
        setData(null)
        setStage(prevStage => prevStage + 1);

        // Increment stage
    };
    
    const winCondition = () => {
        const answer = document.getElementById('answerInput') as HTMLInputElement || null;
        if (stage != 4) {

            console.log(data?.song.title)
            if (answer.value.replace(/[(),.!?]/g, '').toLowerCase().trim() == data?.song.title) {
                document.getElementById(`guess${stage}`).hidden = true;
                document.getElementById("nextStage").style.visibility = 'visible';
                document.getElementById("answerInput").hidden = true;
                document.getElementById('answerKey').hidden = false;
            }

        }
        else {

            if (answer.value.replace(/[.,!?"']/g, '').toLowerCase().trim() == line[2].replace(/[.,!?"']/g, '').toLowerCase().trim()) {
                document.getElementById("answerInput").hidden = true;
                document.getElementById('answerKey').hidden = false;
                document.getElementById(`guess${stage}`).hidden = true;
                setStage(5);
            }

        }
    }
    
    
    const play = () => {
            if(audioRef.current) {
                audioRef.current.play();
                console.log('is the song playing', isPlaying)
                setIsPlaying(true)
            }
        
        
    }
    const pause =() => {
            if(audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false)
            }
     }
        const replay = () => {
            if(audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
    }
        }
    

    return (
        <div>
    
             <p style = {{fontSize:20, color:'black', textAlign:'left', position:'absolute', zIndex:100, fontWeight:'bold', margin:10}}>Made with Spotify <FaSpotify/><br></br>& Genius <SiGenius/></p>
            
       
        <div  id = 'container' className="gameContainer" style = {{borderRadius:15}}>
           
            <div className = 'image'>
            <Image src = 'https://i.ibb.co/pvT4WG8/apt.png'  alt = 'bolts' className = 'bolts'
            width = {1000}
            height = {1000}
            />
            </div>
            
            <br></br>
            {stage == 0 && (
                
                <div className = 'Click' onClick={startGame}>
                    <h1 className = 'gameTitle'>SONG TRIVIA</h1>
                    <Image src='https://i.ibb.co/7zq9M4x/pexels-olof-nyman-366625-2170729.jpg'
                        className = "gameTitleImage"
                        alt='yes'
                        width={350}
                        height={350}
                    />
                
                    <h1 className = 'rainbow' >TOUCH TO PLAY</h1>
                </div>
            )}
            
            {!data && (stage != 0) && 
            <div style = {{position:'absolute'}}>
            
            <div style={{margin:'15px', fontSize:'50px', fontWeight:'bold' }}>DIFFICULTY: {stage == 1? <span style = {{color:'limegreen'}}>EASY </span>: stage ==2 ?<span style = {{color:'orange'}}>MEDIUM</span> :stage ==3? <span style = {{color:'red'}}>HARD</span>: <span style = {{color:'purple'}}>????</span>}</div>

            <div className = 'loading'><AiOutlineLoading3Quarters size = {325} /></div>


                
            </div>    
                }
            {stage == 1 && data && (
                <div style ={{ position: 'absolute'}}className="stage1">

                    <div>
                    <div className = 'audioPlayer'>
                        {!isPlaying && !hasEnded &&
                       
                        <p id = 'playButton' onClick = {play}>
                        <FaPlay size = {100} />
                        </p>
                        }
                       {isPlaying && !hasEnded && 
                         
                        <p id= ' pauseButton' onClick = {pause}><FaPause size = {100}/></p>
                        
                       }
                        
                        <p id = 'replayButton' onClick = {replay}><MdOutlineReplay size = {100}/></p>
                        
                        <audio  autoPlay id = 'customAudio' ref = {audioRef}>
                            <source id="previewAudio" src={data.url} type="audio/mpeg" />

                        </audio>
                    </div>
                    <div id = 'answerKey' hidden className = 'answerKey'>
                    
                    <iframe style = {{borderRadius:20, width:500, height:156}}
                    src = {`https://open.spotify.com/embed/track/${data.id}?utm_source=oembed`}
                    width = "300"
                    height = "80"
                    
                    >
                    </iframe>
                    
                    <h1 className = 'rainbow' style = {{fontSize: 60}}>WELL DONE!</h1>
                    </div>
                        <input type="text" name="answerBox" id='answerInput' className="inputBox" placeholder='Guess the song!' />
                        <p id = 'guess1' className = 'GUESS'onClick={() => winCondition()}>GUESS</p>

                    </div>
                    <div  id = "nextStage" style = {{cursor: 'pointer'}}className = "nextStage">
                    <h2 id="nextStageButton" className="stageButton" onClick={nextStage}>Next Stage</h2>
                    </div>
                </div>
            )}
            {stage == 2 && data && (
                <div style = {{position: 'absolute'}} className="stage2">

                <div>
                    <div className = 'audioPlayer'>
                        {!isPlaying && !hasEnded &&
                       
                        <p id = 'playButton' onClick = {play}>
                        <FaPlay size = {100} />
                        </p>
                        }
                       {isPlaying && !hasEnded && 
                         
                        <p id= ' pauseButton' onClick = {pause}><FaPause size = {100}/></p>
                        
                       }
                        
                        <p id = 'replayButton' onClick = {replay}><MdOutlineReplay size = {100}/></p>
                        
                        <audio autoPlay id = 'customAudio' ref = {audioRef}>
                            <source id="previewAudio" src={data.url} type="audio/mpeg" />

                        </audio>
                    </div>
                    <div id = 'answerKey' hidden className = 'answerKey'>
                    
                    <iframe style = {{borderRadius:20, width:500, height:156}}
                    src = {`https://open.spotify.com/embed/track/${data.id}?utm_source=oembed`}
                    width = "300"
                    height = "80"
                    
                    >
                    </iframe>
                    
                    <h1 className = 'rainbow' style = {{fontSize: 60}}>YOU'RE FANTASTIC!!</h1>
                    </div>
                        <input type="text" name="answerBox" id='answerInput' className="inputBox" placeholder='Guess the song from the instrumental!' />
                        <p id = 'guess2' className = 'GUESS'onClick={() => winCondition()}>GUESS</p>

                    </div>
                    <div  id = "nextStage"  style = {{cursor:'pointer'}} className = "nextStage">
                    <h2 id="nextStageButton" className="stageButton" onClick={nextStage}>Next Stage</h2>
                    </div>

                </div>
            )
            }


            {stage == 3 && data && (

                <div style = {{position:'absolute'}}>
                    
                    <pre style = {{fontSize:29, fontWeight:'bold'}}><strong>{data.song.lyrics}</strong></pre>
                    
                    <div id = 'answerKey' hidden className = 'answerKey'>
                    <iframe style = {{borderRadius:20, width:500, height:156}}
                    src = {`https://open.spotify.com/embed/track/${data.id}?utm_source=oembed`}
                    width = "300"
                    height = "80"
                    
                    >
                    </iframe>
                    <h1 className = 'rainbow' style = {{ fontSize: 60}}>MARVELOUS!!!</h1>
                    </div>
                    <input type="text" name="answerBox" id='answerInput' className="inputBox" placeholder='Which song is the lyric from?' />
                        <p id = 'guess3' className = 'GUESS'onClick={() => winCondition()}>GUESS</p>
                        
                        <div  id = "nextStage"  style = {{cursor:'pointer'}} className = "nextStage">
                    <h2 id="nextStageButton" className="stageButton" onClick={nextStage}>Next Stage</h2>
                    </div>
                </div>
            )}
            {stage == 4 && data && (
                <div style = {{position:'absolute'}}>
                    <div style = {{fontSize:30}} className = 'lyrics'>
                    <pre><strong>{line[0]? line[0]: ''}</strong></pre>
                    <pre><strong>{line[1]? line[1] : ''}</strong></pre>
                    </div>
                    <div id = 'answerKey' hidden className = 'answerKey'>
                    <iframe style = {{borderRadius:20, width:500, height:156}}
                    src = {`https://open.spotify.com/embed/track/${data.id}?utm_source=oembed`}
                    width = "300"
                    height = "80"
                    
                    >
                    </iframe>
                    <h1 className = 'rainbow' style = {{color:'#D4AF37', fontSize: 60}}>WELL DONE!</h1>
                    </div>
                    <input type="text" name="answerBox" id='answerInput' className="inputBox" placeholder='GUESS THE NEXT LINE!' />
                    <p id = 'guess4' className = 'GUESS'onClick={() => winCondition()}>GUESS</p>
                   
                </div>
            )

            }
             {stage == 5 && data && (
                <div className = 'winnerBackground'> 
                <h1 style = {{fontSize:50}}>YOU'VE BEATEN OUR GAME!</h1>
                <div>
                <h1>WANNA HAVE MORE FUN AND WIN PRIZES?<br></br> COME JOIN OUR EVENT IRL!!</h1>
                <h1 style = {{textDecoration:'underline', fontWeight:'bold'}}><a href = 'https://forms.office.com/r/tcgwyttTP9?origin=lprLink'>CLICK HERE TO REGISTER NOW</a></h1>
                <Image 
                style = {{borderRadius:15}}
                src = 'https://i.ibb.co/c1dmpkY/IMG-20241124-194603-706.jpg'
                alt = 'qr'
                width = {300}
                height = {300}
/>
                </div>
                </div>
             )}




        </div>
        </div>
        
    )
}

export default PlayPageC;