import { useEffect, useRef, useState } from "react"


export const Timer = () => {
    const [time, setTime] = useState(0)
    const intervalIdRef = useRef()
    let intervalId 

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1)
            // setTime(20)
        }, 1000);

        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [])


    function onStopInterval() {
        clearInterval(intervalIdRef.current)
    }

    console.log('render')
    return (
        <section className="timer">
            <h3 >Clock</h3>
            <p>{time}</p>
            <button onClick={onStopInterval} >Stop</button>
        </section>
    )
}
