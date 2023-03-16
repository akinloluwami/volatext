import copyToClipboard from "@/utils/copyToClipboard";
import React from "react";

const DynamicButton = ({ text }: { text: string }) => {
  return (
    <button
      className="btn my-4 lg:w-fit lg:px-20 w-full disabled:cursor-not-allowed"
      onClick={() => {
        copyToClipboard(text);
      }}
    >
      Copy text
    </button>
  );
};

export default DynamicButton;
