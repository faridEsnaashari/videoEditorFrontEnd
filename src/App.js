import { useState, useEffect } from 'react';

import testVideo from './videos/2.mp4';

function App(props) {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [state, setState] = useState("startTime");
    const [originalVideoEndTime, setOriginalVideoEndTime] = useState(0);

    useEffect(() => {
        const originalVideo = document.getElementById("originalVideo");
        originalVideo.oncanplaythrough = e => setOriginalVideoEndTime(Math.round(e.target.duration));
    }, []);

    const startTimeChanged = e => setStartTime(e.target.value);
    const endTimeChanged = e => setEndTime(e.target.value);

    const submit = () => {
        if(state === "startTime"){
            changeStateToEndTime();
        }
        else{
            returnTimes();
        }
    };

    const changeStateToEndTime = () => setState("endTime");
    const returnTimes = () => {
        const times = {
            start_time: startTime,
            end_time: endTime,
        };

        if(props.onTimesReady){
            props.onTimesReady(times);
        }
        console.log(times);

        return times;
    };

    return (
        <>
            <video id="originalVideo" width="500px" height="500px" autoPlay controls>
                <source src={ testVideo }/>
            </video>
            <div>
                <input id="startTime" type="range" min="0" max={ originalVideoEndTime } step="0.1" onChange={ startTimeChanged }/>
                <input id="endTime" type="range" min="0" max={ originalVideoEndTime } step="0.1" onChange={ endTimeChanged }/>
                <button onClick={ submit }>submit</button>
            </div>
        </>
    );
}

export default App;
