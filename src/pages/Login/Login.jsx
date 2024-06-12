import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      setError(
        "Please enter an email address"
      );
      return;
    }
    if(email && email !== emailRegex) {
      setError("Please enter a valid email address")
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 10) {
      setError("Password must be at least 10 characters long");
      return;
    }
    setError("");
    //login api call
    try {
      const resp = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      if (resp.data && resp.data.accessToken) {
        localStorage.setItem("token", resp.data.accessToken);
        navigate("/");
        
      }
    } catch (error) { 
       if (error.response && error.response.data && error.response.data.message) {
         setError(error.response.data.message)
        
       } 
       else {
         setError("Something went wrong! Please try again later")
       }
    }
  };
  return (
    <>
      {/* <Navbar /> */}
      <section className="flex justify-center items-center min-h-screen ">
        <div className="card w-96 bg-base-100 shadow-xl">
          <form onSubmit={handleLogin} className="card-body">
            <h2 className="text-2xl font-semibold text-center">Login</h2>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={handleEmailChange}
            />

            <label className="input input-box flex items-center gap-2">
              <input
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="grow "
              />
              {showPassword ? (
              <FaRegEye className="cursor-pointer text-primary
              " size={22} onClick={() => toggleShowPassword()}/>

              ) : (

               <FaRegEyeSlash  className="cursor-pointer" size={22} onClick={() => toggleShowPassword()}/> 
              )}
              
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="btn btn-primary" type="submit">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not registred yet?{" "}
              <Link
                to="/signup"
                className="text-blue-500 underline font-medium"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
