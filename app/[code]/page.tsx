import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
const DynamicButton = dynamic(() => import("../../components/DynamicButton"));

async function getText(code: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${code}`);
  return res.json();
}

const TextPage = async ({ params: { code } }: { params: { code: string } }) => {
  const textData = getText(code);
  const [text] = await Promise.all([textData]);
  return (
    <>
      {text.text ? (
        <div className="my-4  flex-col flex items-center justify-center">
          <textarea
            className="p-2 bg-transparent border-2 border-gray-900 lg:w-1/2 w-full h-96 rounded-md"
            readOnly
            value={text.text}
          ></textarea>
        </div>
      ) : (
        <div className="flex my-20 items-center justify-center w-full flex-col">
          <h1 className="font-semibold text-9xl text-center">404</h1>
          <p className="text-2xl">No text exist with this sharing code.</p>
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
