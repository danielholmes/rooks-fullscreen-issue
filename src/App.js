import './App.css';
import { useState, useEffect, useCallback } from "react";
import useFullscreen from "@rooks/use-fullscreen";

function App() {
  const {
    request,
    exit,
    isFullscreen,
  } = useFullscreen();

  const [customIsFullscreen, setCustomIsFullscreen] = useState(false);
  const onFullscreenChange = useCallback(
    () => {
      setCustomIsFullscreen(
        !!document.fullscreenElement ||
        !!document.webkitIsFullScreen ||
        !!document.mozFullScreen ||
        !!document.msFullscreenElement
      );
    },
    []
  )
  useEffect(
    () => {
      document.addEventListener("webkitfullscreenchange", onFullscreenChange);
      return () => {
        document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      }
    },
    [onFullscreenChange]
  )

  return (
    <div className="App">
      <header className="App-header">
        <h2>Example of fullscreen state issue</h2>
        <h3>Only checked in Chrome</h3>
        <ol>
          <li>Click request full screen</li>
          <li>Press ESC key after full screen shown</li>
          <li>You can observe that the useFullscreen state is incorrect</li>
        </ol>
      </header>
      <div>
        Full screen state returned by hook {isFullscreen.toString()}
      </div>
      <div>
        Local full screen state from example {customIsFullscreen.toString()}
      </div>
      <div>
        <button type="button" onClick={() => request()}>Request full screen</button>
        <button type="button" onClick={() => exit()}>Exit full screen</button>
      </div>
    </div>
  );
}

export default App;
