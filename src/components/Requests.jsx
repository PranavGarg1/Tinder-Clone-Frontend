import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      setRequests(res.data?.data || []);
      //   console.log(requests);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review" + "/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== _id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-xl font-semibold p-20">No pending requests</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Connection Requests
      </h1>
      <div className="space-y-4">
        {requests.map((request) => {
          const sender = request.fromUserId;

          if (!sender) {
            return (
              <div key={request._id} className="p-4 bg-error/20 rounded-lg">
                <p className="text-sm">
                  Request data corrupted (Missing User Info)
                </p>
              </div>
            );
          }

          return (
            <div
              key={request._id}
              className="flex items-center justify-between p-5 bg-base-300 rounded-xl shadow-md border border-base-100"
            >
              <div className="flex items-center gap-6">
                <img
                  src={sender.photoUrl || "https://via.placeholder.com/150"}
                  alt={sender.firstName}
                  className="w-16 h-16 rounded-full border-2 border-primary object-cover"
                />
                <div>
                  <h2 className="text-lg font-bold">
                    {sender.firstName} {sender.lastName}
                  </h2>
                  <p className="italic text-gray-400">{sender.about}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="btn btn-sm btn-success px-6 border rounded-md bg-green-500 text-white"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error px-6 border rounded-md bg-red-500 text-white"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Ignore
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
