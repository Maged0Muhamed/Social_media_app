// import { GoogleLogin } from "react-google-login";
// import GoogleLogin from "react-google-login";
// import { FcGoogle, FcShare } from "react-icons/fc";
import React from "react";
import { useNavigate } from "react-router-dom";
import loginVideo from "../assets/share.mp4";
import logo from "../assets/mego-logo.png";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { client } from "../client";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    const { name, picture, sub } = userObject;
    const doc = { _id: sub, _type: "user", userName: name, image: picture };
    localStorage.setItem("user", JSON.stringify(userObject));
    setUser(userObject);
    // console.log(userObject);
    document.getElementById("signInDiv").hidden = true;
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
    navigate("/login");
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      //PLEASE MAKE AN ENV VARIABLE FOR CLIENT ID
      client_id: `${process.env.REACT_APP_GOOGLE_API_TOKEN}`, // "*********PLACE YOUR ********* GOOGLE CLIENT ID********* HERE*********",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div className="maindev flex justify-start items-center flex-col h-screen w-full">
        <div className="content relative w-full h-full ">
          <video
            className=" w-full h-full object-cover"
            src={loginVideo}
            autoPlay
            muted
            type="video/mp4"
            loop
            controls={false}
          />
          <div className="overlay absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black/50 z-10 ">
            <div className="p-5  flex justify-center items-center flex-col ">
              <img src={logo} width="130px" alt="logo" />
              <div className="shadow-2xl mt-3 ">
                {/* Google Icon */}
                <div id="signInDiv"></div>
                {Object.keys(user).length !== 0 && (
                  <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
                )}
                {/* Profile Info  */}
                {user && (
                  <div>
                    <img src={user.picture} alt=""></img>
                    <h3>{user.name}</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
