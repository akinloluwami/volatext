import React from "react";

async function getText(code: string) {
  const res = await fetch(`/api/${code}`);
  return res.json();
}

const TextPage = ({ params: { code } }: { params: { code: string } }) => {
  const textData = getText(code);

  return (
    <div className="my-4  flex-col flex items-center justify-center">
      <textarea
        className="p-2 bg-transparent border-2 border-gray-900 lg:w-1/2 w-full h-96 rounded-md"
        readOnly
      ></textarea>
      <button className="btn my-4 lg:w-fit lg:px-20 w-full disabled:cursor-not-allowed">
        Copy text
      </button>
    </div>
  );
};

export default TextPage;
