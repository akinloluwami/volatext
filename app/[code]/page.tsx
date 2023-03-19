"use client";

import copyToClipboard from "@/utils/copyToClipboard";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
async function getText(code: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${code}`, {
    cache: "no-store",
    next: { revalidate: 0 },
  });
  return res.json();
}

const TextPage = ({ params: { code } }: { params: { code: string } }) => {
  const [text, setText] = useState({ text: "", sharing_code: "", diff: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [btnTxt, setBtnTxt] = useState("Copy Text");
  const [password, setPassword] = useState<string>("");
  useEffect(() => {
    async function fetchData() {
      try {
        const textData = await getText(code);
        setText(textData);
        const { diff } = textData;
        if (diff > 0) {
          setTimeLeft(diff * 60);
        }
      } catch (error) {
        setText({ text: "", sharing_code: "", diff: 0 });
      }
      setIsLoading(false);
    }
    fetchData();
  }, [code]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  function formatTimeLeft() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}m${seconds}s`;
  }

  const decrypt = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/decrypt?code=${text.sharing_code}&password=${password}`
      )
      .then((data) => {
        console.log(data.data);
        setText({ ...text, text: data.data.text });
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="mt-10">
          <p className="text-center">Decrypting...</p>
          <h1 className="text-center font-bold text-[20rem] animate-pulse">
            *
          </h1>
        </div>
      ) : text.text ? (
        <div className="my-4 flex-col flex items-center justify-center">
          <div className="lg:w-1/2 w-full my-5 flex justify-between">
            <h2 className="text-left text-2xl">
              Sharing code -{" "}
              <span className="font-semibold">{text.sharing_code} </span>
            </h2>

            <p>Auto deleting in {formatTimeLeft()}</p>
          </div>
          <div className="mb-5 flex items-center flex-col justify-center">
            <h1 className="font-semibold 2xl text-center">
              This content is protected, enter the password to decrypt.
            </h1>
            <div className="flex gap-2 my-3">
              <input
                type="password"
                className="input border-2 border-gray-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn" onClick={decrypt}>
                Decrypt
              </button>
            </div>
          </div>
          <textarea
            className="p-2 bg-transparent border-2 border-gray-900 lg:w-1/2 w-full h-96 rounded-md"
            readOnly
            value={text.text}
          ></textarea>
          <button
            className="btn my-4 lg:w-fit lg:px-20 w-full disabled:cursor-not-allowed"
            onClick={() => {
              copyToClipboard(text.text);
              setBtnTxt("Copied!");
              setTimeout(() => {
                setBtnTxt("Copy Text");
              }, 1000);
            }}
          >
            {btnTxt}
          </button>
        </div>
      ) : (
        <div className="flex my-20 items-center justify-center w-full flex-col">
          <h1 className="font-semibold text-9xl text-center">404</h1>
          <p className="text-2xl text-center">
            No text exist with this sharing code.
          </p>
          <Link href={"/create"}>
            <button className="btn my-4 lg:w-fit lg:px-20 w-full disabled:cursor-not-allowed">
              Create new
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default TextPage;
