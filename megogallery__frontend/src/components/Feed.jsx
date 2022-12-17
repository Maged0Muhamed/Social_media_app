import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery } from "./../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();
  if (loading) <Spinner message={"We are adding new ideas to your feed !"} />;

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => setPins(data));
      setLoading(false);
    }
  }, [categoryId]);
  if (!pins?.length) return <Spinner message={"No Pins Available"} />;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
