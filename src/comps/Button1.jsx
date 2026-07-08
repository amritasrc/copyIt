import React from "react";

const Button = ({ title }) => {
  return (
    <button className="bg-zinc-800 text-white flex flex-col items-center px-2 py-2 rounded-lg w-full hover:bg-zinc-950">
      {title}
    </button>
  );
};

export default Button;
