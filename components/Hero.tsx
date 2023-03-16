import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="lg:px-24 lg:my-4 my-10 flex items-center">
      <div className="lg:w-1/2 w-full">
        <h1 className="lg:text-8xl text-6xl lg:text-left text-center font-semibold">
          Securely share texts online
        </h1>
        <p className="text-2xl my-4 lg:text-left text-center">
          Texts are encrypted in our database and automatically deleted after 15
          minutes.
        </p>
        <Link href={"/create"} className="hidden lg:block">
          <button className="btn text-xl">Type & Share</button>
        </Link>

        <center className="lg:hidden">
          <Link href={"/create"}>
            <button className="btn text-xl">Type & Share</button>
          </Link>
        </center>
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
