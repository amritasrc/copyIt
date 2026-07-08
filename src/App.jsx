import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./comps/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NewSnippet from "./pages/NewSnippet";
import EditSnippet from "./pages/EditSnippet";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new" element={<NewSnippet />} />
        <Route path="/edit/:id" element={<EditSnippet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;