import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateSnippet from "./pages/CreateSnippet";
import SnippetDetails from "./pages/SnippetDetails";
import EditSnippet from "./pages/EditSnippet";
import Snippets from "./pages/Snippets";
import Favorites from "./pages/Favorites";
import SharedSnippet from "./pages/SharedSnippet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/share/:shareId" element={<SharedSnippet />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateSnippet />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/snippets/:id" element={<SnippetDetails />} />
          <Route path="/snippets/:id/edit" element={<EditSnippet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;