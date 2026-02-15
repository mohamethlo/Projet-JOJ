import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Music, MapPin, Play, Plus, Check, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFeed } from '@/context/FeedContext';
import { useAuth } from '@/context/AuthContext';
import { Comment } from '@/types/feed';
import { toast } from 'sonner';

interface VerticalVideoItemProps {
    video: {
        id: string;
        url: string;
        author: {
            id: string;
            name: string;
            avatar: string;
            isVerified: boolean;
        };
        description: string;
        location?: string;
        likes: number;
        comments: number;
        shares: number;
        isLiked: boolean;
        isSaved: boolean;
        mockComments?: Comment[];
    };
    isActive: boolean;
}

const VerticalVideoItem: React.FC<VerticalVideoItemProps> = ({ video, isActive }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { likePost, savePost } = useFeed();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [showHeartAnim, setShowHeartAnim] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const lastTap = useRef<number>(0);

    useEffect(() => {
        if (isActive) {
            videoRef.current?.play().catch(err => console.log("Autoplay blocked", err));
            setIsPlaying(true);
        } else {
            videoRef.current?.pause();
            setIsPlaying(false);
        }
    }, [isActive]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleLike = () => {
        likePost(video.id);
    };

    const handleSave = () => {
        savePost(video.id);
        if (!video.isSaved) {
            toast.success('Vidéo enregistrée !', {
                description: 'Retrouvez-la dans vos favoris.',
                icon: <Bookmark className="h-4 w-4 text-[#F2A900]" />
            });
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: `Découvrez cette vidéo sur Discover Sénégal`,
            text: video.description,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Lien copié !', {
                    description: 'Partagez-le avec vos amis.',
                    icon: <Share2 className="h-4 w-4 text-blue-500" />
                });
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    const handleDoubleTap = () => {
        const now = Date.now();
        if (now - lastTap.current < 300) {
            if (!video.isLiked) handleLike();
            setShowHeartAnim(true);
            setTimeout(() => setShowHeartAnim(false), 800);
        }
        lastTap.current = now;
    };

    const { user: currentUser } = useAuth();
    const { addComment } = useFeed();

    const handlePublishComment = () => {
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            author: currentUser?.name || 'Visiteur',
            avatar: currentUser?.avatar || '/images/nouveau_logo.jpeg',
            text: newComment,
            date: 'À l\'instant',
            replies: []
        };

        addComment(video.id, comment);
        setNewComment('');
        toast.success('Commentaire publié !');
    };

    const formatCount = (count: number) => {
        if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
        return count.toString();
    };

    return (
        <div
            className="w-full h-full snap-start relative bg-black flex items-center justify-center overflow-hidden"
            onClick={handleDoubleTap}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={video.url}
                className="w-full h-full object-cover"
                loop
                playsInline
                onClick={togglePlay}
            />

            {/* Play/Pause Overlay Icon */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="p-6 rounded-full bg-black/20 backdrop-blur-sm">
                        <Play size={64} className="text-white/80 fill-current ml-2" />
                    </div>
                </div>
            )}

            {/* Like Animation */}
            {showHeartAnim && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Heart size={100} className="text-[#F2A900] fill-current animate-ping opacity-80" />
                </div>
            )}

            {/* RIGHT SIDEBAR ACTIONS */}
            <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-10">
                {/* Author Avatar */}
                <div className="relative mb-2">
                    <Avatar className="h-12 w-12 border-2 border-white ring-2 ring-[#F2A900]/20">
                        <AvatarImage src={video.author.avatar} />
                        <AvatarFallback>{video.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsFollowed(!isFollowed); }}
                        className={cn(
                            "absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white transition-all",
                            isFollowed ? "bg-emerald-500 scale-90" : "bg-[#F2A900] hover:scale-110"
                        )}
                    >
                        {isFollowed ? <Check size={10} className="text-white" /> : <Plus size={12} className="text-white" />}
                    </button>
                </div>

                {/* Like */}
                <button
                    onClick={(e) => { e.stopPropagation(); handleLike(); }}
                    className="flex flex-col items-center gap-1 group"
                >
                    <div className={cn(
                        "p-3 rounded-full bg-black/20 backdrop-blur-md transition-all group-active:scale-125",
                        video.isLiked ? "text-red-500" : "text-white"
                    )}>
                        <Heart size={28} className={cn(video.isLiked && "fill-current")} />
                    </div>
                    <span className="text-white text-[10px] font-black uppercase tracking-widest drop-shadow-md">
                        {formatCount(video.likes)}
                    </span>
                </button>

                {/* Comments */}
                <button
                    onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
                    className="flex flex-col items-center gap-1 group"
                >
                    <div className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white transition-all group-active:scale-125">
                        <MessageCircle size={28} />
                    </div>
                    <span className="text-white text-[10px] font-black uppercase tracking-widest drop-shadow-md">
                        {formatCount(video.comments)}
                    </span>
                </button>

                {/* Save */}
                <button
                    onClick={(e) => { e.stopPropagation(); handleSave(); }}
                    className="flex flex-col items-center gap-1 group"
                >
                    <div className={cn(
                        "p-3 rounded-full bg-black/20 backdrop-blur-md transition-all group-active:scale-125",
                        video.isSaved ? "text-[#F2A900]" : "text-white"
                    )}>
                        <Bookmark size={28} className={cn(video.isSaved && "fill-current")} />
                    </div>
                    <span className="text-white text-[10px] font-black uppercase tracking-widest drop-shadow-md text-center">
                        {video.isSaved ? 'Sauvé' : 'Enregistrer'}
                    </span>
                </button>

                {/* Share */}
                <button
                    onClick={(e) => { e.stopPropagation(); handleShare(); }}
                    className="flex flex-col items-center gap-1 group"
                >
                    <div className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white transition-all group-active:scale-125">
                        <Share2 size={28} />
                    </div>
                    <span className="text-white text-[10px] font-black uppercase tracking-widest drop-shadow-md">
                        {formatCount(video.shares)}
                    </span>
                </button>
            </div>

            {/* COMMENT DRAWER OVERLAY */}
            {showComments && (
                <div
                    className="absolute inset-x-0 bottom-0 top-0 bg-black/40 z-[100] transition-opacity"
                    onClick={() => setShowComments(false)}
                >
                    <div
                        className="absolute inset-x-0 bottom-0 h-[65%] bg-[#FAF9F6] rounded-t-[32px] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Drawer Header */}
                        <div className="p-4 flex items-center justify-between border-b border-[#2D1B08]/5">
                            <div className="w-10 h-10" /> {/* Spacer */}
                            <h3 className="text-[13px] font-black text-[#2D1B08] uppercase tracking-widest">
                                {video.comments} commentaires
                            </h3>
                            <button
                                onClick={() => setShowComments(false)}
                                className="p-2 hover:bg-[#2D1B08]/5 rounded-full transition-colors text-[#2D1B08]"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Comments List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar">
                            {video.mockComments && video.mockComments.length > 0 ? (
                                video.mockComments.map((comment) => (
                                    <div key={comment.id} className="flex gap-3">
                                        <Avatar className="h-8 w-8 shrink-0">
                                            <AvatarImage src={comment.avatar} />
                                            <AvatarFallback className="bg-[#EBE3D5] text-[#2D1B08] text-[10px]">
                                                {comment.author.substring(0, 1)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[11px] font-black text-[#2D1B08]">{comment.author}</span>
                                                <span className="text-[9px] text-[#5D4037]/40 font-bold uppercase tracking-widest">{comment.date}</span>
                                            </div>
                                            <p className="text-xs text-[#2D1B08]/90 leading-relaxed font-medium">
                                                {comment.text}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <button className="text-[9px] font-black text-[#5D4037]/30 hover:text-[#F2A900] transition-colors uppercase tracking-widest">Répondre</button>
                                                <button className="flex items-center gap-1 text-[9px] font-black text-[#5D4037]/30 hover:text-red-500 transition-colors uppercase tracking-widest">
                                                    <Heart size={10} />
                                                    0
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-16 h-16 bg-[#2D1B08]/5 rounded-full flex items-center justify-center mb-4">
                                        <MessageCircle size={32} className="text-[#5D4037]/20" />
                                    </div>
                                    <p className="text-xs font-black text-[#2D1B08]/40 uppercase tracking-widest">Soyez le premier à commenter</p>
                                </div>
                            )}
                        </div>

                        {/* Comment Input */}
                        <div className="p-4 bg-white border-t border-[#2D1B08]/5 flex items-center gap-3">
                            <Avatar className="h-8 w-8 shrink-0">
                                <AvatarFallback className="bg-[#F2A900] text-white text-[10px]">VOUS</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Ajouter un commentaire..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handlePublishComment();
                                    }}
                                    className="w-full bg-[#2D1B08]/5 rounded-full px-4 py-2.5 text-xs text-[#2D1B08] placeholder:text-[#5D4037]/40 focus:outline-none pr-10"
                                />
                                <button
                                    onClick={handlePublishComment}
                                    disabled={!newComment.trim()}
                                    className={cn(
                                        "absolute right-2 top-1/2 -translate-y-1/2 transition-colors",
                                        newComment.trim() ? "text-[#F2A900]" : "text-[#5D4037]/20"
                                    )}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* BOTTOM INFO OVERLAY */}
            <div className="absolute bottom-0 left-0 right-16 p-6 pb-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none">
                <div className="space-y-3 pointer-events-auto">
                    {/* Location */}
                    {video.location && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2A900]/20 backdrop-blur-md border border-[#F2A900]/30 rounded-full">
                            <MapPin size={12} className="text-[#F2A900]" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{video.location}</span>
                        </div>
                    )}

                    {/* Author Name */}
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-white tracking-tight">@{video.author.name.replace(/\s+/g, '').toLowerCase()}</h3>
                        {video.author.isVerified && (
                            <div className="bg-[#F2A900] rounded-full p-0.5">
                                <Check size={8} className="text-white stroke-[3]" />
                            </div>
                        )}
                        <span className="text-white/60 text-xs font-bold">• il y a 2h</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/90 leading-relaxed font-medium line-clamp-2 max-w-sm">
                        {video.description}
                    </p>

                    {/* Music/Audio */}
                    <div className="flex items-center gap-3 pt-2">
                        <div className="animate-spin-slow p-2 bg-white/10 rounded-full shrink-0">
                            <Music size={14} className="text-white" />
                        </div>
                        <div className="overflow-hidden flex-1">
                            <div className="animate-marquee whitespace-nowrap">
                                <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">Son original - {video.author.name} • Sabar Mix 2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Vinyl Record Decoration (Bottom Right) */}
            <div className="absolute right-4 bottom-12 z-10">
                <div className="w-12 h-12 bg-[#2D1B08] rounded-full border-4 border-black/50 overflow-hidden animate-spin-slow">
                    <img
                        src={video.author.avatar}
                        alt="Music"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 10s linear infinite;
                }
                .animate-spin-slow {
                    animation: spin 6s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
};

export default VerticalVideoItem;
