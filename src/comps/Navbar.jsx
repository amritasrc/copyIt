import React from "react";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav className="bg-zinc-950 border-b border-zinc-700 px-6 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold text-zinc-50"
      >
        <img src="/favicon.jpeg" className="w-7 rounded-lg" alt="logo" />
        <span>CopyIt</span>
      </Link>
      <Link
        to="/create"
        className="flex items-center gap-1 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        <HiPlus />
        Create Snippet
      </Link>
    </nav>
  );
};

export default Navbar;
