"use client";

import copyToClipboard from "@/utils/copyToClipboard";
import axios from "axios";
import React, { useState, useRef } from "react";
import { TbInfoHexagon } from "react-icons/tb";
import db from "@/utils/db";

const Create = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ Text: { sharing_code: string } }>({
    Text: { sharing_code: "" },
  });
  const [btnTxt, setBtnTxt] = useState("Copy");
  const modalRef: any = useRef(null);

  const [text, setText] = useState<string>("");
  const [length, setLength] = useState<number>(15);
  const [password, setPassword] = useState<string>("");
  const [isProtected, setIsProtected] = useState<boolean>(false);
  const [selfDestruct, setSelfDestruct] = useState<boolean>(false);
  const [viewsCount, setViewsCount] = useState<boolean>(false);

  const addToken = async (token: string) => {
    db.tokens
      .add({
        accessToken: token,
      })
      .then(() => {
        console.log("Token added to database.");
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const createText = () => {
    setLoading(true);
    const data = {
      text,
      length,
      password,
      isProtected,
      selfDestruct,
      viewsCount,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create`, data)
      .then((data) => {
        if (data.data.message === "Success") {
          if (viewsCount) {
            addToken(data.data.Text.accessToken);
          }
          setLoading(false);
          setData(data.data);
          setText("");
          modalRef?.current?.click();
          return;
        }
      });
  };

  const [showToast, setShowToast] = useState<boolean>(false);

  return (
    <div className="flex justify-center gap-10 lg:px-32 mt-10 flex-col lg:flex-row pb-10">
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info">
            <div>
              <span>
                Cannot enable view counts while self-destruct is active.
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="lg:w-[60%]">
        <textarea
          className="p-2 bg-transparent border-2 border-gray-900  w-full h-96 rounded-md"
          placeholder="Type here..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>

        <button
          className="btn my-4 lg:w-fit flex items-center lg:px-20 w-full disabled:cursor-not-allowed"
          onClick={createText}
          disabled={
            !text || length < 1 || (isProtected && !password) || loading
          }
        >
          {loading ? "Creating..." : "Create"}{" "}
          {loading && <p className="animate-bounce text-3xl">*</p>}
        </button>
      </div>
      <div className="lg:w-[30%] w-full">
        <h1 className="font-semibold text-xl mb-5">Options</h1>
        <div className="flex items-center gap-1 my-3">
          <p>Expire in</p>
          <input
            type="number"
            value={length}
            className="text-center w-10 rounded-md"
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <p>minutes</p>
        </div>
        <div className="w-full mt-5">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Password-protected</h2>
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={isProtected}
              onChange={() => setIsProtected(!isProtected)}
            />
          </div>
          {isProtected && (
            <input
              type="password"
              placeholder="Enter a password..."
              className="rounded-md my-3 w-full py-2 border-none outline-none pl-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </div>
        <div className="w-full mt-5">
          <div className="flex items-center gap-2">
            <div
              className="tooltip"
              data-tip="Text get automatically deleted after being viewed once."
            >
              <TbInfoHexagon />
            </div>
            <h2 className="font-semibold">Self-destruct</h2>
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={selfDestruct}
              onChange={() => {
                setSelfDestruct(!selfDestruct);
                if (viewsCount) {
                  setViewsCount(false);
                }
              }}
            />
          </div>
        </div>
        <div className="w-full mt-5">
          <div className="flex items-center gap-2">
            <div
              className="tooltip"
              data-tip="Enables you to see the number of views on your link."
            >
              <TbInfoHexagon />
            </div>
            <h2 className="font-semibold">Views count</h2>
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={viewsCount}
              onClick={() => {
                if (selfDestruct) {
                  setShowToast(true);
                  setTimeout(() => {
                    setShowToast(false);
                  }, 2500);
                }
              }}
              onChange={() => {
                if (!selfDestruct) {
                  setViewsCount(!viewsCount);
                }
              }}
            />
          </div>
        </div>
      </div>

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
