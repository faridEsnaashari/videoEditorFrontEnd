import VideoEditor from './components/VideoEditor';
import testVideo from './videos/2.mp4';

function App(){
    const sendTimes = times => console.log(times);
    return (
        <VideoEditor onTimesReady={ sendTimes } video={ testVideo }/>
    );
}

export default App;
