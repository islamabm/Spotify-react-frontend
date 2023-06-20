import { useEffect, useState } from 'react'
import { robotService } from '../services/robot.service'
import { Link, useNavigate, useParams } from 'react-router-dom'

export function RobotDetails(props) {
  console.log('robot details', props)
  const [robot, setRobot] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadRobot()
  }, [params.id])

  async function loadRobot() {
    try {
      const robot = await robotService.getById(params.id)
      setRobot(robot)
    } catch (error) {
      console.log('error:', error)
    }
  }

  function onBack() {
    navigate('/')
  }

  console.log('render')

  if (!robot) return <div>Loading...</div>
  return (
    <section className="robot-details">
      <section>
        <h3>Model: {robot.model}</h3>
      </section>
      <section>
        <h3>Type: {robot.type}</h3>
      </section>
      <section>
        <h3>batteryStatus: {robot.batteryStatus}</h3>
      </section>
      <img src={`https://robohash.org/${robot._id}`} />
      <Link to="/robot/r3">Next Robot</Link>
      <button onClick={onBack}>Back</button>
    </section>
  )
}
