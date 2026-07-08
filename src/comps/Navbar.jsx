import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Navbar = ({ openSidebar, setOpenSidebar }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-black p-4 text-white">
      <div className="flex items-center gap-10 justify-between">
        {openSidebar ? (
          <IoClose
            className="text-xl cursor-pointer"
            onClick={() => setOpenSidebar(false)}
          />
        ) : (
          <IoMenu
            className="text-xl cursor-pointer"
            onClick={() => setOpenSidebar(true)}
          />
        )}
        <div className="flex items-center gap-2 justify-between">
          <img src="./favicon.jpeg" className="w-9 rounded-2xl" alt="" />
          <h1 className="text-xl font-bold">CopyIt</h1>
        </div>
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
