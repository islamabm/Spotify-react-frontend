import { useEffect, useState } from "react"
import { stationService } from "../services/station.service"
import { useParams } from "react-router-dom"
import { getSpotifySvg } from "../services/SVG.service"

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

  function formatDate(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]

    const date = new Date(dateString)
    const monthIndex = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()

    const formattedDate = `${months[monthIndex]} ${day}, ${year}`
    return formattedDate
  }

  if (!station) return <div>Loading...</div>
  return (
    <section className="station-details">
      <div className="station-header-content">
        <img
          className="station-main-img"
          src={station.imgUrl}
          alt="station main img"
        />
        <div className="station-info">
          <span className="playlist-word">Playlist</span>
          <h1 className="station-name">{station.name}</h1>
          <p className="station-description">{station.description}</p>
          <span className="logo">Spotify </span>
          <span class="dot">• </span>
          <span class="songs-count"> {station.songs.length} songs </span>
        </div>
      </div>
      <div className="station-songs-header">
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span>Date added</span>
        <span>#</span>
      </div>
      <div className="station-songs">
        {station.songs.map((song, idx) => (
          <div key={idx} className="song">
            <span className="song-idx flex align-center justify-center">
              {idx + 1}
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
            <div className="added-at flex align-center">
              {formatDate(song.addedAt)}
            </div>
            <div className="duration-container flex">
              <input className="hidden" type="checkbox" />
              <div className="duration">
                {song.duration ? song.duration : "1:00"}
              </div>
              <span
                className="hidden dots"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg("dots"),
                }}
              ></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
