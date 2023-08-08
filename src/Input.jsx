import React, { useState } from "react";

const Input = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    setText("");
    sendMessage(text.trim());
  };

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          placeholder="Upiši poruku i pritisni ENTER"
          autoFocus={true}
        />
        <button>Pošalji</button>
      </form>
    </div>
  );
};

export default Input;
