import React, { useState } from "react";

interface FormProps {
  allowTyping: boolean;
  buttonColor: string;
  buttonText: string;
  onClick: (text: string) => void;
}

const Form = (props: FormProps) => {
  const [text, setText] = useState("");

  return (
    <div className="form">
      <input
        type="text"
        value={text}
        disabled={!props.allowTyping}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        className={`button font-white ${props.buttonColor}`}
        onClick={() => {
          props.onClick(text);
          setText("");
        }}
      >
        {props.buttonText}
      </button>
    </div>
  );
};

export default Form;
