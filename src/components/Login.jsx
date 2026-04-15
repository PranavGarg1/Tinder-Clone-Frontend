import React, { useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const LoginPage = () => {
  const [email, setEmail] = useState("pranav@gmail.com");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-gradient-to-r from-rose-500 to-orange-400 p-3 rounded-full mb-4 shadow-lg">
            <Heart size={48} className="text-white fill-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Tinder Clone
          </h1>
          <p className="text-gray-500 mt-2">Find your perfect match</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-rose-200 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="font-bold text-rose-500 cursor-pointer hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
