import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let interval = useRef(null);

  const formatedSecond = () => {
    return second < 10 ? `0${second}` : second;
  };

  const resetTimer = () => {
    setMinute(0);
    setSecond(0);
    clearInterval(interval.current);
    interval.current = null;
    setIsRunning(false);
  };

  const startTimer = () => {
    if (interval.current) return;
    setIsRunning(true);
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

  const stopTimer = () => {
    clearInterval(interval.current);
    interval.current = null;
    setIsRunning(false);
  };

  return (
    <div className="p-10">
      <h1>Stopwatch</h1>
      <p className="py-10">
        Time: {minute}:{formatedSecond()}
      </p>
      {!isRunning ? (
        <button onClick={startTimer}>Start</button>
      ) : (
        <button onClick={stopTimer}>Stop</button>
      )}
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default App;
