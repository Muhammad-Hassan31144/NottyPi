import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axiosInstance from "../../utils/axiosInstance";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Name is required");
      return;
      
    }
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    setError("");
    try {
      const resp = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      if (resp.data && resp.data.error) {
        setError(resp.data.message);
        return
      }
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
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <>
    
      <section className="flex justify-center items-center min-h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
          <form onSubmit={handleSignup} className="card-body">
          <h2 className="text-2xl font-semibold text-center">Signup</h2>
          <input
              type="text"
              name="text"
              id="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="input input-box flex items-center gap-2">
              <input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Signup
            </button>
            <p className="text-sm text-center mt-4">
              Already have an Account?{" "}
              <Link
                to="/login"
                className="text-blue-500 underline font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
      </>
  )
}

export default SignUp