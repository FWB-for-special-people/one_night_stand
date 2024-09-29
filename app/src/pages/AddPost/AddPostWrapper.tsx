// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {Box, Button, Typography} from '@mui/material';
import DataAIDisplay from './components/DataAIDisplay.tsx';
import response from '../../assets/response.json';
import AddButton from './components/AddButton.tsx';
import SpeechToText from "src/pages/AddPost/components/SpeechToText.tsx";
import Carousel from "src/pages/AddPost/Carousel.tsx";
import OverlappingCarousel from "src/pages/AddPost/Carousel.tsx";

const AddPost: React.FC = () => {
    const [postQuestionText] = useState('');
    const [backendAnswerText, setBackendAnswerText] = useState('');
    const [backendQuestionText, setBackendQuestionText] = useState('');
    const [backendImages, setBackendImages] = useState<string[]>([]);
    const [callAPI, setCallAPI] = useState(false);
    const [text, setText] = useState('');

    const handleSavePost = (isPublic: boolean) => {
        console.log('Tekst posta:', postQuestionText);
        console.log('Czy post jest publiczny?: ', isPublic);
    };

    const {answer, question, images_b64} = response;

    useEffect(() => {
        const imageData = images_b64.map(
            (imageBase64) => `data:image/jpeg;base64,${imageBase64}`,
        );
        setBackendAnswerText(answer);
        setBackendQuestionText(question);
        setBackendImages(imageData);
    }, []);

    const addButtonDisabled = !answer || !question || !images_b64;
    console.log(text)

    return callAPI ? <OverlappingCarousel text={text} /> : (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f4f4f4',
            }}
        >
            <Box
                sx={{
                    width: '320px',
                    height: '320px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(30px)',
                    borderRadius: '50%',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        right: '10px',
                        bottom: '10px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.4)',
                    }}
                />
                <SpeechToText setCallAPI={setCallAPI} setText={setText}/>
            </Box>
        </Box>
    );
}

export default AddPost;