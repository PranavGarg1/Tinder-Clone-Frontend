import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addToFeed, clearFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeedData = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addToFeed(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);
  return (
    <div className="flex flex-wrap justify-center gap-6 p-8">
      {feed && feed.length > 0 ? (
        feed.map((item) => (
          <div key={item._id || item.id}>
            <UserCard userData={item} />
          </div>
        ))
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold">No users found.</h2>
          <p className="text-gray-500">Check back later for new profiles.</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
