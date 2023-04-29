import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMicrophone } from 'react-icons/fa';

function JokeTeller() {
  const [synth, setSynth] = useState(null);
  const [voices, setVoices] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    setSynth(synth);

    if (synth) {
      const voices = synth.getVoices();
      setVoices(voices);

      const desiredVoice = voices.find(
        (voice) =>
          voice.name ===
          'Microsoft Willem Online (Natural) - Afrikaans (South Africa)'
      );
      if (desiredVoice) {
        synth.onvoiceschanged = null;
        synth.voice = desiredVoice;
      }
    }
  
    // Pre-load a list of jokes
    const fetchJokes = async () => {
      const response = await axios.get(
        'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=10'
      );
      const jokes = response.data.results.map((result) => result.joke);
      setJokes(jokes);
    };
    fetchJokes();
  }, []);
  const getRandomVoice = (voices) => {
    const randomIndex = Math.floor(Math.random() * voices.length);
    return voices[randomIndex];
  };
  const handleSpeechRecognition = () => {
    if (!synth) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = navigator.language;
    recognition.addEventListener('result', async (event) => {
      const speech = event.results[0][0].transcript;
      if (speech.toLowerCase().includes('hello')) {
        await tellJoke(getRandomVoice(voices)); // Call tellJoke() with a random voice
        recognition.stop();
      }
      if (speech.toLowerCase().includes('hi')) {
        const greeting = new SpeechSynthesisUtterance(`Hello! i AM cristiano Ronaldo! "SOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOooooooOOOO"`);

        console.log(greeting.voice);
        greeting.voice = voices.find((voice)=>(voice.name =="Microsoft Marija Online (Natural) - Macedonian (Republic of North Macedonia)"));
        greeting.rate = 1;
        greeting.pitch = 1.2;
        greeting.volume = 5;

        synth.speak(greeting);
 
      }

    });
    setIsListening(true);
    recognition.start();
  };

  const tellJoke = async (selectedVoice, jokes) => {
    const response = await axios.get(
      'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single'
    );
    const joke = response.data.joke;
    const utterance = new SpeechSynthesisUtterance(joke);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.volume = 1.2;

    utterance.onend = () => {
      const punchline = new SpeechSynthesisUtterance(
        'Ha ha ha, that was funny!'
      );
      if (selectedVoice) punchline.voice = selectedVoice;
      punchline.rate = 0.9;
      punchline.pitch = 1.5;
      punchline.volume = 1.5;
      synth.speak(punchline);
    };

    synth.speak(utterance);
  };
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ position: 'fixed', bottom: 10, right: 200 }}
    >
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center animate-pulse transition duration-300 ease-in-out"
        onClick={handleSpeechRecognition}
      >
        {isListening ? (
          <FaMicrophone className="text-3xl animate-pulse mr-2" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-white mr-2"></div>
        )}
        Start listening now
      </button>
    </div>
  );
}

export default JokeTeller;
