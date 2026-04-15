import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          about,
        },
        { withCredentials: true },
      );
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setPhotoUrl(userData.photoUrl || "");
      setAge(userData.age || 0);
      setAbout(userData.about || "");
    }
  }, [userData]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                Age
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                About
              </label>
              <textarea
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-10 resize-none"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors duration-200 mt-2"
            >
              Save Changes
            </button>
          </form>
          {showToast && (
            <div className="text-center m-5 bg-green-400">
              Data added successufully
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
