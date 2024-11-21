import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [key, setKey] = useState(Date.now()); 

  const sendData = async () => {
    if (text !== "") {
      try {
        const response = await fetch('http://localhost:5000/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: text }) 
        });
        console.log(response);

        if (!response.ok) {
          throw new Error('오디오 파일을 가져오는 데 실패했습니다.');
        }

        const blob = await response.blob(); 
        const url = URL.createObjectURL(blob);
        console.log('url:', url)
        setAudioUrl(url); 
        
        setKey(Date.now());

      } catch (error) {
        console.error('오류 발생:', error);
      }
    } else {
      alert("text 입력 후 제출해 주세요");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          type="text"
          placeholder='변환할 text 입력'
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button onClick={sendData}>제출</button>

        {audioUrl ? (
          <div>
            <audio key={key} controls>
              <source src={audioUrl} type="audio/mp3" />
            </audio>
          </div>
        ) : (
          <div>오디오가 들어올 자리</div>
        )}
      </header>
    </div>
  );
}

export default App;
