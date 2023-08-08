import "./App.css";
import Messages from "./Messages";
import Input from "./Input";
import React, { useState, useEffect, useRef } from "react";

export const randomName = () => {
  const names = [
    "Ivan",
    "Marko",
    "David",
    "Boris",
    "Martina",
    "Barbara",
    "Antonija",
    "Klara",
  ];
  const surnames = [
    " Ivanović",
    " Marković",
    " Martinović",
    " Petrović",
    " Zupčić",
    " Matešić",
    " Grdović",
    " Šarić",
  ];
  const randomIndex = () => Math.floor(Math.random() * names.length);

  return `${names[randomIndex()]} ${surnames[randomIndex()]}`;
};

export function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

const App = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({
    username: randomName(),
    color: randomColor(),
  });
  const droneRef = useRef(
    new window.Scaledrone("E8ucbKuWtKuXgDTu", {
      data: user,
    })
  );

  useEffect(() => {
    const drone = droneRef.current;

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      setUser((prevUser) => ({ ...prevUser, id: drone.clientId }));
    });

    const room = drone.subscribe("observable-mojaChatSoba");
    room.on("data", (data, user) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Math.random(), user, text: data },
      ]);
    });
  }, []);

  const sendMessage = (message) => {
    droneRef.current.publish({
      room: "observable-mojaChatSoba",
      message,
    });
  };

  return (
    <div className="App">
      <div className="Header">
        <h1>Wazzup!</h1>
      </div>
      <Messages messages={messages} currentUser={user} />
      <Input sendMessage={sendMessage} />
    </div>
  );
};

export default App;
