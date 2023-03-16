"use client";

import React, { useState } from "react";

const Create = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const createText = () => {
    setLoading(true);
    const data = { text };
    fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setLoading(false);
  };
  return (
    <div className="my-4  flex-col flex items-center justify-center">
      <textarea
        className="p-2 bg-transparent border-2 border-gray-900 lg:w-1/2 w-full h-96 rounded-md"
        placeholder="Type here..."
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="btn my-4 lg:w-fit flex items-center lg:px-20 w-full disabled:cursor-not-allowed"
        onClick={createText}
        disabled={!text}
      >
        {loading ? "Creating..." : "Create"}{" "}
        {loading && <p className="animate-bounce text-3xl">*</p>}
      </button>
    </div>
  );
};

export default Create;
