import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import Gallery from './pages/gallery.jsx'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/gallery" element={<Gallery/>} />
      </Routes>
    </Router>
  );
}

export default App;