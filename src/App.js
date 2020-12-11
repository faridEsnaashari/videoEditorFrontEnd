import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import testVideo from './videos/2.mp4';

const styles = {
    container: {
        width: "90vw",
        margin: "auto",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    video: {
        width: "100%",
    },
    timeLineContainer: {
        height: "20%",
    },
    timeLineTapeContainer: {
        position: "relative",
        height: "50%",
    },
    timeLineButtonContainer: {
        height: "50%",
    },
    videoAndToolsContainer: {
        width:"49%",
    },

    timeLineTap: {
        position: "absolute",
        background: "none",
        pointerEvents: "none",
        width: "100%",
        height: "100%",

        "&::-moz-range-track":{
            background: "none",
        },
        "&::-moz-range-thumb":{
            pointerEvents: "auto",
            borderRadius: "unset",
            width: "10%",
            height: "100%",
            clipPath: "polygon(0% 0%, 40% 10%, 40% 100%, 60% 100%, 60% 10%, 100% 0%)",
        },
    },

    "@media (max-width: 950px)": {
        videoAndToolsContainer: {
            width:"100%",
        }
    },
};
function App(props) {
    const classes = makeStyles(styles)();
    console.log(classes);
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
        <div className={ classes.container }>
            <div className={ classes.videoAndToolsContainer }>
                <video className={ classes.video } id="originalVideo" autoPlay controls>
                    <source src={ testVideo }/>
                </video>
                <div className={ classes.timeLineContainer }>
                    <div className={ classes.timeLineButtonContainer }>
                        <button onClick={ submit }>previousAction</button>
                        <button onClick={ submit }>submit</button>
                    </div>
                    <div className={ classes.timeLineTapeContainer }>
                        <input className={ classes.timeLineTap } id="startTime" type="range" min="0" max={ originalVideoEndTime } step="0.1" onChange={ startTimeChanged }/>
                        <input className={ classes.timeLineTap } id="endTime" type="range" min="0" max={ originalVideoEndTime } step="0.1" onChange={ endTimeChanged }/>
                    </div>
                </div>
            </div>
            <div className={ classes.videoAndToolsContainer }>
                <video className={ classes.video } id="resultVideo" autoPlay>
                    <source src={ testVideo }/>
                </video>
                <div className={ classes.timeLineContainer }>
                    <button onClick={ submit }>play/pouse</button>
                </div>
            </div>
        </div>
    );
}

export default App;
