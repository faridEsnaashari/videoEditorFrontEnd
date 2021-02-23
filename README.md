## Description

A react project that you can use it for select a specific part of a video and get the begin and end time of that specific part.

## Props of VideoEditor component

#### 'onTimesReady' :
**Description:** It gets a callback function that fire when user select begin and end of specific part of a video.

**Example input of passed function** 

    {
        end_time: "4.2",
        start_time: "1.2"
    }



#### 'video' :
**Description:** The video that you want do cut operation on it.


## Simple usage of VideoEditor component:

    import VideoEditor from './components/VideoEditor';
    import testVideo from './videos/2.mp4';

    function App(){
        const sendTimes = times => console.log(times);
        return (
            <VideoEditor onTimesReady={ sendTimes } video={ testVideo }/>
        );
    }
