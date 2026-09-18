import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateSnippet from "./pages/CreateSnippet";
import SnippetDetails from "./pages/SnippetDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateSnippet />} />
          <Route path="/snippets/:id" element={<SnippetDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;