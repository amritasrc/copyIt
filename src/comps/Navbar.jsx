import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="py-3 bg-zinc-950 text-zinc-50">
      <nav className="flex">
        <div className="ml-5">
          <Link to="/" className="flex items-center gap-2">
            <img src="/favicon.jpeg" className="w-10 rounded-xl" alt="" />
            <span className="font-semibold">CopyIt</span>
          </Link>
        </div>

        <ul></ul>
      </nav>
    </header>
  );
};

export default Navbar;
