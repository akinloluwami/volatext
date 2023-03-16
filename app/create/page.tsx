"use client";

import React, { useState, useRef } from "react";

const Create = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState({});

  const modalRef: any = useRef(null);

  const createText = () => {
    setLoading(true);
    const data = { text };
    fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          setLoading(false);
          modalRef?.current?.click();
          return;
        }
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
        className="btn my-4 lg:w-fit flex items-center lg:px-20 w-full disabled:cursor-not-allowed"
        onClick={createText}
        disabled={!text}
      >
        {loading ? "Creating..." : "Create"}{" "}
        {loading && <p className="animate-bounce text-3xl">*</p>}
      </button>

      <label htmlFor="my-modal-6" className="btn" ref={modalRef}>
        open modal
      </label>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Text link created successfully</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
