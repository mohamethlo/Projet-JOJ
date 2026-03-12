import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useVisitorEngagement } from '@/context/VisitorEngagementContext';
import { Toaster } from 'sonner';
import {
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    MoreHorizontal,
    User,
    Calendar,
    Building2,
    MapPin,
    Utensils,
    Compass,
    BadgeCheck,
    Send,
    Flag,
    EyeOff,
    Link2,
    X,
    MessageSquare,
    Newspaper,
    Plus,
    Tag,
    Eye,
    Sparkles,
    Palette,
    Search,
    Filter,
    Trash2,
    Edit3,
    Video,
    Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from '@/context/NotificationContext';

import { Comment, Post } from '@/types/feed';
import { MOCK_POSTS } from '@/data/mockFeedData';
import { useFeed } from '@/context/FeedContext';
import useProtectedAction from '../../hooks/useProtectedAction';

const CATEGORIES = [
    { id: 'culture', label: 'Culture', color: 'from-orange-500 to-amber-600' },
    { id: 'promotion', label: 'Promotion', color: 'from-emerald-500 to-green-600' },
    { id: 'event', label: 'Événement', color: 'from-blue-500 to-indigo-600' },
    { id: 'story', label: 'Histoire', color: 'from-purple-500 to-pink-600' }
];

// Categories for the tabs

const PostCard = ({ post }: { post: Post }) => {
    const { user: currentUser } = useAuth();
    const { addNotification } = useNotifications();
    const { performAction, AuthModalComponent } = useProtectedAction();
    const navigate = useNavigate();
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [localComments, setLocalComments] = useState<Comment[]>(post.mockComments || []);
    const [replyingTo, setReplyingTo] = useState<{ id: string, author: string } | null>(null);

    const { likePost, savePost } = useFeed();

    const handleLike = () => {
        performAction(() => {
            likePost(post.id);

            if (!post.isLiked && currentUser?.id !== post.author.id) {
                addNotification({
                    type: 'like',
                    title: 'Nouveau J\'aime',
                    message: `${currentUser?.name || 'Un utilisateur'} a aimé votre publication: "${post.content.substring(0, 30)}..."`,
                    authorId: post.author.id,
                    link: `/ echos - senegal ? postId = ${post.id} `
                });
            }
        });
    };

    const handleSave = () => {
        performAction(() => {
            savePost(post.id);
            const savedPosts = JSON.parse(localStorage.getItem('discoversenegal_saved_posts') || '[]');
            if (!post.isSaved) {
                localStorage.setItem('discoversenegal_saved_posts', JSON.stringify([...savedPosts, post.id]));
            } else {
                localStorage.setItem('discoversenegal_saved_posts', JSON.stringify(savedPosts.filter((id: string) => id !== post.id)));
            }
            window.dispatchEvent(new Event('storage_updated'));
        });
    };

    const handleDeleteComment = (commentId: string) => {
        const removeFromList = (list: Comment[]): Comment[] => {
            return list
                .filter(c => c.id !== commentId)
                .map(c => ({
                    ...c,
                    replies: c.replies ? removeFromList(c.replies) : []
                }));
        };
        setLocalComments(removeFromList(localComments));
    };

    const handlePublishComment = () => {
        if (!newComment.trim()) return;

        performAction(() => {
            const comment: Comment = {
                id: Date.now().toString(),
                author: currentUser?.name || 'Visiteur',
                avatar: currentUser?.avatar || '/images/nouveau_logo.jpeg',
                text: newComment,
                date: 'À l\'instant',
                replies: []
            };

            if (replyingTo) {
                const updateReplies = (comments: Comment[]): Comment[] => {
                    return comments.map(c => {
                        if (c.id === replyingTo.id) {
                            return { ...c, replies: [...(c.replies || []), comment] };
                        }
                        if (c.replies && c.replies.length > 0) {
                            return { ...c, replies: updateReplies(c.replies) };
                        }
                        return c;
                    });
                };
                setLocalComments(updateReplies(localComments));
                setReplyingTo(null);
            } else {
                setLocalComments([comment, ...localComments]);
                // Notify post author
                if (currentUser?.id !== post.author.id) {
                    addNotification({
                        type: 'comment',
                        title: 'Nouveau Commentaire',
                        message: `${currentUser?.name || 'Un utilisateur'} a commenté votre publication.`,
                        authorId: post.author.id,
                        link: `/echos-senegal?postId=${post.id}`
                    });
                }
            }
            setNewComment('');
        });
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `Découvrez la publication de ${post.author.name} sur DiscoverSenegal`,
                    text: post.content,
                    url: window.location.origin + `/echos-senegal?postId=${post.id}`,
                });
                addNotification({
                    type: 'system',
                    title: 'Partagé avec succès',
                    message: 'La publication a été partagée.',
                    authorId: 'system',
                });
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(window.location.origin + `/echos-senegal?postId=${post.id}`);
                addNotification({
                    type: 'system',
                    title: 'Lien copié',
                    message: 'Le lien de la publication a été copié dans le presse-papiers.',
                    authorId: 'system',
                });
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const CommentItem = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
        <div className={cn("relative", isReply ? "ml-6 mt-3 pl-4" : "mt-4")}>
            {isReply && (
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#F2A900]/40 to-transparent" />
            )}
            <div className="flex space-x-3 group/comment animate-in fade-in slide-in-from-left-2 duration-500">
                <Avatar className={cn(
                    "shrink-0 transition-transform group-hover/comment:scale-110",
                    isReply ? "h-6 w-6" : "h-8 w-8"
                )}>
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback className="text-[10px] bg-[#EBE3D5] text-[#2D1B08]">{comment.author.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <div className="bg-[#EBE3D5]/20 hover:bg-[#EBE3D5]/30 rounded-2xl px-4 py-2.5 transition-colors">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[11px] font-black text-[#2D1B08] tracking-tight">{comment.author}</span>
                            <span className="text-[9px] text-[#5D4037]/40 font-bold uppercase tracking-widest">{comment.date}</span>
                        </div>
                        <p className="text-xs text-[#2D1B08]/90 leading-relaxed font-medium">{comment.text}</p>
                    </div>
                    <div className="flex items-center gap-5 mt-1.5 ml-2">
                        <button
                            className="text-[9px] font-black text-[#F2A900] hover:text-[#D49400] uppercase tracking-widest transition-colors flex items-center gap-1"
                            onClick={() => setReplyingTo({ id: comment.id, author: comment.author })}
                        >
                            <MessageCircle size={10} />
                            Répondre
                        </button>
                        <button className="text-[9px] font-black text-[#5D4037]/30 hover:text-[#1B5E20] uppercase tracking-widest transition-colors flex items-center gap-1">
                            <Heart size={10} />
                            J'aime
                        </button>
                        {(currentUser?.name === comment.author || currentUser?.id === post.author.id) && (
                            <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-[9px] font-black text-red-300 hover:text-red-500 uppercase tracking-widest transition-colors"
                            >
                                Supprimer
                            </button>
                        )}
                        {comment.author === post.author.name && (
                            <Badge className="bg-[#1B5E20] text-white text-[7px] font-black px-1.5 py-0 rounded-full uppercase tracking-tighter">
                                Officiel
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
            {comment.replies && comment.replies.length > 0 && (
                <div className="space-y-2">
                    {comment.replies.map(reply => (
                        <CommentItem key={reply.id} comment={reply} isReply />
                    ))}
                </div>
            )}
        </div>
    );

    const getActorIcon = (type: Post['author']['type']) => {
        switch (type) {
            case 'hotel': return <Building2 size={14} />;
            case 'restaurant': return <Utensils size={14} />;
            case 'guide': return <Compass size={14} />;
            case 'cultural': return <Calendar size={14} />;
            default: return <User size={14} />;
        }
    };

    return (
        <Card id={`post - ${post.id} `} className="mb-8 border-[#EBE3D5] shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white/80 backdrop-blur-sm scroll-mt-24">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <div className="flex items-center space-x-3">
                    <Link to="/establishment/1" className="shrink-0">
                        <Avatar className="h-10 w-10 border border-[#F2A900]/20 hover:border-[#F2A900] transition-colors cursor-pointer">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback className="bg-[#EBE3D5] text-[#2D1B08]">{post.author.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                            <Link to="/establishment/1" className="group">
                                <h3 className="text-sm font-black text-[#2D1B08] group-hover:text-[#F2A900] cursor-pointer transition-colors leading-tight truncate">
                                    {post.author.name}
                                </h3>
                            </Link>
                            <div className="flex items-center gap-1">
                                {post.author.isVerified && <Badge className="bg-[#1B5E20] h-3.5 w-3.5 p-0 flex items-center justify-center rounded-full"><BadgeCheck className="h-2.5 w-2.5 text-white" /></Badge>}
                                <span className="text-[10px] text-[#5D4037]/60 font-bold uppercase tracking-wider hidden sm:inline">•</span>
                                <div className="flex items-center text-[9px] sm:text-[10px] text-[#5D4037]/60 font-bold uppercase tracking-wider gap-2">
                                    <span className="flex items-center gap-1">
                                        {getActorIcon(post.author.type)}
                                        {post.author.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-[9px] text-[#5D4037]/40 font-bold uppercase tracking-tight mt-0.5 sm:mt-0">
                            {post.date}
                        </div>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-[#5D4037]/40 hover:text-[#2D1B08]">
                            <MoreHorizontal size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border-[#EBE3D5] shadow-xl">
                        <DropdownMenuItem className="text-xs font-bold text-[#2D1B08] flex items-center gap-2 cursor-pointer hover:bg-[#F2A900]/10">
                            <Flag size={14} className="text-[#F2A900]" /> SIGNALER LA PUBLICATION
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs font-bold text-[#2D1B08] flex items-center gap-2 cursor-pointer hover:bg-[#F2A900]/10">
                            <EyeOff size={14} /> MASQUER CE POST
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs font-bold text-[#2D1B08] flex items-center gap-2 cursor-pointer hover:bg-[#F2A900]/10">
                            <Link2 size={14} /> COPIER LE LIEN
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent className="p-0">
                <div className="px-4 py-3">
                    <p className="text-sm text-[#2D1B08] leading-relaxed whitespace-pre-wrap font-medium">
                        {post.content}
                    </p>
                    {post.location && (
                        <div className="flex items-center gap-1 mt-2 text-[#1B5E20] text-xs font-bold">
                            <MapPin size={12} />
                            {post.location}
                        </div>
                    )}
                </div>

                {/* Multi-image support simplified for demo */}
                <div className={cn(
                    "grid gap-1 mt-2",
                    post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
                )}>
                    {post.images.map((img, idx) => (
                        <div key={idx} className="aspect-square overflow-hidden bg-gray-100">
                            <img
                                src={img}
                                alt={`Post image ${idx + 1} `}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="flex flex-col p-0 border-t border-[#EBE3D5]/30">
                {post.views !== undefined && (
                    <div className="w-full px-4 py-1.5 bg-gray-50/50 border-b border-[#EBE3D5]/20 flex items-center gap-2">
                        <Eye size={12} className="text-[#5D4037]/40" />
                        <span className="text-[10px] sm:text-xs font-black text-[#5D4037]/60 tracking-widest uppercase">
                            {post.views.toLocaleString()} VUES
                        </span>
                    </div>
                )}
                <div className="flex items-center justify-between w-full p-3 sm:p-4 pt-2 sm:pt-3">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <button
                            onClick={handleLike}
                            className={cn(
                                "flex items-center gap-1.5 transition-all",
                                post.isLiked ? "text-[#F2A900]" : "text-[#5D4037]/60 hover:text-[#F2A900]"
                            )}
                        >
                            <Heart size={18} className={cn("sm:w-5 sm:h-5", post.isLiked ? "fill-current" : "")} />
                            <span className="text-[11px] sm:text-xs font-black">{post.likes}</span>
                        </button>
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className={cn(
                                "flex items-center gap-1.5 transition-all",
                                showComments ? "text-[#F2A900]" : "text-[#5D4037]/60 hover:text-[#F2A900]"
                            )}
                        >
                            <MessageCircle size={18} className={cn("sm:w-5 sm:h-5", showComments ? "fill-current" : "")} />
                            <span className="text-[11px] sm:text-xs font-black">{post.comments}</span>
                        </button>
                        <button className="text-[#5D4037]/60 hover:text-[#F2A900] transition-all" onClick={handleShare}>
                            <Share2 size={18} className="sm:w-5 sm:h-5" />
                        </button>
                        <button
                            className="text-[#5D4037]/60 hover:text-[#F2A900] transition-all flex items-center gap-1.5"
                            onClick={() => performAction(() => navigate(`/messages?userId=${post.author.id}`))}
                        >
                            <MessageSquare size={18} className="sm:w-5 sm:h-5" />
                            <span className="text-[10px] font-black uppercase tracking-wider hidden xs:inline">Contacter</span>
                        </button>
                    </div>
                    <button
                        onClick={handleSave}
                        className={cn(
                            "transition-all hover:scale-110 active:scale-95",
                            post.isSaved ? "text-[#1B5E20]" : "text-[#5D4037]/60 hover:text-[#1B5E20]"
                        )}
                    >
                        <Bookmark size={18} className={cn("sm:w-5 sm:h-5", post.isSaved ? "fill-current" : "")} />
                    </button>
                </div>

                {/* Comment Section */}
                {showComments && (
                    <div className="w-full px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
                        {/* Scrollable area for comments */}
                        <div className="space-y-4 mb-4 border-t border-[#EBE3D5]/20 pt-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                            {localComments.map((comment) => (
                                <CommentItem key={comment.id} comment={comment} />
                            ))}
                        </div>

                        <div className="flex flex-col gap-2 border-t border-[#EBE3D5]/20 pt-3">
                            {replyingTo && (
                                <div className="flex items-center justify-between px-3 py-1.5 bg-[#F2A900]/5 rounded-lg border border-[#F2A900]/10 animate-in slide-in-from-bottom-1">
                                    <span className="text-[10px] font-bold text-[#F2A900]">
                                        En réponse à <span className="font-black uppercase tracking-wider">{replyingTo.author}</span>
                                    </span>
                                    <button
                                        onClick={() => setReplyingTo(null)}
                                        className="text-[#F2A900] hover:text-[#D49400] transition-colors"
                                    >
                                        <X size={12} className="stroke-[3]" />
                                    </button>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 shrink-0">
                                    <AvatarImage src="/images/nouveau_logo.jpeg" />
                                    <AvatarFallback>MO</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handlePublishComment()}
                                        placeholder={replyingTo ? `@${replyingTo.author} Votre réponse...` : "Ajouter un commentaire..."}
                                        className="w-full bg-[#EBE3D5]/20 border-none rounded-full px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#F2A900] outline-none pr-10 font-medium"
                                        autoFocus={!!replyingTo}
                                    />
                                    <button
                                        onClick={handlePublishComment}
                                        disabled={!newComment.trim()}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F2A900] transition-colors disabled:opacity-30 p-1"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardFooter>
            {AuthModalComponent}
        </Card >
    );
};

const DiscoverFeedPage = () => {
    const { user: currentUser, logout } = useAuth();
    const { addNotification } = useNotifications();
    const { posts, addPost } = useFeed();
    const { AuthModalComponent, performAction } = useProtectedAction();
    const { trackScroll } = useVisitorEngagement();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'create' | 'my-posts'>(
        (searchParams.get('tab') as 'all' | 'saved' | 'create' | 'my-posts') || 'all'
    );
    const [savedPostIds, setSavedPostIds] = useState<string[]>([]);

    // State for MyPostsTab (Moved up to prevent hook errors)
    const [myPosts, setMyPosts] = useState<Post[]>(MOCK_POSTS.filter(p => p.author.id === 'u1'));
    const [myPostsSearchQuery, setMyPostsSearchQuery] = useState('');
    const [myPostsFilterCategory, setMyPostsFilterCategory] = useState('All');

    // States for Publishing Form
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [video, setVideo] = useState<string | null>(null);
    const [videoDuration, setVideoDuration] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showPreview, setShowPreview] = useState(true);

    useEffect(() => {
        const loadSaved = () => {
            const saved = JSON.parse(localStorage.getItem('discoversenegal_saved_posts') || '[]');
            setSavedPostIds(saved);
        };
        loadSaved();

        // Listen for changes in localStorage from same window (like Save button clicks)
        window.addEventListener('storage_updated', loadSaved);
        return () => window.removeEventListener('storage_updated', loadSaved);
    }, []);

    // Intelligent Scroll Tracking for Visitors
    useEffect(() => {
        if (currentUser) return; // Only for visitors

        let lastScrollTop = 0;
        let scrollSteps = 0;
        const threshold = 500; // Track every 500px of scroll

        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop + threshold) {
                scrollSteps++;
                lastScrollTop = st;
                trackScroll(); // Signal a "scroll step"
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentUser, trackScroll]);

    const filteredPosts = activeTab === 'all'
        ? posts
        : posts.filter(post => savedPostIds.includes(post.id));

    const handleTabChange = (tab: 'all' | 'saved' | 'create' | 'my-posts') => {
        setActiveTab(tab);
        setSearchParams({ tab });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation: Format
        if (!['video/mp4', 'video/webm'].includes(file.type)) {
            toast.error('Format vidéo non supporté (MP4 ou WebM uniquement)');
            return;
        }

        // Validation: Size (50MB)
        if (file.size > 50 * 1024 * 1024) {
            toast.error('La vidéo est trop lourde (Max 50Mo)');
            return;
        }

        // Create temporary video element to check duration
        const videoElement = document.createElement('video');
        videoElement.src = URL.createObjectURL(file);
        videoElement.onloadedmetadata = () => {
            if (videoElement.duration > 120) { // 2 minutes max
                toast.error('La vidéo est trop longue (Max 2 minutes)');
                URL.revokeObjectURL(videoElement.src);
                return;
            }

            setVideoDuration(videoElement.duration);

            // Simulation upload process
            setUploadProgress(10);
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setVideo(videoElement.src);
                        return 100;
                    }
                    return prev + 15;
                });
            }, 300);
        };
    };

    const removeVideo = () => {
        setVideo(null);
        setVideoDuration(null);
        setUploadProgress(0);
    };

    const handleSubmitPost = async () => {
        if (!content.trim()) {
            toast.error('Veuillez ajouter du texte à votre publication');
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            const newPost: Post = {
                id: Date.now().toString(),
                author: {
                    id: currentUser?.id || 'guest',
                    name: currentUser?.name || 'Utilisateur',
                    role: currentUser?.role || 'Visiteur',
                    avatar: currentUser?.avatar || '/images/nouveau_logo.jpeg',
                    type: currentUser?.role === 'hotel' ? 'hotel' : 'cultural',
                    isVerified: true
                },
                content: content,
                images: images,
                video: video || undefined,
                views: 0,
                likes: 0,
                comments: 0,
                date: "À l'instant",
                isLiked: false,
                isSaved: false
            };

            addPost(newPost);
            toast.success('Publication créée avec succès !');

            // Notify followers (Simulation)
            if (currentUser?.role === 'hotel' || currentUser?.role === 'restaurant') {
                addNotification({
                    type: 'publish',
                    title: 'Nouvelle Publication',
                    message: `${currentUser.name} vient de publier un nouveau récit de voyage!`,
                    authorId: currentUser.id,
                    link: `/ echos - senegal`
                });
            }

            setIsSubmitting(false);
            setContent('');
            setImages([]);
            setVideo(null);
            setVideoDuration(null);
            setUploadProgress(0);
            setSelectedCategory('');
            handleTabChange('all');
        }, 1500);
    };

    const renderMyPostsTab = () => {
        const filteredManagedPosts = myPosts.filter(post =>
            (post.content.toLowerCase().includes(myPostsSearchQuery.toLowerCase())) &&
            (myPostsFilterCategory === 'All' || post.author.role.includes(myPostsFilterCategory)) // Simplified for mock
        );

        const handleDelete = (id: string) => {
            if (window.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
                setMyPosts(myPosts.filter(p => p.id !== id));
                toast.success('Publication supprimée');
            }
        };

        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6 sm:space-y-8 text-left">
                {/* Stats Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl sm:rounded-[2.5rem]">
                        <CardContent className="p-3 sm:p-5 flex items-center gap-2 sm:gap-4">
                            <div className="bg-blue-50 p-2 sm:p-3 rounded-xl sm:rounded-2xl shrink-0"><Eye className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" /></div>
                            <div className="min-w-0">
                                <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1 sm:mb-1.5 truncate">Vues</p>
                                <p className="text-sm sm:text-xl font-black text-[#2D1B08]">3,550</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl sm:rounded-[2.5rem]">
                        <CardContent className="p-3 sm:p-5 flex items-center gap-2 sm:gap-4">
                            <div className="bg-red-50 p-2 sm:p-3 rounded-xl sm:rounded-2xl shrink-0"><Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" /></div>
                            <div className="min-w-0">
                                <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1 sm:mb-1.5 truncate">Likes</p>
                                <p className="text-sm sm:text-xl font-black text-[#2D1B08]">735</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl sm:rounded-[2.5rem]">
                        <CardContent className="p-3 sm:p-5 flex items-center gap-2 sm:gap-4">
                            <div className="bg-amber-50 p-2 sm:p-3 rounded-xl sm:rounded-2xl shrink-0"><MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" /></div>
                            <div className="min-w-0">
                                <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1 sm:mb-1.5 truncate">Réponses</p>
                                <p className="text-sm sm:text-xl font-black text-[#2D1B08]">85</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl sm:rounded-[2.5rem]">
                        <CardContent className="p-3 sm:p-5 flex items-center gap-2 sm:gap-4">
                            <div className="bg-emerald-50 p-2 sm:p-3 rounded-xl sm:rounded-2xl shrink-0"><Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" /></div>
                            <div className="min-w-0">
                                <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1 sm:mb-1.5 truncate">Publiés</p>
                                <p className="text-sm sm:text-xl font-black text-[#2D1B08]">{myPosts.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters Strip */}
                <div className="flex flex-col md:flex-row gap-4 mb-4 bg-white/50 p-2 sm:p-4 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-[#EBE3D5] shadow-sm">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5D4037]/40" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={myPostsSearchQuery}
                            onChange={(e) => setMyPostsSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white/80 border-2 border-transparent focus:border-[#F2A900] rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-bold transition-all outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-[#6B4226] shrink-0" />
                        {['All', 'Culture', 'Promotion', 'Histoire'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setMyPostsFilterCategory(cat)}
                                className={cn(
                                    "px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-widest transition-all border-2 whitespace-nowrap",
                                    myPostsFilterCategory === cat
                                        ? "bg-[#6B4226] text-white border-transparent shadow-md"
                                        : "bg-white text-[#5D4037] border-gray-100 hover:border-[#F2A900]"
                                )}
                            >
                                {cat === 'All' ? 'Tous' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Posts List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredManagedPosts.map((post) => (
                        <Card
                            key={post.id}
                            className="group overflow-hidden border-2 border-[#EBE3D5] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-[#F2A900] transition-all duration-500 rounded-[2rem] flex flex-col"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={post.images[0]}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge className="bg-emerald-500 hover:bg-emerald-600 px-3 py-1 font-black text-[9px] uppercase tracking-widest border-none">
                                        Publié
                                    </Badge>
                                </div>
                                <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="flex gap-2">
                                        <Button
                                            size="icon"
                                            className="h-8 w-8 rounded-full bg-white text-[#6B4226] hover:bg-[#6B4226] hover:text-white border-2 border-[#EBE3D5] shadow-lg"
                                            onClick={() => handleTabChange('create')}
                                        >
                                            <Edit3 size={14} />
                                        </Button>
                                        <Button
                                            size="icon"
                                            className="h-8 w-8 rounded-full bg-white text-red-600 hover:bg-red-600 hover:text-white border-2 border-[#EBE3D5] shadow-lg"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 text-[10px] font-black text-[#5D4037]/50 uppercase tracking-[0.2em] mb-3">
                                    <Calendar size={12} className="text-[#F2A900]" />
                                    {post.date}
                                </div>
                                <p className="text-sm text-[#2D1B08]/90 font-bold leading-relaxed line-clamp-2 mb-6 text-left">
                                    {post.content}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t-2 border-[#EBE3D5]/30">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-[#5D4037]/60">
                                            <Heart size={14} className="fill-[#F2A900]/20 text-[#F2A900]" />
                                            <span className="text-xs font-black text-[#2D1B08]">{post.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#5D4037]/60">
                                            <MessageCircle size={14} className="fill-blue-500/20 text-blue-500" />
                                            <span className="text-xs font-black text-[#2D1B08]">{post.comments}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-[#F2A900] font-black text-[10px] uppercase tracking-widest hover:bg-[#F2A900]/10 rounded-xl"
                                        onClick={() => window.location.hash = `post - ${post.id} `}
                                    >
                                        VOIR LE RÉCIT
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredManagedPosts.length === 0 && (
                    <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-[#EBE3D5]">
                        <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#EBE3D5] shadow-inner">
                            <Search className="h-8 w-8 text-[#EBE3D5]" />
                        </div>
                        <h3 className="text-xl font-black text-[#2D1B08] mb-2 uppercase tracking-tighter">Aucun récit trouvé</h3>
                        <p className="text-[#5D4037]/60 font-bold mb-8">Commencez par partager votre première histoire !</p>
                        <Button
                            onClick={() => handleTabChange('create')}
                            className="bg-[#F2A900] hover:bg-[#D49400] text-white font-black rounded-xl px-8 py-6 shadow-xl shadow-[#F2A900]/20 gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            CRÉER UNE PUBLICATION
                        </Button>
                    </div>
                )}
            </div>
        );
    };

    const renderPublishingTab = () => (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className={`grid gap - 6 sm: gap - 8 ${showPreview ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'} `}>
                {/* Form Section */}
                <div className="space-y-6">
                    <Card className="border-2 border-[#EBE3D5] shadow-sm overflow-hidden rounded-[2rem]">
                        <CardHeader className="bg-gradient-to-r from-[#6B4226] to-[#2D1B08] text-white py-4 sm:py-6 px-5 sm:px-8">
                            <CardTitle className="text-lg sm:text-xl flex items-center gap-2 sm:gap-3">
                                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-[#F2A900]" />
                                Exprimez-vous
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                            {/* Category Selection */}
                            <div className="space-y-3 sm:space-y-4">
                                <Label className="text-xs sm:text-sm font-black text-[#2D1B08] flex items-center uppercase tracking-widest">
                                    <Tag className="h-3.5 w-3.5 mr-2 text-[#F2A900]" />
                                    Catégorie
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(selectedCategory === cat.label ? '' : cat.label)}
                                            className={`px - 3 py - 1.5 sm: px - 5 sm: py - 2.5 rounded - xl sm: rounded - 2xl text - [8px] sm: text - [10px] font - black uppercase tracking - widest transition - all border - 2 ${selectedCategory === cat.label
                                                ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg scale-105`
                                                : 'bg-white text-[#5D4037] border-[#EBE3D5] hover:border-[#F2A900]'
                                                } `}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="space-y-3 sm:space-y-4">
                                <Label htmlFor="content" className="text-xs sm:text-sm font-black text-[#2D1B08] uppercase tracking-widest">
                                    Votre récit
                                </Label>
                                <Textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Partagez un souvenir, une découverte..."
                                    className="min-h-[140px] sm:min-h-[180px] border-2 border-[#EBE3D5] focus:border-[#F2A900] text-sm sm:text-base rounded-2xl sm:rounded-[1.5rem] transition-all resize-none p-4 sm:p-5 bg-gray-50/30 focus:bg-white"
                                />
                                <div className="flex justify-between items-center px-1">
                                    <p className="text-[9px] text-[#5D4037]/40 font-bold uppercase tracking-widest">
                                        {content.length} caractères • Utilisez des #hashtags
                                    </p>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="space-y-4 flex-1 min-w-[200px]">
                                        <Label className="text-sm font-black text-[#2D1B08] flex items-center uppercase tracking-widest">
                                            <Palette className="h-4 w-4 mr-2 text-[#F2A900]" />
                                            Photos (jusqu'à 4)
                                        </Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {images.map((img, index) => (
                                                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#EBE3D5] group">
                                                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-white/90 p-1.5 rounded-full text-red-500 hover:bg-white shadow-md transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                            {images.length < 4 && (
                                                <label className="aspect-square rounded-2xl border-2 border-dashed border-[#EBE3D5] flex flex-col items-center justify-center cursor-pointer hover:border-[#F2A900] hover:bg-[#F2A900]/5 transition-all group">
                                                    <Plus className="h-6 w-6 text-[#EBE3D5] group-hover:text-[#F2A900] transform group-hover:rotate-90 transition-all" />
                                                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4 flex-1 min-w-[200px] opacity-50 grayscale pointer-events-none">
                                        <Label className="text-sm font-black text-[#2D1B08] flex items-center uppercase tracking-widest">
                                            <Video className="h-4 w-4 mr-2 text-[#F2A900]" />
                                            Vidéo (Prochainement)
                                        </Label>
                                        <div className="h-[100px] sm:h-[120px] rounded-2xl border-2 border-dashed border-[#EBE3D5] flex flex-col items-center justify-center bg-gray-50/50">
                                            <Video className="h-6 w-6 text-[#EBE3D5]" />
                                            <p className="text-[8px] font-black text-gray-400 mt-2 uppercase tracking-widest">Indisponible momentanément</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button
                                    onClick={handleSubmitPost}
                                    disabled={isSubmitting}
                                    className="w-full bg-[#F2A900] hover:bg-[#D49400] text-white font-black py-5 sm:py-7 rounded-xl sm:rounded-[1.5rem] text-[11px] sm:text-sm uppercase tracking-[0.2em] shadow-xl shadow-[#F2A900]/20 transition-all active:scale-[0.98]"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            EN COURS...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                                            PUBLIER MAINTENANT
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Section */}
                {showPreview && (
                    <div className="lg:sticky lg:top-28 space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-[10px] font-black text-[#5D4037]/30 uppercase tracking-[0.3em] flex items-center">
                                <Eye size={12} className="mr-2" />
                                {window.innerWidth < 1024 ? 'Aperçu de votre publication' : 'Aperçu en direct'}
                            </h3>
                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-[10px] font-black text-[#F2A900] uppercase hover:underline"
                            >
                                Masquer
                            </button>
                        </div>

                        <div className="bg-white rounded-[2.5rem] overflow-hidden border-2 border-[#EBE3D5] shadow-2xl transform hover:rotate-1 transition-all duration-700">
                            {/* Same PostCard UI but for preview */}
                            <div className="p-6 flex items-center justify-between border-b-2 border-[#EBE3D5]/50">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border-2 border-[#F2A900]/20">
                                        <AvatarImage src={currentUser?.avatar} />
                                        <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="text-[13px] font-black text-[#2D1B08]">{currentUser?.name || 'Utilisateur'}</h4>
                                        <div className="flex items-center text-[10px] text-[#5D4037]/50 font-bold uppercase tracking-widest">
                                            Dakar • À l'instant
                                        </div>
                                    </div>
                                </div>
                                {selectedCategory && (
                                    <Badge className="bg-[#EBE3D5] text-[#2D1B08] font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border-none">
                                        {selectedCategory}
                                    </Badge>
                                )}
                            </div>

                            <div className="p-8">
                                <p className="text-base text-[#2D1B08]/90 leading-relaxed font-medium whitespace-pre-wrap italic">
                                    "{content || "Votre incroyable histoire commencera ici..."}"
                                </p>
                            </div>

                            {images.length > 0 && (
                                <div className={cn(
                                    "grid gap-0.5 rounded-2xl overflow-hidden",
                                    images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                                )}>
                                    {images.map((img, i) => (
                                        <div key={i} className="aspect-square">
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="p-6 border-t border-[#EBE3D5]/50 flex items-center justify-between bg-gray-50/30">
                                <div className="flex items-center gap-6">
                                    <Heart size={18} className="text-[#5D4037]/20" />
                                    <MessageCircle size={18} className="text-[#5D4037]/20" />
                                </div>
                                <div className="text-[9px] font-black text-[#F2A900] uppercase tracking-[0.2em] bg-[#F2A900]/10 px-3 py-1.5 rounded-full">
                                    Nouveau Récit
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50/50 border-2 border-orange-100 rounded-[1.5rem] p-5 flex gap-4 text-orange-800">
                            <Sparkles className="h-6 w-6 text-orange-400 shrink-0" />
                            <div className="text-[11px] font-medium leading-relaxed">
                                <p className="font-black uppercase tracking-widest mb-1 text-orange-900">Conseil d'expert</p>
                                <p className="opacity-80">Les récits avec des photos de haute qualité et une touche personnelle reçoivent 3x plus d'interactions !</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Highlight the post briefly
                    element.classList.add('ring-2', 'ring-[#F2A900]', 'ring-offset-4');
                    setTimeout(() => {
                        element.classList.remove('ring-2', 'ring-[#F2A900]', 'ring-offset-4');
                    }, 2000);
                }, 500);
            }
        }
    }, []);

    return (
        <div className={cn(
            "mx-auto py-8 px-3 sm:px-6 transition-all duration-500",
            (activeTab === 'create' || activeTab === 'my-posts') ? "max-w-6xl" : "max-w-2xl"
        )}>
            <div className="mb-10 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F2A900]/10 border border-[#F2A900]/20 rounded-full mb-4">
                    <Compass className="h-4 w-4 text-[#F2A900]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#F2A900]">Communauté</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-[#2D1B08] tracking-tighter mb-4 uppercase">
                    ÉCHOS DU <span className="text-[#F2A900]">SÉNÉGAL</span>
                </h1>
                <p className="text-[#5D4037]/70 font-medium max-w-lg">
                    Explorez les récits, évènements et secrets partagés par les acteurs du tourisme sénégalais.
                </p>
            </div>

            {/* Tab System */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-[#EBE3D5]/20 p-1 rounded-[2rem] mb-8 sm:mb-12 shadow-inner border-2 border-[#EBE3D5]/30">
                <button
                    onClick={() => handleTabChange('all')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-4 rounded-[1.5rem] transition-all duration-300 min-w-0",
                        activeTab === 'all'
                            ? "bg-white text-[#F2A900] shadow-xl"
                            : "text-[#5D4037]/40 hover:text-[#5D4037] hover:bg-white/50"
                    )}
                >
                    <Newspaper size={18} className="sm:w-4 sm:h-4 shrink-0" />
                    <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">Flux</span>
                </button>
                <button
                    onClick={() => handleTabChange('saved')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-4 rounded-[1.5rem] transition-all duration-300 min-w-0",
                        activeTab === 'saved'
                            ? "bg-white text-[#1B5E20] shadow-xl"
                            : "text-[#5D4037]/40 hover:text-[#5D4037] hover:bg-white/50"
                    )}
                >
                    <Bookmark size={18} className="sm:w-4 sm:h-4 shrink-0" />
                    <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">Sauvegardes</span>
                    {savedPostIds.length > 0 && (
                        <span className="flex items-center justify-center min-w-[12px] h-3 bg-[#1B5E20] text-white text-[6px] rounded-full px-1 font-black">
                            {savedPostIds.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => navigate('/videos')}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-4 rounded-[1.5rem] transition-all duration-300 min-w-0 text-[#F2A900]/40 hover:text-[#F2A900] hover:bg-[#F2A900]/5"
                >
                    <Video size={18} className="sm:w-4 sm:h-4 shrink-0" />
                    <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">Vidéos</span>
                    <span className="flex items-center justify-center min-w-[16px] h-4 bg-[#F2A900] text-white text-[7px] rounded-full px-1 font-black animate-pulse">
                        NEW
                    </span>
                </button>
                {currentUser && (
                    <>
                        <button
                            onClick={() => handleTabChange('my-posts')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-4 rounded-[1.5rem] transition-all duration-300 min-w-0",
                                activeTab === 'my-posts'
                                    ? "bg-white text-[#6B4226] shadow-xl"
                                    : "text-[#5D4037]/40 hover:text-[#5D4037] hover:bg-white/50"
                            )}
                        >
                            <Edit3 size={18} className="sm:w-4 sm:h-4 shrink-0" />
                            <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">Publications</span>
                        </button>
                        <button
                            onClick={() => handleTabChange('create')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-4 rounded-[1.5rem] transition-all duration-300 min-w-0",
                                activeTab === 'create'
                                    ? "bg-white text-[#F2A900] shadow-xl"
                                    : "text-[#5D4037]/40 hover:text-[#5D4037] hover:bg-white/50"
                            )}
                        >
                            <Plus size={18} className="sm:w-4 sm:h-4 shrink-0" />
                            <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">Publier</span>
                        </button>
                    </>
                )}
            </div>

            <div className="flex flex-col min-h-[400px]">
                {activeTab === 'create' ? (
                    renderPublishingTab()
                ) : activeTab === 'my-posts' ? (
                    renderMyPostsTab()
                ) : filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in duration-700">
                        <div className="w-24 h-24 bg-[#EBE3D5]/20 rounded-full flex items-center justify-center mb-8 text-[#5D4037]/10">
                            {activeTab === 'saved' ? <Bookmark size={48} /> : <Newspaper size={48} />}
                        </div>
                        <h3 className="text-2xl font-black text-[#2D1B08] mb-4 uppercase tracking-tighter">
                            {activeTab === 'saved' ? "Aucune sauvegarde" : "Rien à voir ici"}
                        </h3>
                        <p className="text-[#5D4037]/60 text-sm max-w-sm font-medium leading-relaxed">
                            {activeTab === 'saved'
                                ? "C'est l'endroit idéal pour garder les récits qui vous inspirent le plus. Commencez par explorer le flux !"
                                : "Le flux est actuellement calme. Soyez le premier à partager une histoire !"}
                        </p>
                        <Button
                            variant="link"
                            onClick={() => handleTabChange('all')}
                            className="mt-6 text-[#F2A900] font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform"
                        >
                            Découvrir le flux
                        </Button>
                    </div>
                )}
            </div>

            {/* Loading Skeleton Simulation/End of feed */}
            <div className="text-center py-12 border-t border-[#EBE3D5] opacity-50">
                <div className="inline-block w-8 h-8 border-4 border-[#F2A900]/30 border-t-[#F2A900] rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5D4037]">Chargement de nouveaux récits...</p>
            </div>
            {AuthModalComponent}
        </div>
    );
};

export default DiscoverFeedPage;
