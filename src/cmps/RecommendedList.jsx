import { RecommendedPreview } from "./RecommendedPreview";

export function RecommendedList({ list }) {
  return (
    <>
      <section className="station-list-container">
        <h3 className="category-tag">Recommended Songs</h3>
        <section className="station-list">
          {list?.map((song) => (
            <RecommendedPreview key={song._id} song={song} />
          ))}
        </section>
      </section>
    </>
  );
}
