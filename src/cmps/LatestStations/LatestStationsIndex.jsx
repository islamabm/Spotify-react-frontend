import React from "react";
import { LatestStationsList } from "./LatestStationsList";
import { useSelector } from "react-redux";

export function LatestStationsIndex() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser);
  const latestStations = user.latestStations;

  if (!latestStations || !user) return <div>There are no latest stations.</div>;
  return (
    (latestStations && 
      <section className="latest-stations-index">
        <LatestStationsList latestStations={latestStations} />
      </section>
    )
  );
}
