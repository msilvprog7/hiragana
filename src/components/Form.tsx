import React, { useEffect, useRef, useState } from "react";

interface FormProps {
  allowTyping: boolean;
  buttonColor: string;
  buttonText: string;
  onClick: (text: string) => void;
  refocusText: boolean;
  onRefocusText: () => void;
  refocusButton: boolean;
  onRefocusButton: () => void;
}

const Form = (props: FormProps) => {
  const {
    allowTyping,
    buttonColor,
    buttonText,
    onClick,
    refocusText,
    onRefocusText,
    refocusButton,
    onRefocusButton,
  } = props;
  const inputRef = useRef<any>();
  const buttonRef = useRef<any>();
  const [text, setText] = useState("");

  const handleClick = () => {
    // Handle when empty text
    if (allowTyping && text.length <= 0) {
      return;
    }

    onClick(text);
    setText("");
  };

  const handleEnterKey = (e: any) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  // Refocus text and button
  const refocus = (ref: any, refocus: boolean, onRefocus: () => void) => {
    if (!refocus || ref.current == null) {
      return;
    }

    // Refocus
    ref.current.focus();
    onRefocus();
  };
  useEffect(
    () => refocus(inputRef, refocusText, onRefocusText),
    [refocusText, onRefocusText]
  );
  useEffect(
    () => refocus(buttonRef, refocusButton, onRefocusButton),
    [refocusButton, onRefocusButton]
  );

  return (
    <div className="form">
      <input
        type="text"
        value={text}
        autoFocus={true}
        disabled={!allowTyping}
        ref={inputRef}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyUp={(e) => handleEnterKey(e)}
      />
      <button
        className={`button font-white ${buttonColor}`}
        ref={buttonRef}
        onClick={() => handleClick()}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Form;
