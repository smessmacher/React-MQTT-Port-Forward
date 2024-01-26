import React from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';


function App() {
  const handleClick = async () => {
    console.log('Request sent to backend');
    
    try {
      const response = await axios.post('http://localhost:3001/api/log', { message: '7F6C' });
      const resultFromBackend = response.data.message;
      console.log('Result from backend:', resultFromBackend);
      setTimeout(() => {
        window.open(`http://localhost:${resultFromBackend}`, '_blank');
      }, 1000);
      ;
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple React Server</h1>
        <button onClick={handleClick}>Click Me</button>
      </header>
    </div>
  );
}

export default App;
