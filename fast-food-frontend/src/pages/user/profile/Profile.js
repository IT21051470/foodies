/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import "./Profile.css";
import CreatePost from "../../../components/CreatePost";
import Post from "../../../components/Post";
import {
  deleteProfileById,
  getAllPost,
  getCurrentUser
} from "../../../util/APIUtils";
import { toast } from "react-toastify";
import { ACCESS_TOKEN } from "../../../constants";
import { useNavigate } from "react-router";
import EditUserModal from "../../../components/EditUserModal";

const Profile = ({ currentUser }) => {
  const [user, setUser] = useState(currentUser);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const refetchUser = async () => {
    try {
      const response = await getCurrentUser();
      if (!response) return;

      setUser(response);
    } catch (error) {
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  const fetchAllPost = useCallback(async () => {
    try {
      const response = await getAllPost();
      if (!response.length) return;

      setPosts(response.reverse().filter(post => post.userId === user.id));
    } catch (error) {
      toast("Oops something went wrong!", { type: "error" });
    }
  }, [user.id]);

  useEffect(() => {
    fetchAllPost();
  }, [fetchAllPost]);

  const editProfile = async () => {
    setOpen(true);
  };

  const deleteProfile = async () => {
    try {
      const response = await deleteProfileById(user.id);
      if (response != null) {
        toast("profile remove successfully", { type: "success" });
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = "/login";
      }
    } catch (error) {
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  const handleSharedPosts = () => {
    navigate("/shared");
  };

  return (
    <>
     <header aria-label="Page Header" className="bg-gray-800 ">


  


  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-between">
    <div className="flex items-center">
      <a href="#" className="block shrink-0">
        <span className="sr-only">Profile</span>
        <img
          alt={user.name}
          src={user.imageUrl}
          className="h-100 w-100 mb-2 rounded-full object-cover"
        />
      </a>
      <div className="ml-4">
        <h1 className="text-2xl font-bold text-gray-100 sm:text-3xl">
          Welcome Back, {user.name}
        </h1>
        <p className="mt-1.5 text-sm text-gray-200">{user.email}</p>
      </div>
    </div>

    <div className="flex flex-col items-end justify-center">
      <div className="relative mb-2">
        <div
          onClick={handleSharedPosts}
          className="rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-100 bg-green-700"
        >
          Shared Posts
        </div>
      </div>

      <div className="relative mb-2">
        <div
          onClick={editProfile}
          className="rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-100 bg-orange-600"
        >
          &nbsp;   Edit Profile    &nbsp; 
        </div>
      </div>

      <div className="relative">
        <div
          onClick={deleteProfile}
          className="rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-100 bg-red-700"
        >
          Delete Profile
        </div>
      </div>
    </div>
  </div>
</header>


    
<div className="home-container bg-gray-900">

        <div className="container">
          <CreatePost currentUser={user} refetchPosts={fetchAllPost} />

          {posts.map(post => (
            <Post
              key={post.id}
              currentUser={user}
              refetchPosts={fetchAllPost}
              {...post}
            />
          ))}
        </div>
      </div>

      <EditUserModal
        open={open}
        setOpen={setOpen}
        currentUser={user}
        refetchUser={refetchUser}
      />
    </>
  );
};

export default Profile;
