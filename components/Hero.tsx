import React from "react";

const Hero = () => {
  return (
    <div className="px-24 my-4 flex items-center">
      <div className="w-1/2">
        <h1 className="text-8xl font-semibold">Securely share texts online</h1>
        <p className="font-semibold text-lg my-4">
          Texts are encrypted and in our database and automatically deleted
          after 15 minutes.
        </p>
        <button className="btn text-xl">Type & Share</button>
      </div>
      <div className="w-1/2 ml-20">
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
