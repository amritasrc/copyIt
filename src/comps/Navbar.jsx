import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaHome, FaHeart, FaClock, FaTrash } from "react-icons/fa";
import { MdCollections } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  const menuItems = [
    { icon: <FaHome />, label: "All snippets" },
    { icon: <MdCollections />, label: "Collections" },
    { icon: <FaHeart />, label: "Favorites" },
    { icon: <FaClock />, label: "Recent" },
    { icon: <FaTrash />, label: "Trash" },
  ];
  return (
    <>
      <nav className="flex items-center justify-between bg-black p-4 text-white">
        <div className="flex items-center gap-10 justify-between">
          {openSidebar ? (
            <IoClose
              className="text-xl"
              onClick={() => setOpenSidebar(false)}
            />
          ) : (
            <IoMenu className="text-xl" onClick={() => setOpenSidebar(true)} />
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
      <div>
        {openSidebar ? (
          <aside className="h-screen w-65 bg-black z-50">
            <div className="flex items-center justify-between p-5 border-b text-zinc-200">
              <div>
                <p className="text-zinc-400">Organize your snippets</p>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-100 hover:bg-purple-500 rounded-lg transition-all duration-400 cursor-pointer"
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </aside>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default Navbar;
