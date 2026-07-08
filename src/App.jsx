import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./comps/Navbar";
import Sidebar from "./comps/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewSnippet from "./pages/NewSnippet";
import EditSnippet from "./pages/EditSnippet";

const AUTH_ROUTES = ["/login", "/signup"];

const AppLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const location = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {!isAuthPage && <Sidebar open={openSidebar} />}
        <main className={`flex-1 p-6 pt-16 ${!isAuthPage && openSidebar ? "pl-65" : ""} overflow-y-auto`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/new" element={<NewSnippet />} />
            <Route path="/edit/:id" element={<EditSnippet />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
