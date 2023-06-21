import { useEffect, useState } from "react"
import { stationService } from "../services/station.service"
import { useParams } from "react-router-dom"

export function StationDetails(props) {
  const [station, setStation] = useState(null)
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
          <div key={idx} className="song">
            <span className="song-idx flex align-center justify-center">
              {idx}
            </span>
            <div className="song-details-container">
              <div className="img-container flex align-center justify-center">
                <img className="song-img" src={song.imgUrl} alt="song img" />
              </div>
              <div className="name-and-artist flex justify-center">
                <span className="song-name">{song.title}</span>
                <span className="song-artist">{song.artist}</span>
              </div>
            </div>
            <div className="album-name flex align-center">{song.album}</div>
            <div className="added-at flex align-center">{song.addedAt}</div>
            <div className="duration-container flex">
              <input className="hidden" type="checkbox" />
              <div className="duration">
                {song.duration ? song.duration : "1:00"}
              </div>
              <span className="hidden">...</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
