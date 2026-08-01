import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn"; 

const Navbar = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Snippets",
      slug: "/snippets",
      active: authStatus,
    },
    {
      name: "Create Snippet",
      slug: "/create",
      active: authStatus,
    },
    {
      name: "Edit Snippet",
      slug: "/edit",
      active: authStatus
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <header className="bg-zinc-950 py-3 text-zinc-50 shadow-md">
      <nav className="flex items-center px-4">
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/favicon.jpeg"
              alt="CopyIt Logo"
              className="h-10 w-10 rounded-xl"
            />
            <span className="text-xl font-bold">CopyIt</span>
          </Link>
        </div>

        {/* Navigation */}
        <ul className="ml-auto flex items-center gap-2">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="rounded-lg px-4 py-2 transition hover:bg-zinc-800"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}

          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;