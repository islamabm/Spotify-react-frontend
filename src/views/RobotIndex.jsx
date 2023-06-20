import { Component, useCallback, useEffect, useMemo, useState } from 'react'
import { RobotList } from '../cmps/RobotList'
import { RobotFilter } from '../cmps/RobotFilter'
import { Link } from 'react-router-dom'
import { NiceButton } from '../cmps/NiceButton'
import { connect, useDispatch, useSelector } from 'react-redux'
import { loadRobots, removeRobot, setFilterBy } from '../store/actions/robot.actions'
import { spendBalance } from '../store/actions/user.actions'

export function RobotIndex(props) {
    const robots = useSelector((storeState) => storeState.robotModule.robots)
    const filterBy = useSelector((storeState) => storeState.robotModule.filterBy)
    const dispatch = useDispatch()

    const [isPopo, setIsPopo] = useState(true)

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

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadRobots())
    }

    const onSpendBalance = () => {
        dispatch(spendBalance(5))
    }
    
    const bigNum = useMemo(() => {
        let sum = 0
        for (let i = 0; i <= 10 ** 8 * 3; i++) {
            sum += i
        }
        return sum * (robots?.length || 1)
    }, [robots?.length])



    if (!robots) return <div>Loading...</div>
    const NiceText = () => 'Nice Text'
    const Icon = () => '🏆'
    console.log('ROBOT INDEX');
    return (
        <section className='robot-index'>
            {bigNum}
            <RobotFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />
            <Link to="/robot/edit">Add Robot</Link>
            <RobotList robots={robots} onRemoveRobot={onRemoveRobot} />
            <NiceButton Icon={Icon} className='nice-button' onClick={() => console.log('Clicked!')} >
                <NiceText />
            </NiceButton>
            <NiceButton onClick={onSpendBalance} className='nice-button' Icon={() => '💰'}>Spend Balance</NiceButton>
            <NiceButton onClick={() => setIsPopo((prevIsPopo) => !prevIsPopo)} className='nice-button' Icon={() => '💰'}>
                {isPopo ? 'YES POPO' : 'NO POPO'}
            </NiceButton>
        </section>
    )
}
