import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./comps/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewSnippet from "./pages/NewSnippet";
import EditSnippet from "./pages/EditSnippet";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new" element={<NewSnippet />} />
        <Route path="/edit/:id" element={<EditSnippet />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
