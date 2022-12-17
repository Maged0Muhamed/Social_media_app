import React, { useEffect, useState, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Route, Routes, Link } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/mego-logo.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [userDb, setUserDb] = useState(null);
  const scrollRef = useRef(null);
  //User Info From LocalStorage
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    // console.log(query);
    client.fetch(query).then((data) => {
      // console.log(data);
      setUserDb(data[0]);
      // console.log(userDb);
    });
  }, []);
  console.log(userDb);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="flex md:flex-row flex-col bg-gray-50 w-full h-screen transition-height duration-75 ease-out ">
        {/*  Sidebar for Meduim screen & above*/}
        <div className=" h-screen hidden md:flex flex-initial bg-black/70 ">
          <Sidebar user={userDb && userDb} closeToggle={setToggleSidebar} />
        </div>
        {/* Sidebar for small screen under meduim screens*/}
        <div className="flex flex-row md:hidden ">
          <div className="w-full flex flex-row justify-between items-center shadow-md p-2">
            <HiMenu
              fontSize={40}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(true)}
            />
            <Link to="/">
              <img src={logo} alt="logo" className="w-24" />
            </Link>
            <Link to={`user-profile/${userDb?._id}`}>
              <img src={userDb?.image} alt="logo" className="w-28" />
            </Link>
          </div>
          {/* Toggle Sidebar  */}
          {toggleSidebar && (
            <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute w-full flex justify-end  items-center p-2">
                <AiFillCloseCircle
                  className="cursor-pointer"
                  fontSize={40}
                  onClick={() => setToggleSidebar(false)}
                />
              </div>
              <Sidebar user={userDb && userDb} closeToggle={setToggleSidebar} />
            </div>
          )}
        </div>
        <div className="h-screen pb-2 flex-1 overflow-y-scroll" ref={scrollRef}>
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/*" element={<Pins user={userDb && userDb} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
