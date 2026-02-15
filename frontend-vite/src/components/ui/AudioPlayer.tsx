import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
    audioUrl: string;
    duration?: number;
    className?: string;
    isSent?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, duration: initialDuration, className, isSent }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(initialDuration || 0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            console.log('🎵 Audio metadata loaded, duration:', audio.duration);
            // Blobs often have Infinity as duration initially
            if (isFinite(audio.duration)) {
                setDuration(audio.duration);
            } else if (initialDuration) {
                setDuration(initialDuration);
            }
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        // Force reload if URL changes
        audio.load();

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [audioUrl, initialDuration]);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            if (audio.paused) {
                await audio.play();
            } else {
                audio.pause();
            }
        } catch (error) {
            console.error('❌ Playback error:', error);
            setIsPlaying(false);
        }
    };

    const formatTime = (time: number) => {
        if (!isFinite(time) || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className={cn(
            "flex items-center gap-3 rounded-2xl p-3 min-w-[200px]",
            isSent
                ? "bg-transparent" // On sent messages, bubble already has background
                : "bg-white/40",
            className
        )}>
            <audio ref={audioRef} src={audioUrl} preload="metadata" />

            <Button
                size="icon"
                onClick={togglePlay}
                className="h-10 w-10 rounded-full bg-[#F2A900] hover:bg-[#D49400] text-white shrink-0"
            >
                {isPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" className="ml-0.5" />}
            </Button>

            <div className="flex-1 min-w-0">
                <div className="h-1.5 bg-[#EBE3D5]/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#F2A900] rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <span className="text-xs font-bold text-[#2D1B08] shrink-0 tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
            </span>
        </div>
    );
};
