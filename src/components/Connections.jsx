import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-20">
        <h1 className="text-xl font-bold text-gray-500">No connections yet.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-10 p-4">
      <h1 className="text-3xl font-bold text-white mb-8">Your Connections</h1>

      <div className="w-full flex flex-col items-center gap-4">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, about, _id } = connection;

          return (
            <div
              key={_id}
              className="flex items-center bg-base-300 rounded-2xl overflow-hidden shadow-lg border border-white/5 w-full max-w-[50%] transition-transform hover:scale-[1.01]"
            >
              {/* Left Side: Image */}
              <div className="w-1/3 h-32 sm:h-40">
                <img
                  src={photoUrl || "https://via.placeholder.com/150"}
                  alt={firstName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side: Details */}
              <div className="w-2/3 p-4 flex flex-col justify-center">
                <h2 className="text-xl font-bold text-black truncate">
                  {firstName} {lastName}
                </h2>
                <p className="text-primary text-sm font-medium mb-1 truncate">
                  {about}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
