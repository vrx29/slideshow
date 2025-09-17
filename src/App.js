import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Shorts from './components/Shorts/Shorts';
import Drama from './components/Drama/Drama';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/drama" element={<Drama />} />
      </Routes>
    </>
  );
}

export default App;
