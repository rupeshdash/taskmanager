import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import TaskWrapper from "./components/taskComponent/TaskWrapper";
import TeamsWrapper from "./components/teamCompoenent/TeamsWrapper";
import { Provider } from "react-redux";
import store from "./Redux/store";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import PublicRoute from "./components/authentication/PublicRoute";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public routes */}

          <Route element={<PublicRoute restricted={true} />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="teams" element={<TeamsWrapper />} />
            <Route path="tasks" element={<TaskWrapper />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
