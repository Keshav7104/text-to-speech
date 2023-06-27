"use client"
import axios from "axios";
import { useState } from "react";

export default function Home() {

  const [englishText, setEnglish] = useState("")//input text
  const [Translated, setTranslated] = useState("")//translated text
  const [language, setLanguage] = useState("hi")//language code
  const [audio,setAudio]=useState("")//current audio link


  //function to translate text
  const translateText = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('q', englishText);
    encodedParams.set('target', language);
    encodedParams.set('source', 'en');

    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '3bde03bde8msh09255f6b5329849p15f185jsn2e0e8afe5177',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setTranslated(response.data.data.translations[0].translatedText)
    } catch (error) {
      console.error(error);
    }
  };

 //fuction to convert text into audio
  const speech = async () => {

    const encodedParams = new URLSearchParams();
    encodedParams.set('voice_code', `${language}-IN-2`);
    encodedParams.set('text', Translated);
    encodedParams.set('speed', '1.00');
    encodedParams.set('pitch', '1.00');
    encodedParams.set('output_type', 'audio_url');

    const options = {
      method: 'POST',
      url: 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '3bde03bde8msh09255f6b5329849p15f185jsn2e0e8afe5177',
        'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setAudio(response.data.result.audio_url);
      new Audio(audio).play()
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <section className=" w-screen h-screen flex flex-col items-center justify-center">
      <h1 className=" text-xl text-purple-600 my-3">
        Input your English text here
      </h1>
      <h2 className=" text-sm text-black">
        Text Input
      </h2>
      <input type='text' onChange={e => setEnglish(e.target.value)} className=" outline-purple-600 border-black border-2" />
      <button onClick={translateText} className="my-3 w-48 h-10 rounded-md bg-purple-600 text-white">
        Translate
      </button>
      <label htmlFor="languages">
        Choose a language
      </label>
      <select name="languages" id="languages" onChange={e => setLanguage(e.target.value)}>
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
      </select>
      <button className="flex items-center justify-center ps-2 my-3 w-20 h-20 rounded-full bg-purple-600" onClick={speech}>
        <div className="w-1/2 h-1/2 clip bg-white ">
        </div>
      </button>
      <a href={audio} >Download</a>
    </section>
  )
}
