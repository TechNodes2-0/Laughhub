import React, { useState } from 'react';
import axios from 'axios';

function Basic() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000', { prompt });
      setResponse(res.data.bot);
    } catch (error) {
      console.error(error);
      setResponse('Something went wrong');
    }
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Basic;
