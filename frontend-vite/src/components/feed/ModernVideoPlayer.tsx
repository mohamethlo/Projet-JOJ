import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ModernVideoPlayerProps {
    src: string;
    poster?: string;
    onLike?: () => void;
}

const ModernVideoPlayer: React.FC<ModernVideoPlayerProps> = ({ src, poster, onLike }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showLikeHeart, setShowLikeHeart] = useState(false);
    const lastTap = useRef<number>(0);

    const [videoRatio, setVideoRatio] = useState<number>(16 / 9);

    // Intersection Observer for auto-pause
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && isPlaying) {
                    videoRef.current?.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [isPlaying]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleFullscreen = () => {
        if (containerRef.current?.requestFullscreen) {
            containerRef.current.requestFullscreen();
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;
            setCurrentTime(current);
            setProgress((current / total) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
            const ratio = videoRef.current.videoWidth / videoRef.current.videoHeight;
            setVideoRatio(ratio);
            setIsLoading(false);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current && containerRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * videoRef.current.duration;
        }
    };

    const handleDoubleTap = (e: React.MouseEvent) => {
        const now = Date.now();
        if (now - lastTap.current < 300) {
            setShowLikeHeart(true);
            onLike?.();
            setTimeout(() => setShowLikeHeart(false), 800);
        }
        lastTap.current = now;
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "group relative bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-[#EBE3D5]/20 w-full mx-auto",
                videoRatio < 1 ? "max-w-[400px]" : "w-full",
                isLoading && "animate-pulse"
            )}
            style={{
                aspectRatio: videoRatio > 1 ? '16/9' : 'auto',
                maxHeight: videoRatio < 1 ? '600px' : 'none'
            }}
            onClick={handleDoubleTap}
        >
            {/* Blurred Background Layer (for non-standard ratios) */}
            <div
                className="absolute inset-0 z-0 opacity-50 blur-2xl scale-110 pointer-events-none"
                style={{
                    backgroundImage: `url(${poster})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Skeleton / Placeholder */}
            {isLoading && (
                <div className="absolute inset-0 bg-[#EBE3D5]/20 flex items-center justify-center z-10">
                    <div className="w-12 h-12 border-4 border-[#F2A900]/30 border-t-[#F2A900] rounded-full animate-spin" />
                </div>
            )}

            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="relative w-full h-full object-contain z-0"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                playsInline
            />

            {/* Like Animation Overlay */}
            {showLikeHeart && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <Heart className="w-24 h-24 text-[#F2A900] fill-current animate-ping" />
                </div>
            )}

            {/* Play Button Overlay (Big) */}
            {!isPlaying && !isLoading && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer z-10"
                    onClick={togglePlay}
                >
                    <div className="p-5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 transform scale-100 hover:scale-110 transition-transform">
                        <Play className="w-12 h-12 text-white fill-current" />
                    </div>
                </div>
            )}

            {/* Custom Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                {/* Progress Bar */}
                <div
                    className="relative h-1.5 sm:h-2 w-full mb-4 cursor-pointer overflow-hidden group/bar"
                    onClick={handleProgressClick}
                >
                    <Progress value={progress} className="h-full bg-white/20" />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <button onClick={togglePlay} className="text-white hover:text-[#F2A900] transition-colors">
                            {isPlaying ? <Pause className="fill-current w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="fill-current w-5 h-5 sm:w-6 sm:h-6" />}
                        </button>

                        <div className="flex items-center gap-2">
                            <button onClick={toggleMute} className="text-white hover:text-[#F2A900] transition-colors">
                                {isMuted ? <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" /> : <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />}
                            </button>
                        </div>

                        <span className="text-white text-[10px] sm:text-xs font-black tracking-widest uppercase">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <button onClick={handleFullscreen} className="text-white hover:text-[#F2A900] transition-colors">
                        <Maximize className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModernVideoPlayer;
