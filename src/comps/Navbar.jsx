import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-zinc-950 p-4 text-white">
      <div className="flex items-center gap-2 justify-between">
        <img src="./favicon.jpeg" className="w-9" alt="" />
        <h1 className="text-xl font-bold">CopyIt</h1>
      </div>

      <div className="flex gap-6">
        <Link to="/">Dashboard</Link>
        <Link to="/new">New Snippet</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;