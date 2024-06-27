import React, { forwardRef, useImperativeHandle } from "react";
import { useEffect, useState } from "react";
import { TimerProps } from "../../data/interfaces/auth";

function Timer(props: TimerProps, ref: any) {

    const [time, setTime] = useState<number>(props.seconds || 0);

    useEffect(() => {
        // Set up the interval to update the timer every second 
        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime == 1) {
                    props.timeEnd && props.timeEnd()
                    clearInterval(interval)
                }
                return prevTime > 0 ? prevTime - 1 : 0
            });
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [props])

    useImperativeHandle(ref, () => ({
        resetTimer: () => {
            setTime(props.seconds as number);
        }
    }));

    // Format the time as mm:ss
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <React.Fragment> {formatTime(time)} </React.Fragment>
    );
}

export default forwardRef(Timer);
