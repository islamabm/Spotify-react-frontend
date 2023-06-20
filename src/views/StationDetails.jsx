import { useEffect, useState } from 'react'
import { stationService } from '../services/station.service'
import { useParams } from 'react-router-dom'

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
      console.log('error:', error)
    }
  }

  if (!station) return <div>Loading...</div>
  return (
    <section className="station-details">
    </section>
  )
}
