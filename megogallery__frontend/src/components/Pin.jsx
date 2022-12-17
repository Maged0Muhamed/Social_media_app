import React, { useState } from "react";
import { urlFor } from "../client";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowDownRightCircleFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { client } from "./../client";
const Pin = ({ pin }) => {
  const [postedHover, setPostedHover] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const { postedBy, image, _id, destination } = pin;
  const navigate = useNavigate();
  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  // console.log(pin);
  let alreadySaved = pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.sub
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.sub,
            postedBy: {
              _type: "postedBy",
              _ref: user?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };
  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };
  return (
    <>
      <div className="m-2">
        <div
          onMouseEnter={() => setPostedHover(true)}
          onMouseLeave={() => setPostedHover(false)}
          onClick={() => navigate(`/pin-detail/${_id}`)}
          className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        >
          <img
            className="rounded-lg w-full"
            src={urlFor(image).width(250).url()}
            alt="pinImage"
          />
          {postedHover && (
            <div
              style={{ height: "100%" }}
              className="overlay absolute top-0 left-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 "
            >
              <div className="icons flex justify-between items-center ">
                <div className="flex gap-2">
                  <a
                    className="flex justify-center items-center text-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none  bg-white rounded-full w-9 h-9 "
                    href={`${image?.asset?.url}?dl=`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <MdDownloadForOffline />
                  </a>
                </div>
                {alreadySaved?.length !== 0 ? (
                  <button
                    type="button"
                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  >
                    {pin?.save?.length} Saved
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(_id);
                    }}
                    type="button"
                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  >
                    {pin?.save?.length} {savingPost ? "Saving" : "Save"}
                  </button>
                )}
              </div>
              <div className="w-full flex justify-between items-center gap-2">
                {destination && (
                  <a
                    className="bg-white text-black flex items-center gap-2 font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                    href={destination}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsFillArrowDownRightCircleFill />
                    {destination.length > 15
                      ? ` ${destination.slice(0, 15)}...`
                      : destination}
                  </a>
                )}
                {postedBy?._id === user?.sub && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(_id);
                      console.log(_id);
                    }}
                    type="button"
                    className="text-dark bg-white p-2 opacity-70 hover:opacity-100 font-bold  text-base rounded-3xl hover:shadow-md outline-none "
                  >
                    <AiTwotoneDelete />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <Link
          to={`user-profile/${postedBy?._id}`}
          className="flex gap-2 mt-2 items-center"
        >
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={postedBy?.image}
            alt="user-profile"
          />
          <p className="font-semibold capitalize">{postedBy?.userName}</p>
        </Link>
      </div>
    </>
  );
};

export default Pin;
