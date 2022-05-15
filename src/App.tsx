import React, { useEffect, useState } from "react";
import "./App.css";

const DisplayChangeIntervalMs = 3000;

enum DisplayType {
  Question = 0,
  GreatResults = 1,
  ImproveResults = 2,
}

const App = () => {
  // Change display type to preview design
  const startingDisplayType = DisplayType.Question;
  const rotateDisplays = true;
  const [displayType, setDisplayType] = useState(startingDisplayType);

  // Interval to update the display type
  useEffect(() => {
    if (rotateDisplays) {
      const intervalId = setInterval(() => {
        setDisplayType((prevDisplayType) => (prevDisplayType + 1) % 3);
      }, DisplayChangeIntervalMs);
      return () => clearInterval(intervalId);
    }
  }, []);

  switch (displayType) {
    case DisplayType.Question:
      return (
        <div className="app">
          <div className="prompt">Type the Hiragana</div>
          <div className="display-box">
            <div className="row">
              <div className="info round gray">1 of 20</div>
              <div className="info round green right">0</div>
            </div>
            <div className="box light-gray">
              <div className="large">ち</div>
              <div className="hidden info round gray">19 of 20</div>
            </div>
            <div className="form">
              <input type="text" defaultValue="chi" />
              <button className="button blue font-white">submit</button>
            </div>
          </div>
        </div>
      );

    case DisplayType.GreatResults:
      return (
        <div className="app">
          <div className="prompt">You did Great</div>
          <div className="display-box">
            <div className="row">
              <div className="info round gray">1 of 20</div>
              <div className="info round green right">0</div>
            </div>
            <div className="box green">
              <div className="medium-large">95%</div>
              <div className="info round gray right">19 of 20</div>
            </div>
            <div className="form">
              <input type="text" disabled />
              <button className="button orange font-white">play again</button>
            </div>
          </div>
        </div>
      );

    case DisplayType.ImproveResults:
      return (
        <div className="app">
          <div className="prompt">Keep Playing</div>
          <div className="display-box">
            <div className="row">
              <div className="info round gray">1 of 20</div>
              <div className="info round green right">0</div>
            </div>
            <div className="box light-orange">
              <div className="medium-large">25%</div>
              <div className="info round gray right">5 of 20</div>
            </div>
            <div>
              Practice and you <b>will</b> improve
            </div>
            <div className="form">
              <input type="text" disabled />
              <button className="button orange font-white">play again</button>
            </div>
          </div>
        </div>
      );
  }
};

export default App;
