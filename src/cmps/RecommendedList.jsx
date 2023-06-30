import { RecommendedPreview } from "./RecommendedPreview";

export function RecommendedList({ list,stationId }) {
  return (
    <section className="recommended-list-container">
      {list?.map((song,idx) => (
        <RecommendedPreview key={idx} song={song} stationId={stationId} />
      ))}
    </section>
  );
}
