import React from "react"
import { EditStationMobilePreview } from "./EditStationMobilePreview"

export function EditStationMobileList({ list }) {
  return (
    <div>
      {list?.map((song, idx) => (
        <EditStationMobilePreview key={idx} song={song} />
      ))}
    </div>
  )
}
