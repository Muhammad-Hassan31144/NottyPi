import SignUp from "./pages/SignUp/SignUp"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import { PiPushPinBold, PiPushPinSlashBold } from "react-icons/pi";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

const App = () => {
  const [theme, setTheme] = useState("light");

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "synthwave" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}




export default App