import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Search,
    MessageCircle,
    Phone,
    Video,
    MoreVertical,
    Send,
    Mic,
    Smile,
    ArrowLeft,
    Check,
    CheckCheck,
    BadgeCheck,
    X as XIcon,
    Image as ImageIcon,
    Film
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Play,
    Pause,
    Maximize2,
    FileVideo,
    Plus,
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { AudioPlayer } from '@/components/ui/AudioPlayer';

// Types
interface User {
    id: string;
    name: string;
    avatar: string;
    type: 'hotel' | 'restaurant' | 'guide' | 'tourist';
    isVerified?: boolean;
    isOnline?: boolean;
}

interface Message {
    id: string;
    senderId: string;
    text?: string;
    images?: string[]; // Multiple images support
    video?: string;   // Video support
    audio?: string;
    audioDuration?: number;
    timestamp: Date;
    isRead: boolean;
    sticker?: string; // African sticker support
    reactions?: { emoji: string; count: number; users: string[] }[]; // Emoji reactions
}

interface Conversation {
    id: string;
    participant: User;
    lastMessage: Message;
    unreadCount: number;
    messages: Message[];
}

interface ConversationListProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filterType: 'all' | 'hotel' | 'restaurant' | 'guide';
    setFilterType: (type: 'all' | 'hotel' | 'restaurant' | 'guide') => void;
    filteredConversations: Conversation[];
    activeConversation: Conversation | null;
    setActiveConversation: (conv: Conversation) => void;
    setIsMobileView: (val: boolean) => void;
    getRelativeTime: (date: Date) => string;
}

interface ChatInterfaceProps {
    activeConversation: Conversation | null;
    setIsMobileView: (val: boolean) => void;
    newMessage: string;
    setNewMessage: (val: string) => void;
    handleSendMessage: () => void;
    isRecording: boolean;
    duration: number;
    isCancelZone: boolean;
    handleMicPress: (e: React.MouseEvent | React.TouchEvent) => void;
    formatDuration: (seconds: number) => string;
    getRelativeTime: (date: Date) => string;

    // Media props
    pendingMedia: { file: File; preview: string; type: 'image' | 'video' }[];
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => void;
    removePendingMedia: (index: number) => void;
    openLightbox: (url: string, type: 'image' | 'video') => void;
    imageInputRef: React.RefObject<HTMLInputElement | null>;
    videoInputRef: React.RefObject<HTMLInputElement | null>;
    isUploading: boolean;

    // Interactive props
    showStickers: boolean;
    setShowStickers: (val: boolean) => void;
    handleSendSticker: (icon: string) => void;
    handleReaction: (messageId: string, emoji: string) => void;
    handleMessagePress: (messageId: string) => void;
    africanStickers: { id: string; label: string; icon: string; description: string }[];
    activeMessageForReaction: string | null;
    setActiveMessageForReaction: (id: string | null) => void;
}

// Sub-components
// Sub-components
const MediaGrid = ({
    images,
    video,
    onMediaClick
}: {
    images?: string[],
    video?: string,
    onMediaClick: (url: string, type: 'image' | 'video') => void
}) => {
    if (!images?.length && !video) return null;

    const allMedia = [
        ...(images || []).map(img => ({ url: img, type: 'image' as const })),
        ...(video ? [{ url: video, type: 'video' as const }] : [])
    ];

    const count = allMedia.length;

    return (
        <div className={cn(
            "grid gap-1 rounded-xl overflow-hidden mt-2 border border-[#EBE3D5]/30 shadow-inner bg-[#EBE3D5]/10",
            count === 1 ? "grid-cols-1" :
                count === 2 ? "grid-cols-2" :
                    count === 3 ? "grid-cols-2" : "grid-cols-2"
        )}>
            {allMedia.map((media, idx) => (
                <div
                    key={idx}
                    className={cn(
                        "relative cursor-pointer group hover:opacity-95 transition-opacity bg-black/5",
                        count === 3 && idx === 0 ? "row-span-2 h-full" : "h-40",
                        count === 1 && "h-auto max-h-[400px]"
                    )}
                    onClick={() => onMediaClick(media.url, media.type)}
                >
                    {media.type === 'image' ? (
                        <img
                            src={media.url}
                            alt="Media"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <VideoPlayer src={media.url} onExpand={() => onMediaClick(media.url, 'video')} />
                    )}
                    {idx === 3 && count > 4 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-black text-xl">+{count - 4}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const VideoPlayer = ({ src, onExpand }: { src: string, onExpand: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="relative group rounded-xl overflow-hidden bg-black max-w-sm">
            <video
                ref={videoRef}
                src={src}
                className="w-full h-auto cursor-pointer"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white pointer-events-auto"
                    onClick={togglePlay}
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white pointer-events-auto"
                    onClick={(e) => { e.stopPropagation(); onExpand(); }}
                >
                    <Maximize2 size={16} />
                </Button>
            </div>
        </div>
    );
};

const ConversationList = ({
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filteredConversations,
    activeConversation,
    setActiveConversation,
    setIsMobileView,
    getRelativeTime
}: ConversationListProps) => (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-md border-r-2 border-[#EBE3D5]">
        {/* Header */}
        <div className="p-4 border-b-2 border-[#EBE3D5]">
            <h1 className="text-2xl font-black text-[#2D1B08] tracking-tighter mb-4">Messages</h1>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Rechercher une conversation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-[#EBE3D5]/20 border-none rounded-full text-sm font-medium focus:ring-1 focus:ring-[#F2A900]"
                />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {[
                    { value: 'all', label: 'Tous' },
                    { value: 'hotel', label: 'Hôtels' },
                    { value: 'restaurant', label: 'Restaurants' },
                    { value: 'guide', label: 'Guides' }
                ].map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => setFilterType(filter.value as any)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 whitespace-nowrap",
                            filterType === filter.value
                                ? "bg-[#6B4226] text-white border-transparent"
                                : "bg-white text-[#5D4037] border-gray-100 hover:border-[#F2A900]"
                        )}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredConversations.map((conv) => (
                <button
                    key={conv.id}
                    onClick={() => {
                        setActiveConversation(conv);
                        setIsMobileView(true);
                    }}
                    className={cn(
                        "w-full p-4 flex items-start gap-3 hover:bg-[#F2A900]/5 transition-colors border-b border-[#EBE3D5]/30",
                        activeConversation?.id === conv.id && "bg-[#F2A900]/10"
                    )}
                >
                    <div className="relative shrink-0">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                            <AvatarImage src={conv.participant.avatar} />
                            <AvatarFallback>{conv.participant.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        {conv.participant.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#1B5E20] border-2 border-white rounded-full" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-1 mb-0.5">
                            <span className="text-sm font-black text-[#2D1B08] truncate">{conv.participant.name}</span>
                            {conv.participant.isVerified && (
                                <BadgeCheck className="h-3.5 w-3.5 text-[#1B5E20] shrink-0" />
                            )}
                        </div>
                        <p className="text-xs text-[#5D4037]/70 font-medium truncate">
                            {conv.lastMessage.audio ? (
                                <span className="flex items-center gap-1">
                                    <Mic size={12} className="text-[#F2A900]" />
                                    Message vocal
                                </span>
                            ) : (
                                conv.lastMessage.text
                            )}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[9px] font-bold text-[#5D4037]/50 uppercase">
                            {getRelativeTime(conv.lastMessage.timestamp)}
                        </span>
                        {conv.unreadCount > 0 && (
                            <Badge className="bg-[#F2A900] hover:bg-[#F2A900] h-5 min-w-[20px] px-1.5 flex items-center justify-center">
                                <span className="text-[10px] font-black">{conv.unreadCount}</span>
                            </Badge>
                        )}
                    </div>
                </button>
            ))}
        </div>
    </div>
);

const ChatInterface = ({
    activeConversation,
    setIsMobileView,
    newMessage,
    setNewMessage,
    handleSendMessage,
    isRecording,
    duration,
    isCancelZone,
    handleMicPress,
    formatDuration,
    getRelativeTime,
    pendingMedia,
    handleFileSelect,
    removePendingMedia,
    openLightbox,
    imageInputRef,
    videoInputRef,
    isUploading,
    showStickers,
    setShowStickers,
    handleSendSticker,
    handleReaction,
    handleMessagePress,
    africanStickers,
    activeMessageForReaction,
    setActiveMessageForReaction
}: ChatInterfaceProps) => {
    if (!activeConversation) {
        return (
            <div className="h-full flex items-center justify-center bg-[#FFFDFB]">
                <div className="text-center">
                    <div className="bg-[#F2A900]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="h-10 w-10 text-[#F2A900]" />
                    </div>
                    <h3 className="text-xl font-black text-[#2D1B08] mb-2">Sélectionnez une conversation</h3>
                    <p className="text-sm text-[#5D4037]/60 font-medium">Choisissez un contact pour commencer à discuter</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-[#FFFDFB]">
            {/* Chat Header */}
            <div className="p-4 border-b-2 border-[#EBE3D5] bg-white/80 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileView(false)}
                        className="lg:hidden"
                    >
                        <ArrowLeft size={20} />
                    </Button>
                    <Avatar className="h-10 w-10 border-2 border-[#F2A900]/20">
                        <AvatarImage src={activeConversation.participant.avatar} />
                        <AvatarFallback>{activeConversation.participant.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-black text-[#2D1B08]">{activeConversation.participant.name}</span>
                            {activeConversation.participant.isVerified && (
                                <BadgeCheck className="h-3.5 w-3.5 text-[#1B5E20]" />
                            )}
                        </div>
                        <span className="text-[10px] text-[#5D4037]/60 font-bold uppercase">
                            {activeConversation.participant.isOnline ? 'En ligne' : 'Hors ligne'}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-[#5D4037]/60 hover:text-[#F2A900]">
                        <Phone size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#5D4037]/60 hover:text-[#F2A900]">
                        <Video size={18} />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-[#5D4037]/60 hover:text-[#F2A900]">
                                <MoreVertical size={18} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-2xl border-2 border-[#EBE3D5]">
                            <DropdownMenuItem className="rounded-xl font-bold cursor-pointer">
                                Bloquer
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl font-bold cursor-pointer">
                                Signaler
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl font-bold text-red-600 cursor-pointer">
                                Supprimer la conversation
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Messages Area */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar"
                onClick={() => setActiveMessageForReaction(null)}
            >
                {activeConversation.messages.map((message) => {
                    const isSent = message.senderId === 'me';
                    return (
                        <div key={message.id} className={cn("flex group/msg", isSent ? "justify-end" : "justify-start")}>
                            <div
                                className={cn(
                                    "max-w-[70%] rounded-2xl relative transition-all duration-300 active:scale-[0.98] select-none cursor-pointer",
                                    message.audio || message.sticker ? "" : "px-4 py-2.5",
                                    isSent
                                        ? "bg-[#F2A900]/10 border border-[#F2A900]/20"
                                        : "bg-[#EBE3D5]/30"
                                )}
                                onClick={() => handleMessagePress(message.id)}
                            >
                                {/* Double Tap Heart Animation */}
                                {message.reactions?.find(r => r.emoji === '❤️' && r.users.includes('me')) && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl">
                                        <div className="text-red-500 animate-[heart-pulse_0.8s_ease-out_forwards] opacity-0">
                                            ❤️
                                        </div>
                                    </div>
                                )}
                                {message.audio ? (
                                    <div className="p-2">
                                        <AudioPlayer
                                            audioUrl={message.audio}
                                            duration={message.audioDuration}
                                            isSent={isSent}
                                        />
                                        <div className="flex items-center gap-1 mt-1 justify-end px-2">
                                            <span className="text-[9px] text-[#5D4037]/50 font-bold">
                                                {getRelativeTime(message.timestamp)}
                                            </span>
                                            {isSent && (
                                                message.isRead ? (
                                                    <CheckCheck size={12} className="text-[#1B5E20]" />
                                                ) : (
                                                    <Check size={12} className="text-[#5D4037]/40" />
                                                )
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {(message.images || message.video) && (
                                            <MediaGrid
                                                images={message.images}
                                                video={message.video}
                                                onMediaClick={openLightbox}
                                            />
                                        )}
                                        {message.text && (
                                            <p className="text-sm font-medium text-[#2D1B08] leading-relaxed">{message.text}</p>
                                        )}
                                        {message.sticker && (
                                            <div className="text-5xl py-2 animate-in zoom-in duration-300 select-none">
                                                {message.sticker}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1 mt-1 justify-end">
                                            <span className="text-[9px] text-[#5D4037]/50 font-bold">
                                                {getRelativeTime(message.timestamp)}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-4 w-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveMessageForReaction(activeMessageForReaction === message.id ? null : message.id);
                                                }}
                                            >
                                                <Smile size={10} className="text-[#5D4037]/40" />
                                            </Button>
                                            {isSent && (
                                                message.isRead ? (
                                                    <CheckCheck size={12} className="text-[#1B5E20]" />
                                                ) : (
                                                    <Check size={12} className="text-[#5D4037]/40" />
                                                )
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Reaction Picker Popover */}
                                {activeMessageForReaction === message.id && (
                                    <div className={cn(
                                        "absolute -top-10 bg-white shadow-xl border border-[#EBE3D5] rounded-full p-1 flex gap-1 z-50 animate-in zoom-in duration-200",
                                        isSent ? "right-0" : "left-0"
                                    )}>
                                        {['❤️', '🔥', '👏', '😍'].map(emoji => (
                                            <button
                                                key={emoji}
                                                className="hover:scale-125 transition-transform p-1 px-2 text-lg active:scale-90"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleReaction(message.id, emoji);
                                                    setActiveMessageForReaction(null);
                                                }}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Reactions Display */}
                                {message.reactions && message.reactions.length > 0 && (
                                    <div className={cn(
                                        "absolute -bottom-3 flex flex-wrap gap-1 items-center z-10",
                                        isSent ? "right-2" : "left-2"
                                    )}>
                                        {message.reactions.map((r, i) => (
                                            <div
                                                key={i}
                                                className="bg-white/90 backdrop-blur-sm border border-[#EBE3D5] rounded-full px-1.5 py-0.5 flex items-center gap-1 shadow-sm animate-in zoom-in duration-300"
                                                title={r.users.join(', ')}
                                            >
                                                <span className="text-xs">{r.emoji}</span>
                                                {r.count > 1 && <span className="text-[10px] font-black text-[#5D4037]">{r.count}</span>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 backdrop-blur-sm border-t-2 border-[#EBE3D5] relative">
                {/* Multimedia Previews */}
                {pendingMedia.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar animate-in slide-in-from-bottom duration-300">
                        {pendingMedia.map((media, idx) => (
                            <div key={idx} className="relative shrink-0 group">
                                <div className="h-20 w-20 rounded-xl overflow-hidden border-2 border-[#F2A900]/20 bg-white">
                                    {media.type === 'image' ? (
                                        <img src={media.preview} alt="Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-black/10">
                                            <FileVideo size={24} className="text-[#F2A900]" />
                                        </div>
                                    )}
                                </div>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"
                                    onClick={() => removePendingMedia(idx)}
                                >
                                    <XIcon size={12} />
                                </Button>
                            </div>
                        ))}
                        <Button
                            variant="ghost"
                            className="h-20 w-20 rounded-xl border-2 border-dashed border-[#EBE3D5] flex flex-col gap-1 items-center justify-center text-[#5D4037]/40 hover:text-[#F2A900] hover:border-[#F2A900]/50 transition-colors"
                            onClick={() => imageInputRef.current?.click()}
                        >
                            <Plus size={20} />
                            <span className="text-[10px] font-black uppercase">Plus</span>
                        </Button>
                    </div>
                )}

                {/* Sticker Picker */}
                {showStickers && (
                    <div className="absolute bottom-full left-0 w-full bg-white/95 backdrop-blur-md border-t-2 border-[#EBE3D5] p-4 animate-in slide-in-from-bottom duration-300 z-50 rounded-t-3xl shadow-2xl">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <span className="text-xs font-black text-[#5D4037] uppercase tracking-widest">Stickers Africains</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setShowStickers(false)}>
                                <XIcon size={14} />
                            </Button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                            {africanStickers.map((sticker) => (
                                <button
                                    key={sticker.id}
                                    className="aspect-square flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-[#F2A900]/10 transition-all group"
                                    onClick={() => handleSendSticker(sticker.icon)}
                                >
                                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{sticker.icon}</span>
                                    <span className="text-[9px] font-bold mt-1 text-[#5D4037]/60">{sticker.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Uploading Overlay */}
                {isUploading && (
                    <div className="absolute inset-0 z-40 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300 rounded-t-2xl">
                        <Loader2 className="h-8 w-8 text-[#F2A900] animate-spin mb-2" />
                        <span className="text-[10px] font-black text-[#5D4037] uppercase tracking-widest">Envoi en cours...</span>
                    </div>
                )}

                {/* Voice Recording Overlay */}
                {isRecording && (
                    <div className="absolute inset-0 z-30 bg-[#F2A900]/5 backdrop-blur-md flex items-center justify-between px-6 animate-in slide-in-from-bottom duration-300 rounded-t-2xl border-t-2 border-[#F2A900]">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "flex items-center gap-1 min-w-[100px] transition-all duration-300",
                                isCancelZone ? "opacity-30 blur-[2px]" : "opacity-100"
                            )}>
                                {[...Array(7)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-[#F2A900] rounded-full"
                                        style={{
                                            height: `${Math.random() * 30 + 10}px`,
                                            animation: `pulse 1s ease-in-out infinite ${i * 0.1}s`
                                        }}
                                    />
                                ))}
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold uppercase tracking-widest text-[#5D4037]/60 animate-pulse",
                                isCancelZone && "text-red-500"
                            )}>
                                {isCancelZone ? "Relâcher pour annuler" : "← Glisser pour annuler"}
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-black text-[#2D1B08] tabular-nums tracking-tighter">
                                {formatDuration(duration)}
                            </span>
                            <div className={cn(
                                "h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300",
                                isCancelZone ? "bg-red-500 scale-110 shadow-lg shadow-red-500/20" : "bg-[#F2A900]/10"
                            )}>
                                {isCancelZone ? (
                                    <XIcon size={24} className="text-white" />
                                ) : (
                                    <Mic size={24} className="text-[#F2A900]" />
                                )}
                            </div>
                        </div>

                        {/* Visual indicator for cancel zone */}
                        <div className={cn(
                            "absolute bottom-0 left-0 h-1 bg-red-500 transition-all duration-300 opacity-0",
                            isCancelZone && "w-full opacity-100"
                        )} />
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {/* Hidden Native Inputs */}
                    <input
                        type="file"
                        ref={imageInputRef}
                        onChange={(e) => handleFileSelect(e, 'image')}
                        accept="image/*"
                        multiple
                        className="hidden"
                    />
                    <input
                        type="file"
                        ref={videoInputRef}
                        onChange={(e) => handleFileSelect(e, 'video')}
                        accept="video/*"
                        className="hidden"
                    />

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "h-10 w-10 rounded-full transition-all duration-300",
                            isRecording
                                ? "bg-red-500 text-white scale-125 shadow-lg shadow-red-500/20"
                                : "text-[#5D4037]/60 hover:text-[#F2A900] hover:bg-[#F2A900]/10"
                        )}
                        onMouseDown={handleMicPress}
                        onTouchStart={handleMicPress}
                    >
                        <Mic size={20} className={cn(isRecording && "text-white animate-pulse")} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#5D4037]/60 hover:text-[#F2A900] shrink-0"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <ImageIcon size={20} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#5D4037]/60 hover:text-[#F2A900] shrink-0"
                        onClick={() => videoInputRef.current?.click()}
                    >
                        <Film size={20} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("text-[#5D4037]/60 hover:text-[#F2A900] shrink-0", showStickers && "text-[#F2A900] bg-[#F2A900]/10")}
                        onClick={() => setShowStickers(!showStickers)}
                    >
                        <Smile size={20} />
                    </Button>
                    <div className="flex-1 relative">
                        <Input
                            type="text"
                            placeholder="Tapez votre message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="bg-[#EBE3D5]/20 border-none rounded-full pr-12 text-sm font-medium focus:ring-1 focus:ring-[#F2A900]"
                        />
                        <Button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim() && pendingMedia.length === 0}
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#F2A900] hover:bg-[#D49400] text-white rounded-full h-8 w-8 disabled:opacity-30"
                        >
                            <Send size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Mock Data
const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: '1',
        participant: {
            id: 'u1',
            name: 'Terrou-Bi Resort',
            avatar: '/images/nouveau_logo.jpeg',
            type: 'hotel',
            isVerified: true,
            isOnline: true
        },
        lastMessage: {
            id: 'm1',
            senderId: 'u1',
            text: 'Merci pour votre réservation ! Nous avons hâte de vous accueillir.',
            timestamp: new Date(Date.now() - 5 * 60000),
            isRead: false
        },
        unreadCount: 2,
        messages: [
            {
                id: 'm1',
                senderId: 'u1',
                text: 'Bonjour ! Comment puis-je vous aider ?',
                timestamp: new Date(Date.now() - 3600000),
                isRead: true
            },
            {
                id: 'm2',
                senderId: 'me',
                text: 'Je voudrais réserver une chambre pour le weekend prochain.',
                timestamp: new Date(Date.now() - 3000000),
                isRead: true
            },
            {
                id: 'm3',
                senderId: 'u1',
                text: 'Merci pour votre réservation ! Nous avons hâte de vous accueillir.',
                timestamp: new Date(Date.now() - 5 * 60000),
                isRead: false
            }
        ]
    },
    {
        id: '2',
        participant: {
            id: 'u2',
            name: 'La Fourchette',
            avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=150',
            type: 'restaurant',
            isVerified: true,
            isOnline: false
        },
        lastMessage: {
            id: 'm4',
            senderId: 'me',
            text: 'Parfait, merci !',
            timestamp: new Date(Date.now() - 7200000),
            isRead: true
        },
        unreadCount: 0,
        messages: [
            {
                id: 'm4',
                senderId: 'u2',
                text: 'Votre table est confirmée pour 20h ce soir.',
                timestamp: new Date(Date.now() - 7200000),
                isRead: true
            },
            {
                id: 'm5',
                senderId: 'me',
                text: 'Parfait, merci !',
                timestamp: new Date(Date.now() - 7200000),
                isRead: true
            }
        ]
    },
    {
        id: '4',
        participant: {
            id: 'u4',
            name: 'Hôtel Baobab',
            avatar: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=150',
            type: 'hotel',
            isVerified: false,
            isOnline: false
        },
        lastMessage: {
            id: 'm7',
            senderId: 'u4',
            text: 'Pouvez-vous confirmer votre heure d\'arrivée ?',
            timestamp: new Date(Date.now() - 172800000),
            isRead: true
        },
        unreadCount: 0,
        messages: []
    },
    {
        id: '5',
        participant: {
            id: 'u5',
            name: 'Restaurant Le Lagon',
            avatar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=150',
            type: 'restaurant',
            isVerified: true,
            isOnline: true
        },
        lastMessage: {
            id: 'm8',
            senderId: 'u5',
            text: 'Nous avons des spécialités de poissons aujourd\'hui.',
            timestamp: new Date(Date.now() - 259200000),
            isRead: true
        },
        unreadCount: 0,
        messages: []
    },
    {
        id: '6',
        participant: {
            id: 'u6',
            name: 'Fatou, Artisan Tisserande',
            avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150',
            type: 'tourist',
            isVerified: true,
            isOnline: false
        },
        lastMessage: {
            id: 'm9',
            senderId: 'u6',
            text: 'Votre commande est prête à être récupérée.',
            timestamp: new Date(Date.now() - 345600000),
            isRead: true
        },
        unreadCount: 0,
        messages: []
    },
    {
        id: '7',
        participant: {
            id: 'u7',
            name: 'Guide Touristique Saint-Louis',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
            type: 'guide',
            isVerified: false,
            isOnline: true
        },
        lastMessage: {
            id: 'm10',
            senderId: 'u7',
            text: 'Le départ est prévu pour 8h00.',
            timestamp: new Date(Date.now() - 432000000),
            isRead: true
        },
        unreadCount: 0,
        messages: []
    }
];

const MessagesPage: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'hotel' | 'restaurant' | 'guide'>('all');
    const [newMessage, setNewMessage] = useState('');
    const [isMobileView, setIsMobileView] = useState(false);
    const { isRecording, duration, audioUrl, startRecording, stopRecording, cancelRecording, resetRecording } = useVoiceRecorder();
    const [isCancelZone, setIsCancelZone] = useState(false);
    const [searchParams] = useSearchParams();

    // Handle deep linking from query params
    useEffect(() => {
        const userId = searchParams.get('userId');
        const convId = searchParams.get('convId');

        if (userId) {
            const conv = conversations.find(c => c.participant.id === userId);
            if (conv) {
                setActiveConversation(conv);
                setIsMobileView(true);
            }
        } else if (convId) {
            const conv = conversations.find(c => c.id === convId);
            if (conv) {
                setActiveConversation(conv);
                setIsMobileView(true);
            }
        }
    }, [searchParams, conversations]);

    // Media State
    const [pendingMedia, setPendingMedia] = useState<{ file: File; preview: string; type: 'image' | 'video' }[]>([]);
    const [lightboxMedia, setLightboxMedia] = useState<{ url: string; type: 'image' | 'video' } | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showStickers, setShowStickers] = useState(false);
    const [activeMessageForReaction, setActiveMessageForReaction] = useState<string | null>(null);

    // African Stickers Library
    const AFRICAN_STICKERS = [
        { id: 'teranga', label: 'Téranga', icon: '🤲', description: 'Hospitalité sénégalaise' },
        { id: 'sabar', label: 'Sabar', icon: '🥁', description: 'Danse & Rythme' },
        { id: 'soleil', label: 'Soleil', icon: '☀️', description: 'Chaleur du Sénégal' },
        { id: 'baobab', label: 'Baobab', icon: '🌳', description: 'Arbre Sacré' },
        { id: 'pirogue', label: 'Pirogue', icon: '🛶', description: 'Pêche & Tradition' },
        { id: 'lion', label: 'Lion', icon: '🦁', description: 'Symbole National' },
    ];

    // File input refs
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    // Track if mouse/touch is currently pressed and initial position
    const isPressingRef = useRef(false);
    const startXRef = useRef(0);
    const durationRef = useRef(0);
    const audioUrlRef = useRef<string | null>(null);

    // Keep refs in sync with state to avoid stale closures in global listeners
    useEffect(() => {
        durationRef.current = duration;
    }, [duration]);

    useEffect(() => {
        audioUrlRef.current = audioUrl;
    }, [audioUrl]);

    const filteredConversations = conversations.filter(conv => {
        const matchesSearch = conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'all' || conv.participant.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const getRelativeTime = (date: Date | undefined) => {
        if (!date) return 'À l\'instant';
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
        if (seconds < 60) return 'À l\'instant';
        if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)}min`;
        if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)}h`;
        return `Il y a ${Math.floor(seconds / 86400)}j`;
    };

    const lastTapRef = useRef<{ id: string; time: number } | null>(null);

    const handleReaction = (messageId: string, emoji: string) => {
        if (!activeConversation) return;

        const updateMessages = (messages: Message[]) =>
            messages.map(msg => {
                if (msg.id === messageId) {
                    const existingReactions = msg.reactions || [];
                    const reactionIndex = existingReactions.findIndex(r => r.emoji === emoji);

                    let newReactions;
                    if (reactionIndex > -1) {
                        const r = existingReactions[reactionIndex];
                        if (r.users.includes('me')) {
                            // Remove reaction
                            newReactions = existingReactions.filter(curr => curr.emoji !== emoji);
                        } else {
                            // Add user to reaction
                            newReactions = [...existingReactions];
                            newReactions[reactionIndex] = {
                                ...r,
                                count: r.count + 1,
                                users: [...r.users, 'me']
                            };
                        }
                    } else {
                        // New reaction
                        newReactions = [...existingReactions, { emoji, count: 1, users: ['me'] }];
                    }
                    return { ...msg, reactions: newReactions };
                }
                return msg;
            });

        setConversations(prev => prev.map(conv =>
            conv.id === activeConversation.id
                ? { ...conv, messages: updateMessages(conv.messages), lastMessage: updateMessages([conv.lastMessage])[0] }
                : conv
        ));

        setActiveConversation(prev => prev ? {
            ...prev,
            messages: updateMessages(prev.messages),
            lastMessage: updateMessages([prev.lastMessage])[0]
        } : null);
    };

    const handleSendSticker = (stickerIcon: string) => {
        if (!activeConversation) return;

        const nextMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: 'me',
            sticker: stickerIcon,
            timestamp: new Date(),
            isRead: false
        };

        setConversations(prev => prev.map(conv =>
            conv.id === activeConversation.id
                ? { ...conv, messages: [...conv.messages, nextMessage], lastMessage: nextMessage }
                : conv
        ));

        setActiveConversation(prev => prev ? {
            ...prev,
            messages: [...prev.messages, nextMessage],
            lastMessage: nextMessage
        } : null);

        setShowStickers(false);
    };

    const handleMessagePress = (messageId: string) => {
        const now = Date.now();
        if (lastTapRef.current && lastTapRef.current.id === messageId && (now - lastTapRef.current.time) < 300) {
            // Double tap detected
            handleReaction(messageId, '❤️');
            lastTapRef.current = null;
        } else {
            lastTapRef.current = { id: messageId, time: now };
        }
    };

    const handleSendMessage = () => {
        if ((!newMessage.trim() && pendingMedia.length === 0) || !activeConversation) return;

        setIsUploading(true);

        // Simulate upload delay
        setTimeout(() => {
            const nextMessage: Message = {
                id: `msg-${Date.now()}`,
                senderId: 'me',
                text: newMessage,
                images: pendingMedia.filter(m => m.type === 'image').map(m => m.preview),
                video: pendingMedia.find(m => m.type === 'video')?.preview,
                timestamp: new Date(),
                isRead: false
            };

            setConversations(prev => prev.map(conv =>
                conv.id === activeConversation.id
                    ? { ...conv, messages: [...conv.messages, nextMessage], lastMessage: nextMessage }
                    : conv
            ));

            setActiveConversation(prev => prev ? {
                ...prev,
                messages: [...prev.messages, nextMessage],
                lastMessage: nextMessage
            } : null);

            setNewMessage('');
            setPendingMedia([]);
            setIsUploading(false);
        }, 800);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Limit check: 25MB
        const MAX_SIZE = 25 * 1024 * 1024;
        const oversizedFiles = files.filter(f => f.size > MAX_SIZE);
        if (oversizedFiles.length > 0) {
            alert(`Certains fichiers dépassent la limite de 25MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
            return;
        }

        const newMedia = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            type
        }));

        setPendingMedia(prev => [...prev, ...newMedia]);

        // Reset input
        e.target.value = '';
    };

    const removePendingMedia = (index: number) => {
        setPendingMedia(prev => {
            const copy = [...prev];
            URL.revokeObjectURL(copy[index].preview);
            copy.splice(index, 1);
            return copy;
        });
    };

    const openLightbox = (url: string, type: 'image' | 'video') => {
        setLightboxMedia({ url, type });
    };

    const handleMicPress = (e: React.MouseEvent | React.TouchEvent) => {
        isPressingRef.current = true;
        if ('touches' in e) {
            startXRef.current = e.touches[0].clientX;
        } else {
            startXRef.current = e.clientX;
        }
        startRecording();
        setIsCancelZone(false);
    };

    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
            if (!isRecording || !isPressingRef.current) return;
            const currentX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
            const distance = startXRef.current - currentX;
            if (distance > 100) {
                if (!isCancelZone) {
                    setIsCancelZone(true);
                    if (navigator.vibrate) navigator.vibrate(30);
                }
            } else {
                if (isCancelZone) setIsCancelZone(false);
            }
        };

        const handleGlobalRelease = () => {
            if (!isPressingRef.current) return;
            isPressingRef.current = false;
            const capturedDuration = durationRef.current;

            if (isCancelZone) {
                cancelRecording();
            } else {
                stopRecording();
                setTimeout(() => {
                    const finalAudioUrl = audioUrlRef.current;
                    if (finalAudioUrl && activeConversation) {
                        const newVoiceMessage: Message = {
                            id: `msg-${Date.now()}`,
                            senderId: 'me',
                            audio: finalAudioUrl,
                            audioDuration: capturedDuration || 1,
                            timestamp: new Date(),
                            isRead: false
                        };
                        setConversations(prev => prev.map(conv =>
                            conv.id === activeConversation.id
                                ? { ...conv, messages: [...conv.messages, newVoiceMessage], lastMessage: newVoiceMessage }
                                : conv
                        ));
                        setActiveConversation(prev => prev ? {
                            ...prev,
                            messages: [...prev.messages, newVoiceMessage],
                            lastMessage: newVoiceMessage
                        } : null);
                    }
                    resetRecording();
                }, 600);
            }
            setIsCancelZone(false);
        };

        document.addEventListener('mousemove', handleGlobalMove);
        document.addEventListener('touchmove', handleGlobalMove, { passive: false });
        document.addEventListener('mouseup', handleGlobalRelease);
        document.addEventListener('touchend', handleGlobalRelease);

        return () => {
            document.removeEventListener('mousemove', handleGlobalMove);
            document.removeEventListener('touchmove', handleGlobalMove);
            document.removeEventListener('mouseup', handleGlobalRelease);
            document.removeEventListener('touchend', handleGlobalRelease);
        };
    }, [isRecording, isCancelZone, cancelRecording, stopRecording, resetRecording, activeConversation]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-[calc(100dvh-20px)] lg:h-[calc(100vh-140px)] bg-white rounded-3xl lg:border-2 border-[#EBE3D5] overflow-hidden shadow-sm flex flex-col">
            <div className="hidden lg:grid lg:grid-cols-[384px_1fr] flex-1 min-h-0">
                <div className="h-full overflow-hidden">
                    <ConversationList
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filterType={filterType}
                        setFilterType={setFilterType}
                        filteredConversations={filteredConversations}
                        activeConversation={activeConversation}
                        setActiveConversation={setActiveConversation}
                        setIsMobileView={setIsMobileView}
                        getRelativeTime={getRelativeTime}
                    />
                </div>
                <div className="h-full overflow-hidden">
                    <ChatInterface
                        activeConversation={activeConversation}
                        setIsMobileView={setIsMobileView}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        handleSendMessage={handleSendMessage}
                        isRecording={isRecording}
                        duration={duration}
                        isCancelZone={isCancelZone}
                        handleMicPress={handleMicPress}
                        formatDuration={formatDuration}
                        getRelativeTime={getRelativeTime}
                        pendingMedia={pendingMedia}
                        handleFileSelect={handleFileSelect}
                        removePendingMedia={removePendingMedia}
                        openLightbox={openLightbox}
                        imageInputRef={imageInputRef}
                        videoInputRef={videoInputRef}
                        isUploading={isUploading}
                        showStickers={showStickers}
                        setShowStickers={setShowStickers}
                        handleSendSticker={handleSendSticker}
                        handleReaction={handleReaction}
                        handleMessagePress={handleMessagePress}
                        africanStickers={AFRICAN_STICKERS}
                        activeMessageForReaction={activeMessageForReaction}
                        setActiveMessageForReaction={setActiveMessageForReaction}
                    />
                </div>
            </div>

            <div className="lg:hidden h-full overflow-hidden">
                {!isMobileView || !activeConversation ? (
                    <div className="h-full overflow-hidden">
                        <ConversationList
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            filterType={filterType}
                            setFilterType={setFilterType}
                            filteredConversations={filteredConversations}
                            activeConversation={activeConversation}
                            setActiveConversation={setActiveConversation}
                            setIsMobileView={setIsMobileView}
                            getRelativeTime={getRelativeTime}
                        />
                    </div>
                ) : (
                    <div className="h-full overflow-hidden">
                        <ChatInterface
                            activeConversation={activeConversation}
                            setIsMobileView={setIsMobileView}
                            newMessage={newMessage}
                            setNewMessage={setNewMessage}
                            handleSendMessage={handleSendMessage}
                            isRecording={isRecording}
                            duration={duration}
                            isCancelZone={isCancelZone}
                            handleMicPress={handleMicPress}
                            formatDuration={formatDuration}
                            getRelativeTime={getRelativeTime}
                            pendingMedia={pendingMedia}
                            handleFileSelect={handleFileSelect}
                            removePendingMedia={removePendingMedia}
                            openLightbox={openLightbox}
                            imageInputRef={imageInputRef}
                            videoInputRef={videoInputRef}
                            isUploading={isUploading}
                            showStickers={showStickers}
                            setShowStickers={setShowStickers}
                            handleSendSticker={handleSendSticker}
                            handleReaction={handleReaction}
                            handleMessagePress={handleMessagePress}
                            africanStickers={AFRICAN_STICKERS}
                            activeMessageForReaction={activeMessageForReaction}
                            setActiveMessageForReaction={setActiveMessageForReaction}
                        />
                    </div>
                )}
            </div>

            {/* Lightbox Overlay */}
            {lightboxMedia && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
                    <div className="flex justify-end p-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/10 rounded-full h-12 w-12"
                            onClick={() => setLightboxMedia(null)}
                        >
                            <XIcon size={32} />
                        </Button>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-4">
                        {lightboxMedia.type === 'image' ? (
                            <img
                                src={lightboxMedia.url}
                                alt="Zoom"
                                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                            />
                        ) : (
                            <video
                                src={lightboxMedia.url}
                                controls
                                autoPlay
                                className="max-w-full max-h-full rounded-lg shadow-2xl"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesPage;
