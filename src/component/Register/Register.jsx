import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import app from "../../Firebase/firebase.init";

const auth = getAuth(app);
const Register = () => {
  // useState Email
  const [email, setEmail] = useState();
  // useState Password
  const [regPassword, setPassword] = useState();
  // useState Success
  const [success, setSuccess] = useState();
  // useState Error
  const [error, setError] = useState();

  // Handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    // Validation
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("At least one upper case");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setError("At least one lower case");
      return;
    } else if (!/(?=.*?[!@#\$&*~])/.test(password)) {
      setError("At least one Special character");
      return;
    } else if (!/(?=.*[0-9])/.test(password)) {
      setError("At least one number");
      return;
    } else if (password.length < 8) {
      setError("At least 8digit character");
      return;
    }

    // create user with Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        event.target.reset();
        setSuccess("User Register Successfully");
        emailVerify(email);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
        setSuccess("");
      });

    // Email Verification
    const emailVerify = (email) => {
      sendEmailVerification(auth.currentUser)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          const verifyErrorMessage = error.message;
          console.log(verifyErrorMessage);
          alert(verifyErrorMessage);
        });
    };
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

  // Email Change Handler
  const handleChangeEmail = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };

  // Password Change Handler
  const handlePasswordBlur = (event) => {
    // console.log(event.target.value);
    // setPassword(event.target.value);
  };

  return (
    <div className="text-center">
      <div className="flex justify-center items-center h-screen">
        <form
          className="w-96 m-auto bg-white rounded-lg shadow-md p-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              name="email"
              id="email"
              onChange={handleChangeEmail}
              required
            />
          </div>
          <div className="">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              name="password"
              id="show-hide-password"
              onBlur={handlePasswordBlur}
              required
            />
          </div>
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

          {/* Warring Info  */}
          {error && <p className="text-red-500 text-sm my-1">{error}</p>}
          {success && <p className="text-green-600 text-sm my-1">{success}</p>}

          <p className="my-2 text-start">
            <Link to="/login" className="text-black text-sm">
              Already have account?
            </Link>
          </p>

          <button
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
