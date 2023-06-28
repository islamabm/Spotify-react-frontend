import React from "react";
import { RecommendedList } from "./RecommendedList";
import { useState, useEffect } from "react";
import { stationService } from "../services/station.service.js";

export function Recommended({ list }) {
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  console.log(list);

  useEffect(() => {
    getList();
  }, [list]);

  async function getList() {
    try {
      const currList = await stationService.getRecommendedSongs(list);
      console.log(currList);
      setRecommendedSongs(currList);
    } catch (error) {
      console.error("Error fetching recommended songs:", error);
    }
  }

  return (
    <section className="recommended">
      <div className="recommended-title">
        <h1>Recommended</h1>
        <h4>Based on what's in this playlist</h4>
      </div>
      <RecommendedList list={recommendedSongs} />
    </section>
  );
}
