import React from "react";
import { UserPlus, UserMinus, Mail, Info } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserProfile = ({ userData }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
        dispatch(removeUserFromFeed(userId)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
        <div className="card w-full max-w-2xl bg-base-100 shadow-xl border border-gray-200 p-10 text-center">
          <Info size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">No User Data</h2>
          <p className="text-gray-500 mt-2">Could not load the user profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl border border-gray-200 overflow-hidden">
        <figure className="relative h-96 w-full">
          <img
            src={userData.photoUrl}
            alt={`${userData.firstName} ${userData.lastName}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-6 left-8 text-white z-10">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {userData.firstName} {userData.lastName}
            </h1>
          </div>
        </figure>

        <div className="border border-gray-100 p-5 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-100 pb-2">
            About
          </h3>
          <p className="text-gray-600 leading-relaxed text-md">
            {userData.about || "No details provided."}
          </p>
        </div>
        <div className="border border-gray-100 p-5 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-100 pb-2">
            Age : {userData.age || "No details provided."}
          </h3>
        </div>

        <div className="flex">
          <button
            className="btn btn-primary flex-1 text-lg font-semibold text-white bg-green-600 gap-2 h-14 m-5 rounded-lg px-1"
            onClick={() => handleSendRequest("interested", userData._id)}
          >
            <UserPlus size={22} />
            Interested
          </button>
          <button
            className="btn btn-primary flex-1 text-lg font-semibold text-white bg-red-800 gap-2 h-14 m-5 rounded-lg px-1"
            onClick={() => handleSendRequest("ignored", userData._id)}
          >
            <UserPlus size={22} />
            Not Intersted
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
