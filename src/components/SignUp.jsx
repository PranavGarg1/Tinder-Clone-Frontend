import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [bio, setBio] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    // e.preventDefault();

    // 1. Unified Data Object
    const signupData = {
      firstName,
      lastName,
      email,
      password,
      age: Number(age),
      photoUrl,
      about,
    };

    try {
      const res = await axios.post(`${BASE_URL}/signup`, signupData, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-500 to-orange-400 p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="bg-gradient-to-r from-rose-500 to-orange-400 p-3 rounded-2xl shadow-lg mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400 italic uppercase tracking-tighter">
              Tinder
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">
              Create Account
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-rose-400 transition-all font-medium text-slate-700"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-rose-400 transition-all font-medium text-slate-700"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                Email
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-rose-400 transition-all font-medium text-slate-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password & Age Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-rose-400 transition-all font-medium text-slate-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="21"
                  className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-rose-400 transition-all font-medium text-slate-700"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                Photo URL
              </label>
              <input
                type="text"
                placeholder="https://images.com/profile.jpg"
                className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-rose-400 transition-all font-medium text-slate-700"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            {/* About Section */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
                About
              </label>
              <textarea
                placeholder="I am..."
                className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-rose-400 transition-all font-medium text-slate-700 resize-none"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-orange-400 text-white font-black py-4 rounded-full shadow-xl shadow-rose-200 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg uppercase tracking-widest mt-4"
            >
              Start Swiping
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm font-semibold">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-rose-500 cursor-pointer hover:underline font-bold"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
