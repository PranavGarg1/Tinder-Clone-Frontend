import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <div className="text-center">Loading....</div>;
  }

  return (
    <div className="max-w-md my-10 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border border-gray-200">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={user.photoUrl}
            alt={`${user.firstName} ${user.lastName}`}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Software Development Engineer
          </div>
          <h1 className="block mt-1 text-lg leading-tight font-bold text-black">
            {user.firstName} {user.lastName}
          </h1>
          <p className="mt-2 text-slate-500">{user.about}</p>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900">Age</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span>{user.age}</span>
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="text-xs text-gray-400">
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
