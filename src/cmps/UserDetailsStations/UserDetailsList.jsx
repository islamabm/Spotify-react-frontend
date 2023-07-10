import React from 'react'
import { UserDetailsPreview } from './UserDetailsPreview'
export function UserDetailsList({ stations }) {
  return (
    <section className="station-list-user">
      <h3 className="category-tag pointer">Public stations</h3>
      <section className="station-list">
        {stations.map((station, idx) => (
          <UserDetailsPreview key={idx} station={station} />
        ))}
      </section>
    </section>
  )
}
