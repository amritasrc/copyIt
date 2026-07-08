import { FaHome, FaHeart, FaClock, FaTrash } from "react-icons/fa";
import { MdCollections } from "react-icons/md";

const menuItems = [
  { icon: <FaHome />, label: "All snippets" },
  { icon: <MdCollections />, label: "Collections" },
  { icon: <FaHeart />, label: "Favorites" },
  { icon: <FaClock />, label: "Recent" },
  { icon: <FaTrash />, label: "Trash" },
];

const Sidebar = ({ open }) => {
  if (!open) return null;

  return (
    <aside className="w-65 bg-black h-screen fixed top-0 pt-16 z-40 overflow-y-auto">
      <div className="flex items-center justify-between p-5 border-b border-zinc-700 text-zinc-200">
        <p className="text-zinc-400">Organize your snippets</p>
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
  );
};

export default Sidebar;
