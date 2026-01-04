import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp></SignUp>}></Route>
      <Route path="/signIn" element={<SignIn></SignIn>}></Route>
      <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
    </Routes>
  );
}

export default App;
