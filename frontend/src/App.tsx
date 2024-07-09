import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import TaskWrapper from "./components/taskComponent/TaskWrapper";
import TeamsWrapper from "./components/teamCompoenent/TeamsWrapper";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/teams" element={<TeamsWrapper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tasks" element={<TaskWrapper />} />
        </Routes>
    </Router>
  );
};

export default App;
