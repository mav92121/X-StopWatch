import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  let interval = useRef(null);

  const formatedSecond = () => {
    return second < 10 ? `0${second}` : second;
  };

  const resetTimer = () => {
    setMinute(0);
    setSecond(0);
    clearInterval(interval.current);
    interval.current = null;
  };

  const startTimer = () => {
    if (interval.current) return; // Prevent multiple intervals
    interval.current = setInterval(() => {
      setSecond((prevSecond) => {
        if (prevSecond === 59) {
          setMinute((prevMinute) => prevMinute + 1);
          return 0;
        }
        return prevSecond + 1;
      });
    }, 1000);
  };

  return (
    <div className="p-10">
      <h1>Stopwatch</h1>
      <p className="py-10">
        Time : {minute}:{formatedSecond()}
      </p>
      <button onClick={startTimer}>Start</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default App;
