import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSpotifySvg } from "../services/SVG.service";
import { setCurrSong, setCurrSongIndex} from "../store/actions/song.actions";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateStation } from "../store/actions/station.actions";

export default function StationSongList(props) {
  const station = props.station;
  const dispatch = useDispatch();
  const params = useParams();
  const [hoveredSongIdx] = useState(null);
  const [songs, setSongs] = useState(station.songs);
  function onSongClicked(songId) {
    dispatch(setCurrSong(params.id, songId));
    dispatch(setCurrSongIndex(params.id, songId));
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

  function handleDragEnd(result) {
    if (!result.destination) {
      return; // The item was dropped outside of a droppable area
    }

    const { source, destination } = result;

    // Create a new array to avoid mutating the state directly
    const updatedSongs = Array.from(songs);

    // Reorder the songs based on the drag and drop result
    const [movedSong] = updatedSongs.splice(source.index, 1);
    updatedSongs.splice(destination.index, 0, movedSong);

    // Update the state with the new song order
    setSongs(updatedSongs);

     // Dispatch the updateStation action with the new song order
  dispatch(updateStation(params.id, updatedSongs));
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <Droppable droppableId="station-songs">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {station.songs.map((song, idx) => (
                <Draggable key={song._id} draggableId={song._id} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`song ${
                        snapshot.isDragging ? "dragging" : ""
                      }`}
                    >
                      <span
                        className={`song-idx flex align-center justify-center ${
                          hoveredSongIdx === idx ? "hovered" : ""
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className={` small-play-btn flex align-center justify-center ${
                          hoveredSongIdx === idx ? "hovered" : ""
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: getSpotifySvg("smallPlayButton"),
                        }}
                      ></span>
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
                      <div className="album-name flex align-center">
                        {song.album}
                      </div>
                      <div className="added-at flex align-center">
                        {formatDate(song.addedAt)}
                      </div>
                      <div className="duration-container flex">
                        <span
                          className="hidden dots"
                          dangerouslySetInnerHTML={{
                            __html: getSpotifySvg("emptyHeartIcon"),
                          }}
                        ></span>
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
