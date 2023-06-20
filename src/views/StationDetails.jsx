import { useEffect, useState } from 'react'
import { stationService } from '../services/station.service'
import { useNavigate, useParams } from 'react-router-dom'

export function StationDetails(props) {
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

  if (!station) return <div>Loading...</div>
  return (
    <section className="station-details">
      <div>helloooo</div>
    </section>
  )
}
