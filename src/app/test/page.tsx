"use client";
import React from "react";

function page() {
  const PlaySound = () => {
    const audio = new Audio("/successed.mp3");
    audio.play();
  };
  return (
    <div>
      <button onClick={PlaySound}>open</button>
    </div>
  );
}

export default page;
