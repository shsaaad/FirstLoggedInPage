import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });

    alert("Password Reset Mail Sent")
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
