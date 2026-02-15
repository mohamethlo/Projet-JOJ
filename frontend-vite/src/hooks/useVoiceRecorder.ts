import { useState, useRef, useCallback, useEffect } from 'react';

interface UseVoiceRecorderReturn {
    isRecording: boolean;
    duration: number;
    audioBlob: Blob | null;
    audioUrl: string | null;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    cancelRecording: () => void;
    resetRecording: () => void;
}

export const useVoiceRecorder = (): UseVoiceRecorderReturn => {
    const [isRecording, setIsRecording] = useState(false);
    const [duration, setDuration] = useState(0);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = useCallback(async () => {
        try {
            console.log('🎤 Starting recording...');

            // Reset duration to 0 before starting
            setDuration(0);
            console.log('⏱️ Duration reset to 0');

            // Request microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 48000
                }
            });

            console.log('✅ Microphone access granted');
            streamRef.current = stream;

            // Determine supported MIME type
            const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
                ? 'audio/webm;codecs=opus'
                : MediaRecorder.isTypeSupported('audio/webm')
                    ? 'audio/webm'
                    : 'audio/mp4';

            console.log('🎵 Using MIME type:', mimeType);

            const mediaRecorder = new MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                console.log('⏹️ Recording stopped');
                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                setAudioBlob(audioBlob);
                setAudioUrl(URL.createObjectURL(audioBlob));

                // Stop all tracks
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                }
            };

            mediaRecorder.start(100); // Collect data every 100ms
            setIsRecording(true);
            console.log('🔴 Recording started! isRecording set to true');

            // Start duration timer
            timerRef.current = setInterval(() => {
                setDuration(prev => {
                    const newDuration = prev + 1;
                    console.log('⏱️ Duration updated:', newDuration);
                    // Max 2 minutes (120 seconds)
                    if (newDuration >= 120) {
                        console.log('⏰ Max duration reached, stopping...');
                        stopRecording();
                        return 120;
                    }
                    return newDuration;
                });
            }, 1000);

            // Haptic feedback (if supported)
            if (navigator.vibrate) {
                navigator.vibrate(50);
                console.log('📳 Haptic feedback triggered');
            }
        } catch (error) {
            console.error('❌ Error accessing microphone:', error);
            if (error instanceof Error) {
                alert(`Impossible d'accéder au microphone: ${error.message}\n\nVeuillez autoriser l'accès au microphone dans les paramètres de votre navigateur.`);
            } else {
                alert('Impossible d\'accéder au microphone. Veuillez autoriser l\'accès.');
            }
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);

            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(20);
            }
        }
    }, [isRecording]);

    const cancelRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setDuration(0);
            setAudioBlob(null);
            setAudioUrl(null);
            audioChunksRef.current = [];

            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            // Stop all tracks
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }

            // Haptic feedback for cancel
            if (navigator.vibrate) {
                navigator.vibrate([30, 10, 30]);
            }
        }
    }, [isRecording]);

    const resetRecording = useCallback(() => {
        setDuration(0);
        setAudioBlob(null);
        setAudioUrl(null);
        audioChunksRef.current = [];
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return {
        isRecording,
        duration,
        audioBlob,
        audioUrl,
        startRecording,
        stopRecording,
        cancelRecording,
        resetRecording
    };
};
