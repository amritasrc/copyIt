import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './comps/Navbar';
import Home from './pages/Home';
import CreateSnippet from './pages/CreateSnippet';
import ViewSnippet from './pages/ViewSnippet';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <Navbar />
        <main className="flex-1 bg-">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateSnippet />} />
            <Route path="/snippet/:id" element={<ViewSnippet />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App