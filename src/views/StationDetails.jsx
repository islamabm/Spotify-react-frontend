import { useEffect, useState } from "react"
import { stationService } from "../services/station.service"
import { useParams } from "react-router-dom"

export function StationDetails(props) {
  const [station, setStation] = useState({})
  const params = useParams()

  useEffect(() => {
    loadStation()
  }, [params.id])

  async function loadStation() {
    try {
      const station = await stationService.getById(params.id)
      setStation(station)
    } catch (error) {
      console.log("error:", error)
    }
  }

  if (!station) return <div>Loading...</div>
  return (
    <section className="station-details">
      <div>{station.name}</div>
      <div className="station-songs">
        {station.songs.map((song, idx) => (
          <div className="song flex">
            <span className="song-idx">{idx}</span>
            <img className="song-img" src={song.imgUrl} alt="song img" />
            <div className="song-details-container">
              <span className="song-name">{song.title}</span>
              <span className="song-artist">{song.artist}</span>
            </div>
            <div className="album-name">{song.album}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
