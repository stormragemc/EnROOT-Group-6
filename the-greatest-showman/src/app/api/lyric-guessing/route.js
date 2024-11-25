import { randomFill } from 'crypto';
import { getLyrics, getSong } from 'genius-lyrics-api';



const songList = [
    {
        title: 'STAY',
        instrumental: 'STAY - Instrumental',
        artist: 'justin bieber'
        
    },
    {
        title: 'Rewrite the Stars',
        instrumental: 'Rewrite the Stars - Instrumental',
        artist: 'James Arthur'
       
    },
    
    {
        title: 'Hymn for the Weekend',
        instrumental: 'Hymn for the Weekend - Instrumental',
        artist: 'Coldplay'
    },
    {
        title: 'End of Beginning',
        instrumental: 'End of Beginning - Instrumental',
        artist: 'Djo'
    },
    
    {
        title: 'Rather Be Clean Bandit',
        instrumental: 'Rather Be Orchestra - Instrumental',
        artist: 'Clean Bandit'
    },
    
    {
        title: 'Dusk Till Dawn',
        instrumental: 'Dusk Till Dawn - Instrumental',
        artist: 'ZAYN'
    },
    {
        title: 'APT',
        instrumental: 'APT. -Karaoke Version',
        artist: 'Bruno Mars'
    },
    {
        title: 'Cruel Summer',
        artist: 'taylor swift'
    },
    {
        title: 'Counting Stars',
        artist: 'OneRepublic'
    },
    {
        title: 'Perfect Strangers',
        artist: 'Jonas Blue'
    }
]
const clientId = '02ea3f72347e401cbd42a4d854ebc75a';
const clientSecret = '96ce0ca1ca104ce7ae23793dc35611c9';

async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}




async function searchSong(accessToken,song) {
    const query = song
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.tracks.items[0]; 
}
async function getSongPreview(songName) {
    const accessToken = await getAccessToken();
    const song = await searchSong(accessToken, songName);

    if (song) {
        console.log("Preview URL:", song.preview_url);
        const preview_url = song.preview_url;
       const  id = song.id;
       
        console.log('song', id)
        const result = {preview_url,id}
        console.log('result',result)

        return result
 
    } else {
        console.log("Preview not available for this song.");
    }
}

export async function GET(request) {
    const random = Math.floor(Math.random() * songList.length)
    const randomInstrumental = Math.floor(Math.random()*(songList.length-3))
    console.log('random',random)
    const url = new URL(request.url)
    const action = url.searchParams.get("action")
    try {
        if (action === "lyrics") {
            const options = {
                apiKey: 'aj1n259Se0FXF9q4Q3Mn8XXmQJenjJgFRV2fCRVRdwkhT7WZf4-zFCXfljXdDwNN',
                title: songList[random].title,
                artist: songList[random].artist,
                optimizeQuery: true
            };
            const song = await getSong(options)
            const spotifySong = await getSongPreview(songList[random].title)
            console.log('spotifySong',spotifySong);
            const id = spotifySong.id
            
            const url = 
            random == 7? 
            'https://p.scdn.co/mp3-preview/dba15da5409f3c808022cf927c0ff8581f717aa4':
            random == 8?
            'https://p.scdn.co/mp3-preview/6316f6cf12631da62c5b786421b25e66c3ab4ea6':
            random == 9?
            'https://p.scdn.co/mp3-preview/99b97634d18a161489f2a8a4d5efe5399dc3774c':
            spotifySong.preview_url
            console.log('id',id)
            songList.splice(random, 1)
            return new Response(JSON.stringify({song, url, id}), {
                status:200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
        }
        else if (action === "instrumental") {
            const spotifySong = await getSongPreview(songList[randomInstrumental].instrumental)
            const options = {
                apiKey: 'aj1n259Se0FXF9q4Q3Mn8XXmQJenjJgFRV2fCRVRdwkhT7WZf4-zFCXfljXdDwNN',
                title: songList[randomInstrumental].title,
                artist: songList[randomInstrumental].artist,
                optimizeQuery: true
            };
            const url = spotifySong.preview_url
            const id = spotifySong.id
            const song = await getSong(options)
            
            console.log(url)
            songList.splice(randomInstrumental, 1)
            return new Response(JSON.stringify({song, url, id}), {
                status:200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            

            
        }
        
        
    }
    catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}