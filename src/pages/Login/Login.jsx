import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
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
    if (email) {
      setError(
        "Please enter an email address"
      );
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    setError("");
    //login api call
  };
  return (
    <>
      <Navbar />
      <section className="flex items-center justify-between mt-28">
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
