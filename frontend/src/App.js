import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage, About, Contact, PageNotFound, Policy } from "./pages/index";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import ForgetPass from "./pages/Auth/ForgetPass";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/About" element={<About></About>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route
        path="/forget-password"
        element={<ForgetPass></ForgetPass>}
      ></Route>
      <Route path="/contact" element={<Contact></Contact>}></Route>
      <Route path="/policy" element={<Policy></Policy>}></Route>
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile></Profile>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard></Dashboard>
          </ProtectedRoute>
        }
      ></Route>
      <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
    </Routes>
  );
}

export default App;
