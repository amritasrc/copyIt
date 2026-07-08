import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <h1 className="text-xl font-bold">CopyIt</h1>

      <div className="flex gap-6">
        <Link to="/">Dashboard</Link>
        <Link to="/new">New Snippet</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;