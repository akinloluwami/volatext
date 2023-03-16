"use client";

import React, { useState } from "react";

const Create = () => {
  const [text, setText] = useState<string>("");

  const createText = () => {
    const data = { text };
    fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="my-4  flex-col flex items-center justify-center">
      <textarea
        className="p-2 bg-transparent border-2 border-gray-900 lg:w-1/2 w-full h-96 rounded-md"
        placeholder="Type here..."
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="btn my-4 lg:w-fit lg:px-20 w-full disabled:cursor-not-allowed"
        onClick={createText}
        disabled={!text}
      >
        Create
      </button>
    </div>
  );
};

export default Create;
