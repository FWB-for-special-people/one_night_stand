// @ts-nocheck
import {useWhisper} from './useWhisperYolo';

const SpeechToText = () => {
    const {
        transcript,
        startRecording,
        stopRecording,
    } = useWhisper({
        apiKey: process.env.OPENAI_API_KEY
    })

    return (
        <div>
            <p>User text: {transcript.text}</p>
            <button onClick={() => {startRecording()}}>Start</button>
            <button onClick={() => stopRecording()}>Stop</button>
        </div>
    )
}

export default SpeechToText