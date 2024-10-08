// @ts-nocheck
import {useWhisper} from './useWhisperYolo';
import {useAxios} from "src/hooks/useAxios.ts";
import {API, PrefixedAPI} from "src/constants/api_routes.ts";
import {useEffect, useState} from "react";
import {Box, IconButton} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import {useOpenAiToken} from "src/queries/useOpenAiToken.ts";

const SpeechToText: React.FC = ({setCallAPI, setText}) => {
  const axiosInstance = useAxios();
  const { data: apiKey } = useOpenAiToken()
  const [isSending, setIsSending] = useState(false);
  const { transcript, startRecording, stopRecording } = useWhisper({apiKey});

  const handleStart = () => {
    console.log("Start recording...");
    startRecording();
  };

  const handleStop = async () => {
    await stopRecording();
    console.log("Recording stopped, waiting for transcript...");
    setIsSending(true);
  };

  useEffect(() => {
    if (isSending && transcript.text) {
      const sendTranscript = async () => {
        try {
          const response = await axiosInstance.post(API.cardsContent, { theme: transcript.text });
          setCallAPI(true);
          setText(response.data.text)
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >

      <IconButton
        onMouseDown={handleStart}
        onMouseUp={handleStop}
        onTouchStart={handleStart} // Obsługa urządzeń dotykowych
        onTouchEnd={handleStop} // Obsługa urządzeń dotykowych
        sx={{
          width: 160, // Zwiększ szerokość przycisku
          height: 160, // Zwiększ wysokość przycisku
          borderRadius: '50%',
          backgroundColor: '#007AFF',
          color: 'white',
          transition: 'transform 0.2s, box-shadow 0.2s',
          boxShadow: '0 8px 16px rgba(0, 122, 255, 0.4)', // Większy cień dla głębi
          '&:hover': {
            backgroundColor: '#005BB5',
            transform: 'scale(1.1)', // Powiększenie przy najechaniu
          },
          '&:active': {
            boxShadow: '0 12px 24px rgba(0, 122, 255, 0.6)', // Mocniejszy cień przy wciśnięciu
            transform: 'scale(0.9)', // Zmniejszenie przycisku przy wciśnięciu
          },
        }}
      >
        <MicIcon sx={{ fontSize: 70 }} /> {/* Zwiększenie rozmiaru ikony */}
      </IconButton>
    </Box>
  );

};

export default SpeechToText