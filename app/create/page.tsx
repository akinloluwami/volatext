"use client";

import React from "react";

const Create = () => {
  const data = { text: "This is a test for the MVP" };
  const createText = () => {
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
      ></textarea>
      <button
        className="btn my-4 lg:w-fit lg:px-20 w-full"
        onClick={createText}
      >
        Create
      </button>
    </div>
  );
};

export default Create;
