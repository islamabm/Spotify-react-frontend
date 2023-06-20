import { useEffect, useState } from 'react'
import { stationService } from '../services/station.service'
import { Link, useNavigate, useParams } from 'react-router-dom'

export function StationDetails(props) {
  console.log('station details', props)
  const [station, setStation] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadStation()
  }, [params.id])

  async function loadStation() {
    try {
      const station = await stationService.getById(params.id)
      setStation(station)
    } catch (error) {
      console.log('error:', error)
    }
  }

  function onBack() {
    navigate('/')
  }

  console.log('render')

  if (!station) return <div>Loading...</div>
  return (
    <section className="station-details">
      <section>
        <h3>Model: {station.model}</h3>
      </section>
      <section>
        <h3>Type: {station.type}</h3>
      </section>
      <section>
        <h3>batteryStatus: {station.batteryStatus}</h3>
      </section>
      <img src={`https://robohash.org/${station._id}`} />
      <Link to="/station/r3">Next Station</Link>
      <button onClick={onBack}>Back</button>
    </section>
  )
}
