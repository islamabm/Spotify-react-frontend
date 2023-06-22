import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpotifySvg } from "../services/SVG.service";
import { useDispatch, useSelector } from "react-redux";
import { setCurrStation } from "../store/actions/station.actions";
import { setCurrSong, setCurrSongIndex } from "../store/actions/song.actions";
import { FastAverageColor } from "fast-average-color";

export function StationDetails(props) {
  const [bgStyle, setBgStyle] = useState(null);
  const colorCache = {};
  // let bgStyle = null
  const params = useParams();

  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  );
  const stationImg = useSelector(
    (storeState) => storeState.stationModule.currStationImg
  );
  const song = useSelector((storeState) => storeState.songModule.currSong);
  console.log("song", song);
  const idx = useSelector((storeState) => storeState.songModule.currIndex);
  console.log("idx", idx);
  const dispatch = useDispatch();

  useEffect(() => {
    loadStation();
  }, [params.id]);

  useEffect(() => {
    updateImgUrlAndColor(station);
  }, [stationImg]);

  function loadStation() {
    dispatch(setCurrStation(params.id));
  }

  function onSongClicked(songId) {
    dispatch(setCurrSong(params.id, songId));
    dispatch(setCurrSongIndex(params.id, songId));
  }

  function updateImgUrlAndColor(station) {
    if (!station) return;
    const imgUrl = station.imgUrl;
    if (imgUrl !== "") {
      getDominantColor(imgUrl);
    }
  }

  async function getDominantColor(imageSrc) {
    const cachedColor = colorCache[imageSrc];
    if (cachedColor) {
      const gradient = `background: linear-gradient(to bottom, ${cachedColor} 0%, black 30%, ${cachedColor} 70%, black 100%)`;
      setBgStyle(gradient);
      document.body.style.backgroundImage = gradient;
      return;
    }
    const fac = new FastAverageColor();
    const img = new Image();
    img.crossOrigin = "Anonymous";
    const corsProxyUrl = "https://api.codetabs.com/v1/proxy?quest=";
    img.src = corsProxyUrl + encodeURIComponent(imageSrc);
    img.onload = async () => {
      try {
        const color = await fac.getColorAsync(img);
        colorCache[imageSrc] = color;
        setBgStyle({
          background: `linear-gradient(to bottom, ${color.rgb} 0%, black 30%, black 70%, black 100%)`,
        });
      } catch (e) {
        console.error(e);
      }
    };
  }
  function stationNameClass() {
    const words = station.name.split(" ").length;
    if (words <= 3) {
      return "short-station-name";
    } else if (words <= 5) {
      return "long-station-name";
    } else {
      return "huge-station-name";
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
    ];

    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${months[monthIndex]} ${day}, ${year}`;
    return formattedDate;
  }
  console.log("bgStyle", bgStyle);
  if (!station) return <div>Loading...</div>;
  return (
    <section className="station-details" style={bgStyle}>
      <div className="station-header-content">
        <img
          className="station-main-img"
          src={station.imgUrl}
          alt="station main img"
        />
        <div className="station-info">
          <span className="playlist-word">Playlist</span>
          <h1 className={stationNameClass()}>{station.name}</h1>
          <p className="station-description">{station.description}</p>
          <span className="logo">Spotify </span>
          <span className="dot">• </span>
          <span className="songs-count"> {station.songs.length} songs </span>
        </div>
      </div>
      <div className="station-songs">
        <div className="station-songs-header">
          <span className="flex align-center justify-center">#</span>
          <span className="title flex align-center">Title</span>
          <span className="flex align-center">Album</span>
          <span className="flex align-center">Date added</span>
          <span
            className="time flex align-center justify-center"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg("time"),
            }}
          ></span>
        </div>
        {station.songs.map((song, idx) => (
          <div key={idx} className="song">
            <span className="song-idx flex align-center justify-center">
              {idx + 1}
            </span>
            <div className="song-details-container">
              <div className="img-container flex align-center justify-center">
                <img
                  onClick={() => onSongClicked(song._id)}
                  className="song-img"
                  src={song.imgUrl}
                  alt="song img"
                />
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
  );
}
