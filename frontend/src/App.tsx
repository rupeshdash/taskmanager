import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";

const App = () => {
  return (
    <Router>
      <div>
        {/* <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white">Landing</Link>
            </li>
            <li>
              <Link to="/login" className="text-white">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="text-white">Sign Up</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App