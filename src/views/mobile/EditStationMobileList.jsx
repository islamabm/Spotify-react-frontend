import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { EditStationMobilePreview } from './EditStationMobilePreview'
import { updateStation } from '../../store/actions/station.actions'

export function EditStationMobileList({ list, station }) {
  const [songs, setSongs] = useState(list)
  const dispatch = useDispatch()

  function handleDragEnd(result) {
    if (!result.destination) return
    const { source, destination } = result

    const updatedSongs = Array.from(songs)
    const [movedSong] = updatedSongs.splice(source.index, 1)
    updatedSongs.splice(destination.index, 0, movedSong)
    setSongs(updatedSongs)
    dispatch(updateStation(station._id, updatedSongs))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="editStationSongList">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {songs?.map((song, idx) => (
              <Draggable key={song._id} draggableId={song._id} index={idx}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <EditStationMobilePreview
                      key={idx}
                      song={song}
                      station={station}
                      provided={provided}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
