import React from 'react'
import { Link } from 'react-router-dom'

export function RobotPreview({ robot, onRemoveRobot }) {

    const robotStyle = { backgroundImage: `url(https://robohash.org/${robot._id})` }
    return (
        <article style={robotStyle} className='robot-preview'>
            <Link to={`/robot/${robot._id}`} className="info">
                <h2>{robot.model}</h2>
                <h4>{robot.type}</h4>
            </Link>
            <section className="actions">
                <button onClick={() => onRemoveRobot(robot._id)} >X</button>
                <Link to={`/robot/edit/${robot._id}`}>Edit</Link>
            </section>
        </article>
    )
}
