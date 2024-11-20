'use client';
import React, { useEffect, useState, useRef } from 'react'
import '../../styles/playPageStyle.css';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";

import Image from 'next/image';
const PlayPageC: React.FC = () => {

    interface LyricsData {

        url: string;
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

    //     const handlePlay = () => {
           
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
        setData(null)
        setStage(prevStage => prevStage + 1);

        // Increment stage
    };
    
    const winCondition = () => {
        const answer = document.getElementById('answerInput') as HTMLInputElement || null;
        if (stage != 4) {

            console.log(data?.song.title)
            if (answer.value.replace(/[(),.!?]/g, '').toLowerCase().trim() == data?.song.title) {
                document.getElementById("nextStageButton").hidden = false;
            }

        }
        else {

            if (answer.value.replace(/[.,!?"']/g, '').toLowerCase().trim() == line[2].replace(/[.,!?"']/g, '').toLowerCase().trim()) {
                console.log('YOU WIN')
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
        <div className="gameContainer">
            
            <h1 className = 'gameTitle'>LYRIC GUESSING</h1>
            <br></br>
            {stage == 0 && (
                <div className = 'Click' onClick={startGame}>

                    <Image src='https://i.ibb.co/7zq9M4x/pexels-olof-nyman-366625-2170729.jpg'
                        className = "gameTitleImage"
                        alt='yes'
                        width={350}
                        height={350}
                    />
                    <br></br>
                    <h1 >TOUCH TO PLAY</h1>
                </div>
            )}
            {!data && (stage != 0) && <div style = {{fontSize: 40, fontWeight: 'bold', color:'yellow'}}>Loading...</div>}
            {stage == 1 && data && (
                <div className="stage1">

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
                        
                        <audio id = 'customAudio' ref = {audioRef}>
                            <source id="previewAudio" src={data.url} type="audio/mpeg" />

                        </audio>
                    </div>
                        <input type="text" name="answerBox" id='answerInput' className="inputBox" placeholder='Guess here!' />
                        <p className = 'GUESS'onClick={() => winCondition()}>GUESS</p>

                    </div>
                    <button id="nextStageButton" hidden className="stageButton" onClick={nextStage}>Next Stage</button>

                </div>
            )}
            {stage == 2 && data && (
                <div className="stage2">

                    <div>
                        <audio controls autoPlay>
                            <source id="previewAudio" src={data.url} type="audio/mpeg" />

                        </audio>

                        <input type="text" name="answerBox" id='answerInput' className="inputBox" placeholder='Guess here!' />
                        <p  className = 'GUESS' onClick={() => winCondition()}>GUESS</p>

                    </div>
                    <button id="nextStageButton" hidden className="stageButton" onClick={nextStage}>Next Stage</button>

                </div>
            )
            }


            {stage == 3 && data && (

                <div>
                    <pre><strong>{data.song.lyrics}</strong></pre>
                    <input type="text" name="answerBox" id='answerInput' className="inputBox" placeholder='Guess here!' />
                    <p className = 'GUESS' onClick={() => winCondition()}>GUESS</p>


                    <button id="nextStageButton" hidden className="stageButton" onClick={nextStage}>Next Stage</button>
                </div>
            )}
            {stage == 4 && data && (
                <div>
                    <pre><strong>{line[0]}</strong></pre>
                    <pre><strong>{line[1]}</strong></pre>
                    <input type="text" name="answerBox" id='answerInput' className="inputBox" placeholder='Guess here!' />
                    <p className = 'GUESS'onClick={() => winCondition()}>GUESS</p>


                    <button id="nextStageButton" hidden className="stageButton" onClick={nextStage}>Next Stage</button>
                </div>
            )

            }



        </div>
    )
}

export default PlayPageC;