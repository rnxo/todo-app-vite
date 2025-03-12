/* import { useState } from "react";
import "./App.css";

const words = [
    "anyway",
    "following",
    "refer",
    "available",
    "department",
    "conference",
    "according",
    "likely",
    "offer",
    "equipment",
];

const translatedWords = [
    "とにかく",
    "に続く",
    "参照する",
    "利用できる",
    "部門",
    "会議",
    "に従って",
    "可能性が高い",
    "申し出る",
    "設備"
];


function WordButton({currentIndex, setCurrentIndex}) {
  const prev = () => {setCurrentIndex(currentIndex - 1)};
  const next = () => {setCurrentIndex(currentIndex + 1)};

  return (
    <div className="word-button">
      <button type="button" onClick={prev}>prev</button>
      <button type="button" onClick={next}>next</button>
    </div>
  );
};

function Form({inputValue, setInputValue, translatedWords, currentIndex, setCurrentIndex, setScore}) {
  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const enterKeyDown = (e) => {
    if(e.key === "Enter") {
      if(e.target.value === translatedWords[currentIndex]) {
        setCurrentIndex(currentIndex + 1);
        setScore(prevScore => prevScore + 1);
        setInputValue("");  
      } else {
        alert("wrong translate");
        setInputValue("");
      }
    } 
  };
  
  return (
    <input 
      type="text"
      placeholder="translate it in japanese"
      value={inputValue}
      onChange={changeHandler}
      onKeyDown={enterKeyDown}/>
  );
}



export default function App() {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ inputValue, setInputValue ] = useState("");
  const [ score, setScore ] = useState(0);
  const [ word, setWords ] = useState("");

  return (
    <div className="app-container">
      <h3>SCORE: {score}point</h3>
      <h3>No{currentIndex + 1} : {words[currentIndex]}</h3>
      <Form 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
        translatedWords={translatedWords} 
        currentIndex={currentIndex} 
        setCurrentIndex={setCurrentIndex} 
        setScore={setScore}
      />
      <WordButton currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
      <select value={word}>

      </select>
    </div>
  );
}


 */