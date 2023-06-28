import { RecommendedPreview } from "./RecommendedPreview";

export function RecommendedList({ list }) {
  return (
    <section className="recommended-list-container">
      {list?.map((song) => (
        <RecommendedPreview key={song._id} song={song} />
      ))}
    </section>
  );
}
