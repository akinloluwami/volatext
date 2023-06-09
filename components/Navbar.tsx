import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="lg:px-8 px-5 w-full py-5 flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="text-xl font-semibold">Volatext</h1>
      </Link>
      {/* <button className="btn">Moon</button> */}
    </div>
  );
};

export default Navbar;
