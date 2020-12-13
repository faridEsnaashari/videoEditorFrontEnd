import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';

import styles from '../assets/styles/videoEditor/styles';

function VideoEditor(props) {
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
    };

    const enableTimeTape = (tape) => {
        tape.disabled = false;
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
                    <source src={ props.video }/>
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
                    <source src={ props.video }/>
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

export default VideoEditor;
