import VideoEditor from './components/VideoEditor';

function App(){
    const sendTimes = times => console.log(times);
    return (
        <VideoEditor onTimesReady={ sendTimes }/>
    );
}

export default App;
