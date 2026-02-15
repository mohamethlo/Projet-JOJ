import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit3,
    Trash2,
    Eye,
    MessageSquare,
    Heart,
    Calendar,
    Sparkles
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Types and Mock Data
interface Post {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    date: string;
    category: string;
    status: 'Published' | 'Draft';
    likes: number;
    comments: number;
    views: number;
}

const MOCK_POSTS: Post[] = [
    {
        id: '1',
        title: "Soirée Grillade & Musique Live",
        content: "Rejoignez-nous ce weekend pour une expérience culinaire unique au bord de la mer...",
        thumbnail: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        date: "20 Fév 2024",
        category: "Événement",
        status: 'Published',
        likes: 245,
        comments: 42,
        views: 1200
    },
    {
        id: '2',
        title: "Nouveauté : Le Buffet du Dimanche",
        content: "Venez découvrir notre nouveau buffet africain tous les dimanches midi...",
        thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        date: "15 Fév 2024",
        category: "Promotion",
        status: 'Published',
        likes: 180,
        comments: 15,
        views: 850
    },
    {
        id: '3',
        title: "Histoire de notre établissement",
        content: "Saviez-vous que notre hôtel a été construit sur les fondations d'une ancienne résidence...",
        thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        date: "10 Fév 2024",
        category: "Histoire",
        status: 'Published',
        likes: 310,
        comments: 28,
        views: 1500
    },
    {
        id: '4',
        title: "Menu Saint-Valentin 2024",
        content: "Découvrez notre menu spécial amoureux pour une soirée inoubliable...",
        thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        date: "05 Fév 2024",
        category: "Événement",
        status: 'Draft',
        likes: 0,
        comments: 0,
        views: 0
    }
];

const ManagePostsPage: React.FC = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const filteredPosts = posts.filter(post =>
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterCategory === 'All' || post.category === filterCategory)
    );

    const handleDelete = (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
            setPosts(posts.filter(p => p.id !== id));
            toast.success('Publication supprimée');
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFDFB] pb-12">
            {/* Header Content */}
            <div className="bg-white border-b-2 border-[#EBE3D5] sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="bg-[#6B4226] p-3 rounded-2xl shadow-lg shadow-[#6B4226]/20">
                                <Edit3 className="h-6 w-6 text-[#F2A900]" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black text-[#2D1B08] tracking-tighter">Mes Publications</h1>
                                <p className="text-xs sm:text-sm text-[#5D4037]/70 font-bold uppercase tracking-widest">Gérez vos contenus partagés sur le fil</p>
                            </div>
                        </div>
                        <Link to="/establishment/create-post" className="w-full sm:w-auto">
                            <Button className="w-full bg-[#F2A900] hover:bg-[#D49400] text-white font-black rounded-xl py-6 px-8 shadow-xl shadow-[#F2A900]/20 flex items-center justify-center gap-2 group transition-all">
                                <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                                NOUVELLE PUBLICATION
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Filters and Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="bg-blue-50 p-2 rounded-lg"><Eye className="h-5 w-5 text-blue-600" /></div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Vues Totales</p>
                                <p className="text-xl font-black text-[#2D1B08]">3,550</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="bg-red-50 p-2 rounded-lg"><Heart className="h-5 w-5 text-red-600" /></div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Likes</p>
                                <p className="text-xl font-black text-[#2D1B08]">735</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="bg-amber-50 p-2 rounded-lg"><MessageSquare className="h-5 w-5 text-amber-600" /></div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Commentaires</p>
                                <p className="text-xl font-black text-[#2D1B08]">85</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="bg-emerald-50 p-2 rounded-lg"><Sparkles className="h-5 w-5 text-emerald-600" /></div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Publiés</p>
                                <p className="text-xl font-black text-[#2D1B08]">{posts.filter(p => p.status === 'Published').length}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters Strip */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl border-2 border-[#EBE3D5] shadow-sm">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher par titre ou contenu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-2 border-transparent focus:border-[#F2A900] focus:bg-white rounded-xl text-sm font-bold transition-all outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        <Filter className="h-4 w-4 text-[#6B4226] mr-2 shrink-0" />
                        {['All', 'Événement', 'Promotion', 'Histoire'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 whitespace-nowrap",
                                    filterCategory === cat
                                        ? "bg-[#6B4226] text-white border-transparent shadow-md"
                                        : "bg-white text-[#5D4037] border-gray-100 hover:border-[#F2A900]"
                                )}
                            >
                                {cat === 'All' ? 'Tous' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <Card
                            key={post.id}
                            className="group overflow-hidden border-2 border-[#EBE3D5] bg-white shadow-sm hover:shadow-xl hover:border-[#F2A900] transition-all duration-500 rounded-3xl flex flex-col cursor-pointer"
                            onClick={() => post.status === 'Published' && navigate(`/echos-senegal#post-${post.id}`)}
                        >
                            {/* Image Header */}
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge className={cn(
                                        "px-3 py-1 font-black text-[9px] uppercase tracking-widest",
                                        post.status === 'Published' ? "bg-emerald-500 hover:bg-emerald-600" : "bg-amber-500 hover:bg-amber-600"
                                    )}>
                                        {post.status === 'Published' ? 'Publié' : 'Brouillon'}
                                    </Badge>
                                    <Badge variant="outline" className="bg-white/90 backdrop-blur border-none font-black text-[9px] uppercase tracking-widest text-[#2D1B08]">
                                        {post.category}
                                    </Badge>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur border-none">
                                                <MoreVertical size={16} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl border-2 border-[#EBE3D5]">
                                            <DropdownMenuItem className="rounded-xl font-bold gap-2 cursor-pointer focus:bg-gray-100" onClick={() => navigate('/establishment/create-post')}>
                                                <Edit3 size={14} /> Modifier
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="rounded-xl font-bold gap-2 text-blue-600 cursor-pointer focus:bg-blue-50"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/echos-senegal#post-${post.id}`);
                                                }}
                                            >
                                                <Eye size={14} /> Voir sur le site
                                            </DropdownMenuItem>
                                            <div className="my-1 border-t border-gray-100"></div>
                                            <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-600 cursor-pointer focus:bg-red-50" onClick={() => handleDelete(post.id)}>
                                                <Trash2 size={14} /> Supprimer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <CardContent className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest mb-3">
                                    <Calendar size={12} className="text-[#F2A900]" />
                                    {post.date}
                                </div>
                                <h3 className="text-lg font-black text-[#2D1B08] mb-3 leading-tight group-hover:text-[#6B4226] transition-colors">{post.title}</h3>
                                <p className="text-sm text-[#5D4037]/70 font-bold leading-relaxed mb-6 line-clamp-2">
                                    {post.content}
                                </p>

                                <div className="mt-auto grid grid-cols-3 gap-2 border-t-2 border-gray-50 pt-6">
                                    <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50/50 group-hover:bg-white transition-colors">
                                        <Eye size={14} className="text-[#5D4037]/40 mb-1" />
                                        <span className="text-sm font-black text-[#2D1B08]">{post.views}</span>
                                        <span className="text-[8px] font-black text-[#5D4037]/40 uppercase tracking-widest">Vues</span>
                                    </div>
                                    <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50/50 group-hover:bg-white transition-colors">
                                        <Heart size={14} className="text-red-400 mb-1" />
                                        <span className="text-sm font-black text-[#2D1B08]">{post.likes}</span>
                                        <span className="text-[8px] font-black text-[#5D4037]/40 uppercase tracking-widest">Likes</span>
                                    </div>
                                    <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50/50 group-hover:bg-white transition-colors">
                                        <MessageSquare size={14} className="text-blue-400 mb-1" />
                                        <span className="text-sm font-black text-[#2D1B08]">{post.comments}</span>
                                        <span className="text-[8px] font-black text-[#5D4037]/40 uppercase tracking-widest">Comments</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-2 border-[#EBE3D5] text-[#2D1B08] font-black text-[10px] uppercase rounded-xl h-10 hover:bg-[#EBE3D5]/20"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate('/establishment/create-post');
                                        }}
                                    >
                                        MODIFIER
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-2 border-[#EBE3D5] text-red-600 font-black text-[10px] uppercase rounded-xl h-10 hover:bg-red-50 hover:border-red-100"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(post.id);
                                        }}
                                    >
                                        EFFACER
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-[#EBE3D5]">
                        <div className="bg-[#FFFDFB] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#EBE3D5]">
                            <Search className="h-8 w-8 text-[#EBE3D5]" />
                        </div>
                        <h3 className="text-xl font-black text-[#2D1B08] mb-2">Aucune publication trouvée</h3>
                        <p className="text-[#5D4037]/60 font-bold mb-8">Essayez de modifier votre recherche ou vos filtres.</p>
                        <Button
                            variant="link"
                            className="text-[#F2A900] font-black underline decoration-2 underline-offset-4"
                            onClick={() => { setSearchQuery(''); setFilterCategory('All'); }}
                        >
                            Voir toutes les publications
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagePostsPage;
