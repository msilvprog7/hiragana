import React from "react";

interface DisplayBoxProps {
  color: string;
  text: string;
  textSize: string;
  subText: string;
  showSubText: boolean;
}

const DisplayBox = (props: DisplayBoxProps) => {
  return (
    <div className={`box ${props.color}`}>
      <div className={props.textSize}>{props.text}</div>
      <div
        className={`info round gray right ${props.showSubText ? "" : "hidden"}`}
      >
        {props.subText}
      </div>
    </div>
  );
};

export default DisplayBox;
