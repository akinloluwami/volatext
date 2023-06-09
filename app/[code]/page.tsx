"use client";

import copyToClipboard from "@/utils/copyToClipboard";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";

async function getText(code: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${code}?accessToken=${token || ""}`,
    {
      cache: "no-store",
      next: { revalidate: 0 },
    }
  );

  return res.json();
}

const TextPage = ({ params: { code } }: { params: { code: string } }) => {
  const [text, setText] = useState({
    text: "",
    sharing_code: "",
    diff: 0,
    isProtected: false,
    views: 0,
    viewsCount: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [btnTxt, setBtnTxt] = useState<string>("Copy Text");
  const [password, setPassword] = useState<string>("");
  const [decrypting, setDecrypting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [count, setCount] = useState();
  const [isOwner, setIsOwner] = useState<boolean>();

  useEffect(() => {
    async function fetchData() {
      try {
        const getToken = () => {
          if (localStorage.getItem("tokens")) {
            const tkn = JSON.parse(
              localStorage.getItem("tokens") ?? "[]"
            ) as [];
            const rr: any = tkn.filter(
              (t: { code: string; token: string }) => t.code === code
            );
            if (rr.length > 0) {
              return rr[0].token;
            }
          }
          return "";
        };
        const textData = await getText(code, getToken());
        setText(textData);
        setCount(textData.viewsCount);
        setIsOwner(textData.isOwner);
        if (!textData.isOwner) {
          axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/count?code=${code}`
          );
        }
        const { diff } = textData;
        if (diff > 0) {
          setTimeLeft(diff * 60);
        }
      } catch (error) {
        setText({
          text: "",
          sharing_code: "",
          diff: 0,
          isProtected: false,
          views: 0,
          viewsCount: false,
        });
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
    setDecrypting(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/decrypt?code=${text.sharing_code}&password=${password}`
      )
      .then((data) => {
        setDecrypting(false);
        setText({ ...text, text: data.data.text, isProtected: false });
      })
      .catch((error) => {
        setDecrypting(false);
        setError(error.response.data.message);
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
        <div className="my-4 flex-col flex items-center justify-center relative">
          <div className="lg:w-1/2 w-full my-5 flex justify-between">
            <h2 className="text-left lg:text-2xl text-lg">
              Sharing code -{" "}
              <span className="font-semibold">{text.sharing_code} </span>
            </h2>

            <p className="flex items-center gap-1">
              <FaRegTrashAlt /> {formatTimeLeft()}
            </p>
          </div>
          {text.isProtected && (
            <div className="mb-5 flex items-center flex-col justify-center">
              <h1 className="font-semibold 2xl text-center">
                This content is protected, enter the password to decrypt.
              </h1>
              {error && !decrypting && (
                <h2 className="my-3 font-semibold text-red-600">{error}</h2>
              )}
              <div className="flex gap-2 my-3">
                <input
                  type="password"
                  className="input border-2 border-gray-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn" onClick={decrypt}>
                  {decrypting ? "Decrypting..." : "Decrypt"}{" "}
                  {decrypting && <p className="animate-bounce text-3xl">*</p>}
                </button>
              </div>
            </div>
          )}
          {isOwner && text.viewsCount && (
            <button className="btn absolute lg:right-20 right-0 -top-10">
              {text.views} {text.views === 1 ? "view" : "views"}
            </button>
          )}
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
