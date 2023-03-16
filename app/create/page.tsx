"use client";

import copyToClipboard from "@/utils/copyToClipboard";
import React, { useState, useRef } from "react";

const Create = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ Text: { sharing_code: string } }>({
    Text: { sharing_code: "" },
  });
  const [btnTxt, setBtnTxt] = useState("Copy");
  const [length, setLength] = useState(15);

  const modalRef: any = useRef(null);

  const createText = () => {
    setLoading(true);
    const data = { text, length };
    fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          setLoading(false);
          setData(data);
          setText("");
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
        value={text}
      ></textarea>
      <button
        className="btn my-4 lg:w-fit flex items-center lg:px-20 w-full disabled:cursor-not-allowed"
        onClick={createText}
        disabled={!text}
      >
        {loading ? "Creating..." : "Create"}{" "}
        {loading && <p className="animate-bounce text-3xl">*</p>}
      </button>

      <label htmlFor="my-modal-6" className="btn hidden" ref={modalRef}>
        open modal
      </label>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Text link created successfully</h3>
          <div className="my-5">
            <div className="w-full gap-1 flex items-center justify-center">
              <input
                type="text"
                className="input input-bordered w-[70%]"
                value={`${process.env.NEXT_PUBLIC_URL}/${data.Text.sharing_code}`}
              />
              <button
                className="btn btn-square"
                onClick={() => {
                  copyToClipboard(
                    `${process.env.NEXT_PUBLIC_URL}/${data.Text.sharing_code}`
                  );
                  setBtnTxt("✔️");
                  setTimeout(() => {
                    setBtnTxt("Copy");
                  }, 1000);
                }}
              >
                {btnTxt}
              </button>
            </div>
          </div>
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
