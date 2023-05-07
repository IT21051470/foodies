import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import {FiUsers} from "react-icons/fi";

const AppHeader = ({ authenticated, onLogout }) => {
  return (
    <header className="bg-yellow-300 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-8 py-7 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2 hover:text-black">
  <FaUtensils className="text-2xl" />
  <span className="text-lg font-bold">Foodies</span>
</Link>

        <nav className="flex items-center space-x-4">
          {authenticated ? (
            <>
              <NavLink
                to="/users"
                className="flex items-center space-x-2"
                activeClassName="bg-purple-700 rounded-md"
              >
                <FiUsers className="text-lg" />
                <span>Users</span>
              </NavLink>
              <NavLink
                to="/profile"
                className="flex items-center space-x-2"
                activeClassName="bg-purple-700 rounded-md"
              >
                <IoPersonCircleOutline className="text-lg" />
                <span>Profile</span>
              </NavLink>
              <button className="flex items-center space-x-2" onClick={onLogout}>
                <RiLogoutBoxRLine className="text-lg" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
             <NavLink
  to="/login"
  className="font-medium hover:text-black"
  activeClassName="bg-purple-700 rounded-md"
>
                <b>
                Log in
                </b>
              </NavLink>
             <NavLink
  to="/signup"
  className="font-medium hover:text-black"
  activeClassName="bg-purple-700 rounded-md"
>

                 <b>
                Sign up
                </b>
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
