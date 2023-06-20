import { useEffect } from 'react'

import { stationService } from '../services/station.service'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../customHooks/useForm'

export function StationEdit() {
  const [station, handleChange, setStation] = useForm(stationService.getEmptyStation())

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadStation()
  }, [])

  async function loadStation() {
    const stationId = params.id
    if (stationId) {
      try {
        const station = await stationService.getById(stationId)
        setStation(station)
      } catch (error) {
        console.log('error:', error)
      }
    }
  }

  async function onSaveStation(ev) {
    ev.preventDefault()
    try {
      await stationService.save({ ...station })
      navigate('/')
    } catch (error) {
      console.log('error:', error)
    }
  }

  const { model, type } = station
  return (
    <section className="station-edit">
      <h1>{station._id ? 'Edit' : 'Add'} Station</h1>
      <form onSubmit={onSaveStation}>
        <label htmlFor="model">Model</label>
        <input
          value={model}
          onChange={handleChange}
          type="text"
          name="model"
          id="model"
        />

        <label htmlFor="type">Type</label>
        <select value={type} onChange={handleChange} name="type" id="type">
          <option disabled value="">
            Choose a type
          </option>
          <option value="Cooking">Cooking</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Pleasure">Pleasure</option>
          <option value="Office">Office</option>
        </select>

        <button>Save</button>
      </form>
    </section>
  )
}
