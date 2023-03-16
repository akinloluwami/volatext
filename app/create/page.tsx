import React from "react";

const Create = () => {
  return (
    <div className="my-4  flex-col flex items-center justify-center">
      <textarea
        className="p-2 bg-transparent border-2 border-gray-900 w-1/2 h-96 rounded-md"
        placeholder="Type here..."
      ></textarea>
      <button className="btn my-4">Create</button>
    </div>
  );
};

export default Create;
