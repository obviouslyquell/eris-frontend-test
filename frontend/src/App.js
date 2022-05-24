import './App.scss';
import { Routes, Route } from 'react-router-dom';
import History from './pages/History';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
