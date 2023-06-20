import { useState, useEffect } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export const Counter = () => {

    const [count, setCount] = useState(0)
    const [isDark, setIsDark] = useState(false)
    useEffect(() => {
        console.log('Mounted');
        return () => {
            document.title = 'Bye Bye Counter'
        }
    }, [])

    useEffectUpdate(() => {
        console.log('count:', count)

        // on unmount and every dependency change
        return () => {
        }
    }, [count])

    function increment() {
        setCount(prevCount => prevCount + 1)

    }

    return (
        <div style={{ backgroundColor: isDark ? '#777' : '#fff' }} className="counter">
            <p>You clicked {count} times</p>
            <button onClick={increment}>
                Click me
            </button>
            <button onClick={() => setIsDark(prevIsDark => !prevIsDark)}>
                {isDark ? '☀️' : '🌓'}
            </button>
        </div >
    );
}
