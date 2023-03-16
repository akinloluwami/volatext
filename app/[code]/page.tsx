"use client";

import copyToClipboard from "@/utils/copyToClipboard";
import Link from "next/link";
import React, { useState, useEffect } from "react";

async function getText(code: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${code}`, {
    cache: "no-store",
    next: { revalidate: 0 },
  });
  return res.json();
}

const TextPage = ({ params: { code } }: { params: { code: string } }) => {
  const [text, setText] = useState({ text: "", sharing_code: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const textData = await getText(code);
        setText(textData);
      } catch (error) {
        setText({ text: "", sharing_code: "" });
      }
      setIsLoading(false);
    }
    fetchData();
  }, [code]);

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
          <div className="lg:w-1/2 w-full my-5">
            <h2 className="text-left text-2xl">
              Sharing code -{" "}
              <span className="font-semibold">{text.sharing_code} </span>
            </h2>
          </div>
          <textarea
            className="p-2 bg-transparent border-2 border-gray-900 lg:w-1/2 w-full h-96 rounded-md"
            readOnly
            value={text.text}
          ></textarea>
          <button
            className="btn my-4 lg:w-fit lg:px-20 w-full disabled:cursor-not-allowed"
            onClick={() => copyToClipboard(text.text)}
          >
            Copy text
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
