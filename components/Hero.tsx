import React from "react";

const Hero = () => {
  return (
    <div className="px-24 my-4">
      <div className="w-1/2">
        <h1 className="text-8xl font-semibold">Securely share texts online</h1>
        <p className="font-semibold text-lg my-4">
          Texts are encrypted and in our database and automatically deleted
          after 15 minutes.
        </p>
        <button className="btn text-xl">Type & Share</button>
      </div>
      <div className="w-12"></div>
    </div>
  );
};

export default Hero;
