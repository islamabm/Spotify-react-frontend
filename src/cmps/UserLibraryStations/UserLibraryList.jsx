import { UserLibraryPreview } from './UserLibraryPreview'

export function UserLibraryList({ stations }) {
  return (
    <section className="station-list-container">
      <h3 className="category-tag pointer">Your Playlists</h3>
      <section className="station-list">
        {stations.map((station, idx) => (
          <UserLibraryPreview key={idx} station={station} />
        ))}
      </section>
    </section>
  )
}
