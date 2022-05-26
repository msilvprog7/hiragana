import React, { useState } from "react";
import DisplayBox from "./components/DisplayBox";
import Form from "./components/Form";
import Prompt from "./components/Prompt";
import "./App.css";

const App = () => {
  const questions = [
    { question: "ち", answer: "chi" },
    { question: "あ", answer: "a" },
    { question: "し", answer: "shi" },
    { question: "や", answer: "ya" },
    { question: "み", answer: "mi" },
  ];
  const [prompt, setPrompt] = useState("Type the Hiragana");
  const [question, setQuestion] = useState(1);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState("");
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [color, setColor] = useState("light-gray");
  const [text, setText] = useState(questions[0].question);
  const [showMotivation, setShowMotivation] = useState(false);
  const [refocusText, setRefocusText] = useState(false);
  const [refocusButton, setRefocusButton] = useState(false);

  return (
    <div className="app">
      <Prompt text={prompt} />
      <div className="display-box">
        <div className="row">
          <div className="info round gray">
            {question} of {questions.length}
          </div>
          <div className="info round green right">{correct}</div>
        </div>
        <DisplayBox
          color={color}
          text={text}
          textSize={finished ? "medium-large" : "large"}
          subText={`${correct} of ${questions.length}`}
          showSubText={finished}
        />
        <div className={showIncorrect ? "" : "hidden"}>{incorrect}</div>
        <div className={showMotivation ? "" : "hidden"}>
          Practice and you <b>will</b> improve
        </div>
        <Form
          allowTyping={!finished}
          buttonColor={finished ? "orange" : "blue"}
          buttonText={finished ? "play again" : "submit"}
          refocusText={refocusText}
          onRefocusText={() => setRefocusText(false)}
          refocusButton={refocusButton}
          onRefocusButton={() => setRefocusButton(false)}
          onClick={(text: string) => {
            // Play again if game is finished
            if (finished) {
              setFinished(false);
              setPrompt("Type the Hiragana");
              setQuestion(1);
              setCorrect(0);
              setIncorrect("");
              setShowIncorrect(false);
              setColor("light-gray");
              setText(questions[0].question);
              setShowMotivation(false);
              setRefocusText(true);
              return;
            }

            // Update score
            let score = correct;
            let q = questions[question - 1];
            if (text === q.answer) {
              score += 1;
              setCorrect(score);
              setShowIncorrect(false);
            } else {
              setIncorrect(`${q.question} is '${q.answer}'`);
              setShowIncorrect(true);
            }

            // Proceed to next question
            if (question < questions.length) {
              setText(questions[question].question);
              setQuestion(question + 1);
              setRefocusText(true);
              return;
            }

            // Finish game
            const percent = Math.round((100 * score) / questions.length);
            setFinished(true);
            setPrompt(percent > 75 ? "You did Great" : "Keep Playing");
            setColor(percent > 75 ? "green" : "light-orange");
            setText(`${percent}%`);
            setShowMotivation(percent <= 75);
            setRefocusButton(true);
          }}
        />
      </div>
    </div>
  );
};

export default App;
