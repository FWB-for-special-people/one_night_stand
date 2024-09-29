// @ts-nocheck
import {useWhisper} from './useWhisperYolo';
import {useAxios} from "src/hooks/useAxios.ts";
import {API} from "src/constants/api_routes.ts";
import {useEffect, useState} from "react";

const SpeechToText = () => {
    const axiosInstance = useAxios();
    const [isSending, setIsSending] = useState(false);
    const { transcript, startRecording, stopRecording } = useWhisper({
        apiKey: "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"
    });

    const handleEndSpeech = async () => {
        await stopRecording();
        console.log("Recording stopped, waiting for transcript...");


        setIsSending(true);
    };

    useEffect(() => {
        if (isSending && transcript.text) {
            const sendTranscript = async () => {
                try {
                    const response = await axiosInstance.post(API.cardContent, { theme: transcript.text });
                    console.log("Response from API:", response.data);
                } catch (error) {
                    console.error("Failed to send transcript to server:", error);
                } finally {
                    setIsSending(false);
                }
            };
            sendTranscript();
        }
    }, [transcript.text, isSending, axiosInstance]);

    return (
        <div>
            <p>User text: {transcript.text}</p>
            <button onClick={() => startRecording()}>Start</button>
            <button onClick={handleEndSpeech}>Stop</button>
        </div>
    );
};

export default SpeechToText