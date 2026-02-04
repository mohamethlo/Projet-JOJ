import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    Link2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types for our feed posts
interface Comment {
    id: string;
    author: string;
    avatar: string;
    text: string;
    date: string;
}

interface Post {
    id: string;
    author: {
        name: string;
        role: string;
        avatar: string;
        type: 'hotel' | 'restaurant' | 'guide' | 'cultural';
        isVerified?: boolean;
    };
    content: string;
    images: string[];
    likes: number;
    comments: number;
    date: string;
    location?: string;
    isLiked?: boolean;
    isSaved?: boolean;
    mockComments?: Comment[];
}

const MOCK_POSTS: Post[] = [
    {
        id: '1',
        author: {
            name: 'Terrou-Bi Resort',
            role: 'Hôtel Premium',
            avatar: '/images/logo.jpeg',
            type: 'hotel',
            isVerified: true
        },
        content: "Le coucher de soleil sur l'Atlantique n'a jamais été aussi beau. Venez vivre un moment d'exception sur notre terrasse privée. La Teranga n'est pas qu'un mot, c'est une expérience. #Dakar #LuxuryTravel #Senegal",
        images: ['/images/hero_senegal.png'],
        likes: 342,
        comments: 24,
        date: 'Il y a 2 heures',
        location: 'Dakar, Sénégal',
        isLiked: true,
        mockComments: [
            { id: 'c1', author: 'Sophie M.', avatar: 'https://i.pravatar.cc/150?u=sophie', text: 'Magnifique vue ! Je recommande vivement.', date: 'Il y a 1h' },
            { id: 'c2', author: 'Jean-Pierre', avatar: 'https://i.pravatar.cc/150?u=jp', text: 'Hâte d\'y retourner le mois prochain.', date: 'Il y a 30 min' },
            { id: 'c10', author: 'Fatou Diagne', avatar: 'https://i.pravatar.cc/150?u=fatou', text: 'Le service est irréprochable là-bas.', date: 'Il y a 15 min' }
        ]
    },
    {
        id: '2',
        author: {
            name: 'Amadou, Guide National',
            role: 'Guide Certifié',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
            type: 'guide',
            isVerified: true
        },
        content: "Aujourd'hui, nous explorons les merveilles de la Casamance. Entre mangroves et traditions ancestrales, chaque pas est un voyage dans le temps. Les cases à impluvium nous racontent le génie de nos ancêtres. #Culture #Adventure #SenegalHeritage",
        images: ['/images/case1.webp', '/images/case2.webp'],
        likes: 156,
        comments: 12,
        date: 'Il y a 5 heures',
        location: 'Ziguinchor, Casamance',
        mockComments: [
            { id: 'c3', author: 'Lucas D.', avatar: 'https://i.pravatar.cc/150?u=lucas', text: 'La Casamance est vraiment la plus belle région !', date: 'Il y a 2h' },
            { id: 'c11', author: 'Moussa Sarr', avatar: 'https://i.pravatar.cc/150?u=moussa', text: 'Est-ce que vous faites des tours groupés le weekend ?', date: 'Il y a 1h' }
        ]
    },
    {
        id: '3',
        author: {
            name: 'La Fourchette',
            role: 'Restaurant Gastronomique',
            avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=150',
            type: 'restaurant',
            isVerified: true
        },
        content: "Notre Chef revisite aujourd'hui le Thiéboudienne avec des produits locaux fraîchement pêchés. Une fusion entre tradition et modernité qui ravira vos papilles. Réservez votre table pour ce soir ! #Gastronomie #Foodies #Senegal",
        images: ['/images/thieboudienne.png'],
        likes: 890,
        comments: 56,
        date: 'Hier',
        location: 'Plateau, Dakar',
        mockComments: [
            { id: 'c4', author: 'Marie-Laure', avatar: 'https://i.pravatar.cc/150?u=marie', text: 'Le meilleur Thieb de Dakar, sans aucun doute !', date: 'Hier' },
            { id: 'c5', author: 'Thomas K.', avatar: 'https://i.pravatar.cc/150?u=thomas', text: 'La présentation est superbe.', date: 'Hier' },
            { id: 'c12', author: 'Binta Fall', avatar: 'https://i.pravatar.cc/150?u=binta', text: 'Faut-il réserver longtemps à l\'avance ?', date: 'Avant-hier' }
        ]
    },
    {
        id: '4',
        author: {
            name: 'Institut de Gorée',
            role: 'Acteur Culturel',
            avatar: '/images/goree2.webp',
            type: 'cultural',
            isVerified: true
        },
        content: "Mémoire et résilience. L'île de Gorée continue de témoigner pour les générations futures. Une visite nécessaire pour comprendre l'histoire et célébrer la liberté. #History #Gorée #Memory",
        images: ['/images/goree_history.png', '/images/esclaveGoree1.webp'],
        likes: 1205,
        comments: 45,
        date: 'Il y a 2 jours',
        location: 'Île de Gorée',
        mockComments: [
            { id: 'c6', author: 'Aminata S.', avatar: 'https://i.pravatar.cc/150?u=ami', text: 'Un lieu fort en émotions. À voir absolument.', date: 'Hier' }
        ]
    }
];

const PostCard = ({ post }: { post: Post }) => {
    const [liked, setLiked] = useState(post.isLiked);
    const [saved, setSaved] = useState(post.isSaved);
    const [likesCount, setLikesCount] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [localComments, setLocalComments] = useState<Comment[]>(post.mockComments || []);

    const handleLike = () => {
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);
    };

    const handlePublishComment = () => {
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            author: 'Vous',
            avatar: '/images/logo.jpeg',
            text: newComment,
            date: 'À l\'instant'
        };

        setLocalComments([comment, ...localComments]);
        setNewComment('');
    };

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
        <Card className="mb-8 border-[#EBE3D5] shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white/80 backdrop-blur-sm">
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
                                alt={`Post image ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="flex flex-col p-0 border-t border-[#EBE3D5]/30">
                <div className="flex items-center justify-between w-full p-3 sm:p-4 pt-2 sm:pt-3">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <button
                            onClick={handleLike}
                            className={cn(
                                "flex items-center gap-1.5 transition-all",
                                liked ? "text-[#F2A900]" : "text-[#5D4037]/60 hover:text-[#F2A900]"
                            )}
                        >
                            <Heart size={18} className={cn("sm:w-5 sm:h-5", liked ? "fill-current" : "")} />
                            <span className="text-[11px] sm:text-xs font-black">{likesCount}</span>
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
                        <button className="text-[#5D4037]/60 hover:text-[#F2A900] transition-all">
                            <Share2 size={18} className="sm:w-5 sm:h-5" />
                        </button>
                    </div>
                    <button
                        onClick={() => setSaved(!saved)}
                        className={cn(
                            "transition-all",
                            saved ? "text-[#1B5E20]" : "text-[#5D4037]/60 hover:text-[#1B5E20]"
                        )}
                    >
                        <Bookmark size={18} className={cn("sm:w-5 sm:h-5", saved ? "fill-current" : "")} />
                    </button>
                </div>

                {/* Comment Section */}
                {showComments && (
                    <div className="w-full px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
                        {/* Scrollable area for comments */}
                        <div className="space-y-4 mb-4 border-t border-[#EBE3D5]/20 pt-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                            {localComments.map((comment) => (
                                <div key={comment.id} className="flex space-x-2 animate-in fade-in duration-500">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={comment.avatar} />
                                        <AvatarFallback className="text-[10px]">{comment.author.substring(0, 1)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 bg-[#EBE3D5]/20 rounded-2xl px-3 py-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-black text-[#2D1B08]">{comment.author}</span>
                                            <span className="text-[10px] text-[#5D4037]/50">{comment.date}</span>
                                        </div>
                                        <p className="text-xs text-[#2D1B08]/80 leading-snug">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 border-t border-[#EBE3D5]/20 pt-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/images/logo.jpeg" />
                                <AvatarFallback>MO</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handlePublishComment()}
                                    placeholder="Ajouter un commentaire..."
                                    className="w-full bg-[#EBE3D5]/20 border-none rounded-full px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#F2A900] outline-none pr-10"
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
                )}
            </CardFooter>
        </Card >
    );
};

const DiscoverFeedPage = () => {
    return (
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
            <div className="mb-10 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F2A900]/10 border border-[#F2A900]/20 rounded-full mb-4">
                    <Compass className="h-4 w-4 text-[#F2A900]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#F2A900]">Communauté</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-[#2D1B08] tracking-tighter mb-4 uppercase">
                    ÉCHOS DU <span className="text-[#F2A900]">SÉNÉGAL</span>
                </h1>
                <p className="text-[#5D4037]/70 font-medium max-w-lg">
                    Explorez les récits, évènements et secrets partagés par les acteurs du tourisme sénégalais.
                    Une immersion quotidienne au cœur de la Téranga.
                </p>
            </div>

            <div className="flex flex-col">
                {MOCK_POSTS.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* Loading Skeleton Simulation/End of feed */}
            <div className="text-center py-12 border-t border-[#EBE3D5] opacity-50">
                <div className="inline-block w-8 h-8 border-4 border-[#F2A900]/30 border-t-[#F2A900] rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5D4037]">Chargement de nouveaux récits...</p>
            </div>
        </div>
    );
};

export default DiscoverFeedPage;
