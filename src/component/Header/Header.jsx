import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h3 className="text-2xl">name</h3>
      </div>
      <div className="gap-7 flex">
        <Link className="text-black" to={"/"}>Home</Link>
        <Link className="text-black" to={"/login"}>Login</Link>
        <Link className="text-black" to={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default Header;
