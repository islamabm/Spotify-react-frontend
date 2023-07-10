import { UserLibraryPreview } from './UserLibraryPreview'

export function UserLibraryList({ stations, title }) {
  return (
    <section className="station-list-container">
      <h3 className="category-tag pointer">{title}</h3>
      <section className="station-list">
        {stations.map((station, idx) => (
          <UserLibraryPreview key={idx} station={station} />
        ))}
      </section>
    </section>
  )
}
