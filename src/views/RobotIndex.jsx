import { useCallback, useEffect } from 'react'
import { RobotList } from '../cmps/RobotList'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadRobots, removeRobot } from '../store/actions/robot.actions'

export function RobotIndex() {
  const robots = useSelector((storeState) => storeState.robotModule.robots)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadRobots())
  }, [])

  const onRemoveRobot = useCallback(async (robotId) => {
    try {
      dispatch(removeRobot(robotId))
    } catch (error) {
      console.log('error:', error)
    }
  }, [])

  if (!robots) return <div>Loading...</div>

  return (
    <section className="robot-index">
      {/* <Link to="/robot/edit">Add Robot</Link> */}
      <RobotList robots={robots} onRemoveRobot={onRemoveRobot} />
    </section>
  )
}
