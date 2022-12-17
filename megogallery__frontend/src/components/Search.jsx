import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { searchQuery, feedQuery } from "../utils/data";
import { client } from "../client";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (searchTerm) {
      setLoading(false);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);
  return (
    <>
      <div>
        {loading && <Spinner message={"Searching for pins... "} />}
        {pins?.length !== 0 && <MasonryLayout pins={pins} />}
        {pins?.length !== 0 && searchTerm !== "" && !loading && (
          <div className="text-center mt-10 text-xl">No Pins Found.</div>
        )}
      </div>
    </>
  );
};

export default Search;
