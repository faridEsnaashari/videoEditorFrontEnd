import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';

import submitIcon from './assets/img/videoEditor/submitIcon.svg'
import previousActionIcon from './assets/img/videoEditor/previousActionIcon.svg'
import playIcon from './assets/img/videoEditor/playIcon.svg'
import pauseIcon from './assets/img/videoEditor/pauseIcon.svg'
import startOverIcon from './assets/img/videoEditor/startOverIcon.png'
import timeLinePaddleIcon from './assets/img/videoEditor/timeLinePaddle.svg'

import testVideo from './videos/2.mp4';

const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        height: "100vh",
        alignItems: "center",
        padding: "0 5vw",
    },
    video: {
        width: "100%",
        border: "1px solid red",
    },
    timeLineContainer: {
        height: "6em",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
    },
    resultVideoButtonsContainer: {
        height: "6em",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
    },
    timeLineTapeContainer: {
        position: "relative",
        height: "30%",
        width: "100%",
    },
    timeLineTapeBackground: {
        backgroundColor: "gray",
        height: "100%",
        position: "absolute",
        width: "100%",
        borderRadius: "10px",
    },
    timeLineButtonContainer: {
        height: "30%",
        width: "100%",
    },
    videoAndToolsContainer: {
        width:"49%",
    },

    timeLineTapeDisable: {
        "&::-webkit-slider-thumb":{
            opacity: ".2",
        },
        "&::-moz-range-thumb":{
            opacity: ".2",
        },
    },

    timeLineTape: {
        "-webkit-appearance": "none",
        position: "absolute",
        background: "none",
        pointerEvents: "none",
        width: "95%",
        height: "100%",
        padding: "unset",
        margin: "auto",
        left: "0",
        right: "0",
        outline: "none",


        "&::-webkit-slider-runnable-track":{
            background: "none",
        },
        "&::-moz-range-track":{
            background: "none",
        },
        "&::-webkit-slider-thumb":{
            appearance: "none",
            "-webkit-appearance": "none",
            backgroundSize: "20px 20px ",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            background: `url("${ timeLinePaddleIcon }")`,
            pointerEvents: "auto",
            borderRadius: "unset",
            border: "unset",
            width: "3%",
            height: "1.9em",
            //clipPath: "polygon(0% 0%, 40% 10%, 40% 90%, 0% 100%, 100% 100%, 60% 90%, 60% 10%, 100% 0%)",
        },
        "&::-moz-range-thumb":{
            backgroundSize: "20px 20px ",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            background: `url("${ timeLinePaddleIcon }")`,
            pointerEvents: "auto",
            borderRadius: "unset",
            border: "unset",
            width: "3%",
            height: "95%",
            //clipPath: "polygon(0% 0%, 40% 10%, 40% 90%, 0% 100%, 100% 100%, 60% 90%, 60% 10%, 100% 0%)",
        },
    },
    previousAction: {
        backgroundSize: "20px 20px ",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        background: `url("${ previousActionIcon }")`,
        width: "10%",
        height: "100%",
        display: "inline-block",
    },
    submit: {
        backgroundSize: "20px 20px ",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        background: `url("${ submitIcon }")`,
        width: "10%",
        height: "100%",
        display: "inline-block",
    },
    play: {
        backgroundSize: "40px 40px ",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        background: `url("${ playIcon }")`,
        width: "20%",
        height: "100%",
    },
    pause: {
        backgroundSize: "40px 40px ",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        background: `url("${ pauseIcon }")`,
        width: "20%",
        height: "100%",
    },
    startOver: {
        backgroundSize: "40px 40px ",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        background: `url("${ startOverIcon }")`,
        width: "20%",
        height: "100%",
    },

    "@media (max-width: 950px)": {
        videoAndToolsContainer: {
            width:"100%",
            marginTop: "2em",
        }
    },
};
function App(props) {
    const classes = makeStyles(styles)();
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const endTimeRef = useRef();
    const startTimeRef = useRef();
    const [state, setState] = useState("startTime");
    const [originalVideoEndTime, setOriginalVideoEndTime] = useState(0);

    useEffect(() => {
        const originalVideo = document.getElementById("originalVideo");
        originalVideo.oncanplaythrough = e => setOriginalVideoEndTime(Math.round(e.target.duration));

        const resultVideo = document.getElementById("resultVideo");
        resultVideo.ontimeupdate = showJustResultVideo;
    }, []);

    useEffect(() => {
        const endTime = document.getElementById("endTime");
        const startTime = document.getElementById("startTime");

        if(state === "startTime"){
            disableTimeTape(endTime);
            enableTimeTape(startTime);
        }
        else{
            disableTimeTape(startTime);
            enableTimeTape(endTime);
        }
    }, [state]);

    useEffect(() => {
        const originalVideo = document.getElementById("originalVideo");
        originalVideo.currentTime = startTime;
        
        startTimeRef.current = startTime;
    }, [startTime]);

    useEffect(() => {
        const originalVideo = document.getElementById("originalVideo");
        originalVideo.currentTime = endTime;

        endTimeRef.current = endTime;
    }, [endTime]);

    const disableTimeTape = (tape) => {
        tape.disabled = true;
        console.log(tape.id + tape.disabled);
    };

    const enableTimeTape = (tape) => {
        tape.disabled = false;
        console.log(tape.id + tape.disabled);
    };

    const showJustResultVideo = (e) => {
        if(e.target.currentTime > startTimeRef.current && e.target.currentTime < endTimeRef.current){
            e.target.currentTime = endTimeRef.current;
        }
    };

    const startTimeChanged = e => setStartTime(e.target.value);
    const endTimeChanged = e => setEndTime(e.target.value);

    const previousActionClicked = () => setState("startTime");

    const playClicked = () => {
        const resultVideo = document.getElementById("resultVideo");
        resultVideo.play();
    };
    const pauseClicked = () => {
        const resultVideo = document.getElementById("resultVideo");
        resultVideo.pause();
    };
    const startOverClicked = () => {
        const resultVideo = document.getElementById("resultVideo");
        resultVideo.currentTime = 0;
        resultVideo.pause();
    };

    const submitClicked = () => {
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

        return times;
    };

    return (
        <div className={ classes.container }>
            <div className={ classes.videoAndToolsContainer }>
                <span>
                    ORIGINAL VIDEO:
                </span>
                <video className={ classes.video } id="originalVideo" autoPlay controls>
                    <source src={ testVideo }/>
                </video>
                <div className={ classes.timeLineContainer }>
                    <div className={ classes.timeLineButtonContainer }>
                        <div className={ classes.previousAction } onClick={ previousActionClicked }></div>
                        <div className={ classes.submit } onClick={ submitClicked }></div>
                    </div>
                    <div className={ classes.timeLineTapeContainer }>
                        <div className={ classes.timeLineTapeBackground }>
                            {
                            //<input className={ classes.timeLineTape + " " + (state !== "startTime"? classes.timeLineTapeDisable : "" ) } id="startTime" type="range" min="0" max={ originalVideoEndTime } step="0.1" onChange={ startTimeChanged }/>

                            }
                            <input className={ `${ classes.timeLineTape } ${ state === "startTime" ? "" : classes.timeLineTapeDisable }` } id="startTime" type="range" min="0" max={ originalVideoEndTime } step="0.1" onChange={ startTimeChanged }/>
                        <input className={ `${ classes.timeLineTape } ${ state === "startTime" ? classes.timeLineTapeDisable : "" }` } id="endTime" type="range" min="0" max={ originalVideoEndTime } defaultValue={ originalVideoEndTime } step="0.1" onChange={ endTimeChanged }/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ classes.videoAndToolsContainer }>
                <span>
                    RESULT VIDEO:
                </span>
                <video className={ classes.video } id="resultVideo">
                    <source src={ testVideo }/>
                </video>
                <div className={ classes.resultVideoButtonsContainer }>
                    <div className={ classes.play } onClick={ playClicked }></div>
                    <div className={ classes.pause } onClick={ pauseClicked }></div>
                    <div className={ classes.startOver } onClick={ startOverClicked }></div>
                </div>
            </div>
        </div>
    );
}

export default App;
