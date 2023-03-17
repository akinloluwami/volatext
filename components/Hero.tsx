"use client";

import Link from "next/link";
import React, { useState } from "react";

const Hero = () => {
  const [sharingCode, setSharingCode] = useState("");

  return (
    <div className="lg:px-10 lg:my-4 my-10 flex items-center">
      <div className="lg:w-1/2 w-full">
        <h1 className="lg:text-7xl text-6xl lg:text-left text-center font-semibold">
          Securely share texts online
        </h1>
        <p className="text-2xl my-4 lg:text-left text-center">
          Texts are encrypted in our database and automatically deleted after 15
          minutes.
        </p>

        <center className="lg:hidden">
          <Link href={"/create"}>
            <button className="btn text-xl">Type & Share</button>
          </Link>
        </center>
        <div className="flex flex-col">
          <Link href={"/create"} className="hidden lg:block w-fit">
            <button className="btn text-xl w-fit">Type & Share</button>
          </Link>
          <p className="my-3 lg:text-left text-center">Or</p>
          <div className="flex items-center gap-1">
            <input
              type="text"
              className="rounded-md pl-6 text-lg py-2 bg-transparent border-2"
              placeholder="Enter sharing code"
              maxLength={4}
              onChange={(e) => setSharingCode(e.target.value)}
            />
            <Link href={`${process.env.NEXT_PUBLIC_URL}/${sharingCode}`}>
              <button
                className="btn"
                disabled={sharingCode.length < 4 || sharingCode.length > 4}
              >
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 ml-20 hidden lg:block">
        <img
          className=""
          src="https://media3.giphy.com/media/fmkYSBlJt3XjNF6p9c/giphy.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
