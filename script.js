const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton(){

    button.disabled =!button.disabled
}


//Passing joke toVoiceRSS APPI
function tellMeJoke( joke){
    console.log('tell me: ', joke);

    VoiceRSS.speech({
        key: '02afccb7f8784ba3af6ab01fd1396970',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });

}

//Get Joke from joke API
async function getJokes(){  
       const apiUrl='https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,political';
       let joke ='';

    try{
     
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);


        if(data.setup){
            joke = `${data.setup}...${data.delivery}`;
        }else{
            joke = data.joke;
        }


        tellMeJoke(joke);
        toggleButton();

    }catch(error){
        //Catch error
        console.log('error', error)

    }
}


button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton)


