import { memo } from 'react'
import { StationPreview } from './StationPreview'
function _StationList({ stations, onRemoveStation }) {
  return (
    <>
      <h3 className="category-tag">Mood</h3>
      <section className="station-list">
        {stations.map((station) => (
          <StationPreview key={station._id} station={station} />
        ))}
      </section>
    </>
  )
}

export const StationList = memo(_StationList)
