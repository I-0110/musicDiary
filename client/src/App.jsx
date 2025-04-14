import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';

// importing static components
import Header from './components/Header';
// importing pages
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
        <Header className="header" />
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>

        {/* <Footer /> */}
    </Router>  
  );
};

