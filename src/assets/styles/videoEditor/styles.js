import submitIcon from '../../img/videoEditor/submitIcon.svg'
import previousActionIcon from '../../img/videoEditor/previousActionIcon.svg'
import playIcon from '../../img/videoEditor/playIcon.svg'
import pauseIcon from '../../img/videoEditor/pauseIcon.svg'
import startOverIcon from '../../img/videoEditor/startOverIcon.png'
import timeLinePaddleIcon from '../../img/videoEditor/timeLinePaddle.svg'

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

export default styles;
