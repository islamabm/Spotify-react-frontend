import { RecommendedPreview } from "./RecommendedPreview";

export function RecommendedList({ list,stationId }) {
  return (
    <section className="recommended-list-container">
      {list?.map((song) => (
        <RecommendedPreview key={song._id} song={song} stationId={stationId} />
      ))}
    </section>
  );
}
