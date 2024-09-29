// @ts-nocheck
import {useWhisper} from './useWhisperYolo';

const SpeechToText = () => {
    const {
        transcript,
        startRecording,
        stopRecording,
    } = useWhisper({
        apiKey: "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"
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