import React from "react";

interface PromptProps {
  text: string;
}

function Prompt(props: PromptProps) {
  return <div className="prompt">{props.text}</div>;
}

export default Prompt;
