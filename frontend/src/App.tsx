import React, { useState } from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState('');
  const handleSubmit = async(e: any) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const baseUrl = 'https://2ozallridj.execute-api.us-east-1.amazonaws.com/vocabulary'

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(formJson),
      });
      const vocabulary = await response.json();

      let formattedText = Object.entries(vocabulary)
      .map(([name, value]) => `${name}: ${value} `)
      .join('\n');
  
      setResult(formattedText);
      
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="App">
        <form method="post" onSubmit={handleSubmit}>
          <label>
            Input text: <input size={30} name="inputText" />
          </label>
          <hr />
          <label>
          Results: <input size={100} name="resutInput" value={result} disabled/>
          </label>
          <button type="submit">Submit form</button>
        </form>
      </div>
    </>
  );
}

export default App;
