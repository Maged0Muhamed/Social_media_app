import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import logo from "../assets/mego-logo.png";
import { categories } from "../utils/data";

const Sidebar = ({ user, closeToggle }) => {
  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
  const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in capitalize";
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <>
      <div className="min-w-210 h-full overflow-y-scroll bg-white flex flex-col justify-between  hide-scrollbar">
        <div className="flex flex-col">
          <Link
            className="flex px-5 gap-2 my-6 pt-1 w-190 items-center cursor-pointer"
            to="/"
            onClick={() => handleCloseSidebar}
          >
            <img className="w-28" src={logo} alt="" />
          </Link>
          <div className="flex flex-col gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={() => handleCloseSidebar}
            >
              <RiHomeFill />
              Home
            </NavLink>
            <h3 className="mt-2 px-5 text-base 2xl:text-xl">
              Discover Caregories
            </h3>
            {categories.slice(0, categories.length - 1).map((item, key) => (
              <NavLink
                key={item.name}
                to={`/category/${item.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={() => handleCloseSidebar}
              >
                <img
                  className="w-8 h-8 rounded-full shadow-sm "
                  src={item.image}
                  alt={item.name}
                />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        {user && (
          <Link
            to={`user-profile/${user._id}`}
            className="flex my-5 mb-3 gap-2 p-2 items-center bg-white shadow-lg  rounded-lg mx-3 "
            onClick={() => handleCloseSidebar}
          >
            <img
              src={user.image}
              alt="user-img"
              className="w-10 h-10 rounded_full"
            />
            <p>{user.userName}</p>
          </Link>
        )}
      </div>
    </>
  );
};

export default Sidebar;
