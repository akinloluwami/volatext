import React from "react";

const TextPage = () => {
  return (
    <div className="my-4  flex-col flex items-center justify-center">
      <textarea
        className="p-2 bg-transparent border-2 border-gray-900 lg:w-1/2 w-full h-96 rounded-md"
        placeholder="Type here..."
        // onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="btn my-4 lg:w-fit lg:px-20 w-full disabled:cursor-not-allowed"
        // onClick={createText}
        // disabled={!text}
      >
        Copy text
      </button>
    </div>
  );
};

export default TextPage;
