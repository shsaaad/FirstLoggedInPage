import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);

    // Reset Login Success
    setSuccess("");
    // Reset Password Error
    setPasswordError("");
    // Password Validation
    if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError("At least one upper case");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError("At least one lower case");
      return;
    } else if (!/(?=.*?[!@#\$&*~])/.test(password)) {
      setPasswordError("At least one Special character");
      return;
    } else if (!/(?=.*[0-9])/.test(password)) {
      setPasswordError("At least one number");
      return;
    } else if (password.length < 8) {
      setPasswordError("At least 8digit character");
      return;
    }

    // Firebase Email Logged IN
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setSuccess("User Login Successfully");
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setPasswordError(errorMessage);
        setSuccess("");
      });
  };
  
  // showHidePassword
  const showHidePassword = () => {
    const x = document.getElementById("show-hide-password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-full md:w-1/2 max-w-sm bg-white rounded-lg shadow-md p-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold  text-center mb-6">Login</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm  text-center font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm text-center font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="password"
            id="show-hide-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center my-2 flex-row">
            <input
              type="checkbox"
              className="text-sm text-red-500"
              name=""
              onClick={showHidePassword}
            />
            <label htmlFor="" className="ml-1 text-sm">
              Show Password
            </label>
          </div>
        </div>

        {/* Warring Of Login  */}
        {passwordError && (
          <p className="text-red-500 text-sm my-1">{passwordError}</p>
        )}
        {success && <p className="text-green-500 text-sm my-1">{success}</p>}

        {/* Reset Password  */}
        <p className="my-2 text-start">
          <Link to="/reset-password" className="text-black text-sm">
            Forget Password
          </Link>
        </p>
        {/* Users  */}
        <p className="my-2 text-start">
          <Link to="/register" className="text-black text-sm">
            New in our Service?
          </Link>
        </p>

        <button
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
