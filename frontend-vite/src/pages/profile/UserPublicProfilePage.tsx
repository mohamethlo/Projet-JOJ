import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
    MapPin,
    Heart,
    MessageCircle,
    Globe,
    Star,
    Users,
    FileText,
    MessageSquare,
    Check,
    Calendar,
    Award,
    Send,
    Reply,
    Phone,
    Mail,
    ArrowLeft,
    Edit3,
    Languages,
    DollarSign,
    Briefcase,
    Flag,
    Instagram,
    Twitter,
    Facebook,
    Home,
    LayoutGrid
} from 'lucide-react';

import { mockAccommodations } from '@/lib/mockData';
import useProtectedAction from '../../hooks/useProtectedAction';
import AccommodationDetailsModal from '@/components/modals/AccommodationDetailsModal';
import AccommodationBookingModal from '@/components/modals/AccommodationBookingModal';

// ─── Types ────────────────────────────────────────────────────

type UserRole = 'tourist' | 'local' | 'guide' | 'organizer' | 'admin' | 'security' | 'hotel' | 'restaurant' | 'host';

interface MockUserProfile {
    id: string;
    name: string;
    role: UserRole;
    bio: string;
    location: string;
    avatar: string;
    coverImage: string;
    followers: number;
    following: number;
    posts: number;
    rating?: number;
    reviewCount?: number;
    verified: boolean;
    phone?: string;
    email?: string;
    website?: string;
    languages?: string[];
    interests?: string[];
    // Guide specific
    specialties?: string[];
    guidingLanguages?: string[];
    pricePerDay?: string;
    pricePerHalf?: string;
    activityZone?: string;
    certifications?: string[];
    // Organizer specific
    organizationName?: string;
    eventTypes?: string[];
    socialLinks?: { instagram?: string; twitter?: string; facebook?: string };
}

// ─── Mock Data ────────────────────────────────────────────────

const getMockUser = (id: string, role: UserRole): MockUserProfile => {
    const base = {
        id,
        verified: true,
        followers: 1240,
        following: 385,
        posts: 47,
        coverImage: 'https://images.unsplash.com/photo-1490750967868-88df5691cc83?w=1920&h=600&fit=crop',
    };

    switch (role) {
        case 'guide':
            return {
                ...base,
                name: 'Amadou Sarr',
                role: 'guide',
                bio: "Guide touristique certifié avec 10 ans d'expérience. Passionné par l'histoire et la culture sénégalaise. Je vous ferai découvrir les merveilles cachées du Sénégal.",
                location: 'Dakar, Sénégal',
                avatar: '',
                rating: 4.9,
                reviewCount: 178,
                phone: '+221 77 123 45 67',
                email: 'amadou.sarr@guide.sn',
                website: 'www.amadou-guide.sn',
                specialties: ['Histoire & Culture', 'Gastronomie', 'Nature & Faune', 'Architecture Coloniale'],
                guidingLanguages: ['Français', 'Anglais', 'Wolof', 'Espagnol'],
                pricePerDay: '35 000 FCFA',
                pricePerHalf: '20 000 FCFA',
                activityZone: 'Dakar, Gorée, Saly, Saint-Louis',
                certifications: ['Guide Officiel Certifié', 'Premiers Secours', 'Guide Éco-Tourisme'],
            };
        case 'organizer':
            return {
                ...base,
                name: 'Aissatou Diallo',
                role: 'organizer',
                bio: "Organisatrice d'événements culturels et festifs au Sénégal. Je crée des expériences mémorables qui célèbrent la culture et la créativité africaine.",
                location: 'Dakar, Plateau',
                avatar: '',
                rating: 4.7,
                reviewCount: 94,
                phone: '+221 76 987 65 43',
                email: 'aissatou@events-sn.com',
                website: 'www.events-sn.com',
                organizationName: 'Teranga Events',
                eventTypes: ['Concerts & Festivals', 'Mariages & Galas', 'Conférences', 'Expositions Art'],
                socialLinks: { instagram: '@teranga_events', twitter: '@teranga_ev', facebook: 'Teranga Events' },
            };
        case 'local':
            return {
                ...base,
                name: 'Fatou Mbaye',
                role: 'local',
                bio: "Dakaroise de cœur, j'adore partager ma ville avec les voyageurs ! Je vous ferai découvrir les meilleurs endroits locaux, loin des sentiers battus.",
                location: 'Dakar, Médina',
                avatar: '',
                languages: ['Français', 'Wolof', 'Anglais'],
                interests: ['Gastronomie', 'Artisanat', 'Musique', 'Plages', 'Marché'],
                phone: '+221 78 555 44 33',
                email: 'fatou.mbaye@local.sn',
            };
        case 'host':
            return {
                ...base,
                name: 'Moussa Diop',
                role: 'host',
                bio: "Hébergeur passionné avec une collection de villas et appartements de luxe au Sénégal. Mon objectif est de vous offrir un séjour inoubliable avec un service de classe mondiale.",
                location: 'Dakar & Saly, Sénégal',
                avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
                rating: 4.9,
                reviewCount: 156,
                phone: '+221 77 555 66 77',
                email: 'moussa.diop@host.sn',
                website: 'www.moussadiop-rentals.sn',
                verified: true,
            };
        default: // tourist
            return {
                ...base,
                name: 'Jean-Pierre Martin',
                role: 'tourist',
                bio: "Voyageur passionné à la découverte du Sénégal. J'adore la culture, la gastronomie et les rencontres authentiques.",
                location: 'Paris, France (en visite à Dakar)',
                avatar: '',
                languages: ['Français', 'Anglais'],
                interests: ['Plages', 'Culture', 'Gastronomie', 'Photographie'],
                email: 'jp.martin@email.com',
            };
    }
};

const mockPosts = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=600&fit=crop',
        text: 'Une matinée inoubliable sur la Corniche de Dakar 🌊',
        likes: 124,
        comments: [
            { id: 1, user: 'Fatou Sall', text: 'Magnifique ! 😍', date: '2024-01-28', replies: [] }
        ],
        date: '2024-01-28'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=600&fit=crop',
        text: 'Île de Gorée — un lieu chargé d\'histoire et d\'émotions 🏛️',
        likes: 98,
        comments: [],
        date: '2024-01-25'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop',
        text: 'Thiéboudienne du jour — la recette traditionnelle comme je l\'aime ! 🇸🇳',
        likes: 203,
        comments: [
            { id: 2, user: 'Moussa Diop', text: 'Le meilleur thieb !', date: '2024-01-22', replies: [] }
        ],
        date: '2024-01-22'
    },
];

const mockReviews = [
    {
        id: 1,
        user: 'Marie Dubois',
        avatar: '',
        rating: 5,
        text: 'Expérience exceptionnelle ! Très professionnel et passionné. Je recommande vivement.',
        date: '2024-01-20'
    },
    {
        id: 2,
        user: 'Carlos Rodriguez',
        avatar: '',
        rating: 5,
        text: 'Incredibly knowledgeable and friendly. Made our trip to Senegal unforgettable.',
        date: '2024-01-15'
    },
    {
        id: 3,
        user: 'Yuki Tanaka',
        avatar: '',
        rating: 4,
        text: 'Très bonne expérience. Connaissance approfondie de la culture locale.',
        date: '2024-01-10'
    },
];

// ─── Role Label & Color ────────────────────────────────────────

const getRoleLabel = (role: UserRole) => {
    switch (role) {
        case 'guide': return 'Guide Touristique';
        case 'organizer': return 'Organisateur';
        case 'local': return 'Local';
        case 'tourist': return 'Touriste';
        case 'host': return 'Hôte';
        default: return role;
    }
};

const getRoleColor = (role: UserRole) => {
    switch (role) {
        case 'guide': return 'bg-blue-500';
        case 'organizer': return 'bg-purple-500';
        case 'local': return 'bg-emerald-500';
        case 'tourist': return 'bg-orange-500';
        case 'host': return 'bg-rose-500';
        default: return 'bg-gray-500';
    }
};

// ─── Cover image per role ─────────────────────────────────────

const getCover = (role: UserRole) => {
    switch (role) {
        case 'guide': return 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&h=600&fit=crop';
        case 'organizer': return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=600&fit=crop';
        case 'local': return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=600&fit=crop';
        case 'host': return 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&h=600&fit=crop';
        default: return 'https://images.unsplash.com/photo-1490750967868-88df5691cc83?w=1920&h=600&fit=crop';
    }
};

// ─── Tabs per role ────────────────────────────────────────────

type TabId = 'publications' | 'about' | 'services' | 'events' | 'reviews' | 'properties';

const getTabsForRole = (role: UserRole): { id: TabId; label: string; icon: React.ElementType }[] => {
    const publications = { id: 'publications' as TabId, label: 'Publications', icon: FileText };
    const about = { id: 'about' as TabId, label: 'À propos', icon: MessageSquare };
    const services = { id: 'services' as TabId, label: 'Services & Tarifs', icon: DollarSign };
    const events = { id: 'events' as TabId, label: 'Événements', icon: Calendar };
    const reviews = { id: 'reviews' as TabId, label: 'Avis', icon: Star };

    switch (role) {
        case 'guide': return [publications, about, services, reviews];
        case 'organizer': return [publications, about, events, reviews];
        case 'host': return [publications, about, { id: 'properties', label: 'Propriétés', icon: LayoutGrid }, reviews];
        default: return [publications, about];
    }
};

// ─── Main Component ───────────────────────────────────────────

const UserPublicProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const { toggleFollow, isFollowing: checkFollowing } = useNotifications();
    const { performAction, AuthModalComponent } = useProtectedAction();

    // In a real app, role would come from the fetched user, not URL param
    // For demo, use currentUser role if viewing own profile, else try to guess from id
    const viewedRole: UserRole = (() => {
        if (id === 'me' || id === currentUser?.id) return currentUser?.role as UserRole || 'tourist';
        if (id?.startsWith('g')) return 'guide';
        if (id?.startsWith('o')) return 'organizer';
        if (id?.startsWith('l')) return 'local';
        if (id?.startsWith('h')) return 'host';
        return 'tourist';
    })();

    const profile = getMockUser(id || '1', viewedRole);
    const tabs = getTabsForRole(viewedRole);
    const [activeTab, setActiveTab] = useState<TabId>(tabs[0].id);
    const isFollowing = id ? checkFollowing(id) : false;
    const isOwnProfile = !id || id === 'me' || id === currentUser?.id;

    // Admins et agents de sécurité n'ont pas de page publique
    if (viewedRole === 'admin' || viewedRole === 'security') {
        return (
            <div className="min-h-screen bg-[#FFFDFB] flex flex-col items-center justify-center px-4 py-20 text-center">
                <div className="bg-white border-2 border-[#EBE3D5] rounded-3xl p-10 max-w-md shadow-sm space-y-5">
                    <div className="w-20 h-20 rounded-full bg-[#EBE3D5] flex items-center justify-center mx-auto">
                        <ArrowLeft className="h-8 w-8 text-[#5D4037]/40" />
                    </div>
                    <h2 className="text-2xl font-black text-[#2D1B08]">Profil non disponible</h2>
                    <p className="text-[#5D4037] text-sm leading-relaxed">
                        Ce compte ne dispose pas de page publique. Seuls les touristes, locaux, guides et organisateurs ont un profil public visible.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 bg-[#F2A900] hover:bg-[#D49400] text-white font-black px-6 py-3 rounded-xl transition-all"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Retourner en arrière
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFDFB] pb-12">
            {/* Cover Image */}
            <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
                <img
                    src={getCover(viewedRole)}
                    alt="Couverture"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>

                {/* Edit own profile button */}
                {isOwnProfile && (
                    <Link to="/profile" className="absolute top-4 right-4">
                        <Button size="sm" className="bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm border-none rounded-full">
                            <Edit3 className="h-4 w-4 mr-1.5" />
                            Modifier
                        </Button>
                    </Link>
                )}
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="relative -mt-16 sm:-mt-20">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
                        {/* Avatar */}
                        <Avatar className="h-28 w-28 sm:h-36 sm:w-36 border-4 border-white shadow-2xl bg-white shrink-0">
                            <AvatarImage src={profile.avatar} alt={profile.name} />
                            <AvatarFallback className="text-3xl sm:text-5xl font-black text-[#F2A900] bg-[#FFF8E7]">
                                {profile.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        {/* Info & Actions */}
                        <div className="flex-1 w-full sm:pb-4 pt-2 sm:pt-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div className="space-y-2">
                                    {/* Name + badges */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h1 className="text-2xl sm:text-3xl font-black text-[#2D1B08]">{profile.name}</h1>
                                        {profile.verified && (
                                            <Badge className="bg-[#1B5E20] text-white border-none text-xs">
                                                <Check className="h-3 w-3 mr-1" />
                                                Vérifié
                                            </Badge>
                                        )}
                                        <Badge className={`${getRoleColor(viewedRole)} text-white border-none text-xs`}>
                                            {getRoleLabel(viewedRole)}
                                        </Badge>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center gap-1.5 text-sm text-[#5D4037]">
                                        <MapPin className="h-4 w-4 text-[#F2A900]" />
                                        <span className="font-semibold">{profile.location}</span>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-sm text-[#5D4037] max-w-xl leading-relaxed">{profile.bio}</p>

                                    {/* Stats */}
                                    <div className="flex flex-wrap items-center gap-4 text-sm pt-1">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="h-4 w-4 text-[#F2A900]" />
                                            <span className="font-black text-[#2D1B08]">{profile.followers.toLocaleString()}</span>
                                            <span className="text-[#5D4037]/70">abonnés</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-black text-[#2D1B08]">{profile.following.toLocaleString()}</span>
                                            <span className="text-[#5D4037]/70">abonnements</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <FileText className="h-4 w-4 text-[#F2A900]" />
                                            <span className="font-black text-[#2D1B08]">{profile.posts}</span>
                                            <span className="text-[#5D4037]/70">publications</span>
                                        </div>
                                        {profile.rating && (
                                            <div className="flex items-center gap-1.5">
                                                <Star className="h-4 w-4 text-[#F2A900] fill-[#F2A900]" />
                                                <span className="font-black text-[#2D1B08]">{profile.rating}</span>
                                                <span className="text-[#5D4037]/70">({profile.reviewCount} avis)</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {!isOwnProfile && (
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            onClick={() => id && performAction(() => toggleFollow(id))}
                                            className={`${isFollowing
                                                ? 'bg-[#EBE3D5] text-[#2D1B08] hover:bg-[#EBE3D5]/80'
                                                : 'bg-[#F2A900] hover:bg-[#D49400] text-white'
                                                } font-black rounded-full px-5 py-2.5 text-sm transition-all`}
                                        >
                                            {isFollowing ? (
                                                <><Check className="h-4 w-4 mr-1.5" />Abonné</>
                                            ) : (
                                                <><Heart className="h-4 w-4 mr-1.5" />Suivre</>
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-[#6B4226] text-[#6B4226] hover:bg-[#6B4226] hover:text-white font-black rounded-full px-5 py-2.5 text-sm"
                                            onClick={() => performAction(() => navigate(`/messages?userId=${id}`))}
                                        >
                                            <MessageSquare className="h-4 w-4 mr-1.5" />
                                            Contacter
                                        </Button>
                                        {viewedRole === 'guide' && (
                                            <Button
                                                className="bg-[#1B5E20] hover:bg-[#15490F] text-white font-black rounded-full px-5 py-2.5 text-sm"
                                                onClick={() => performAction(() => navigate(`/establishment/${id}?tab=booking`))}
                                            >
                                                <Calendar className="h-4 w-4 mr-1.5" />
                                                Réserver
                                            </Button>
                                        )}
                                    </div>
                                )}
                                {isOwnProfile && (
                                    <Link to="/profile">
                                        <Button variant="outline" className="border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black rounded-full px-5 py-2.5 text-sm">
                                            <Edit3 className="h-4 w-4 mr-1.5" />
                                            Modifier mon profil
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mt-8 border-b-2 border-[#EBE3D5]">
                    <div className="flex gap-0 overflow-x-auto scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-1.5 px-4 sm:px-6 py-3 sm:py-4 font-black text-xs sm:text-sm transition-all relative whitespace-nowrap ${activeTab === tab.id
                                    ? 'text-[#F2A900]'
                                    : 'text-[#5D4037]/60 hover:text-[#2D1B08]'
                                    }`}
                            >
                                <tab.icon className="h-4 w-4 shrink-0" />
                                <span>{tab.label}</span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F2A900] rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="mt-8">
                    {activeTab === 'publications' && <PublicationsTab posts={mockPosts} performAction={performAction} />}
                    {activeTab === 'about' && <AboutTab profile={profile} role={viewedRole} />}
                    {activeTab === 'services' && viewedRole === 'guide' && <ServicesTab profile={profile} />}
                    {activeTab === 'events' && viewedRole === 'organizer' && <EventsTab profile={profile} />}
                    {activeTab === 'properties' && viewedRole === 'host' && <PropertiesTab hostId={id || 'h-1'} />}
                    {activeTab === 'reviews' && <ReviewsTab reviews={mockReviews} rating={profile.rating || 4.5} reviewCount={profile.reviewCount || 0} />}
                </div>
            </div>
            {AuthModalComponent}
        </div>
    );
};

// ─── Publications Tab ─────────────────────────────────────────

const PublicationsTab: React.FC<{ posts: any[]; performAction: (callback: () => void) => void }> = ({ posts, performAction }) => {
    const [expandedPost, setExpandedPost] = useState<number | null>(null);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [newReply, setNewReply] = useState('');

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl overflow-hidden border-2 border-[#EBE3D5] hover:border-[#F2A900] transition-all shadow-sm hover:shadow-xl">
                    <div className="aspect-square overflow-hidden bg-[#EBE3D5]">
                        <img
                            src={post.image}
                            alt="Publication"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop'; }}
                        />
                    </div>
                    <div className="p-5 space-y-4">
                        <p className="text-sm text-[#2D1B08] font-medium leading-relaxed">{post.text}</p>
                        <div className="flex items-center justify-between text-sm border-t border-b border-[#EBE3D5] py-3">
                            <div className="flex items-center gap-5">
                                <button className="flex items-center gap-1.5 text-[#F2A900] hover:text-[#D49400] font-bold transition-colors">
                                    <Heart className="h-4 w-4" />
                                    <span>{post.likes}</span>
                                </button>
                                <button
                                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                                    className="flex items-center gap-1.5 text-[#1B5E20] hover:text-[#15490F] font-bold transition-colors"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    <span>{post.comments.length}</span>
                                </button>
                            </div>
                            <span className="text-xs text-[#5D4037]/70 font-bold">
                                {new Date(post.date).toLocaleDateString('fr-FR')}
                            </span>
                        </div>

                        {expandedPost === post.id && (
                            <div className="space-y-3">
                                {post.comments.map((comment: any) => (
                                    <div key={comment.id} className="space-y-2">
                                        <div className="flex gap-2">
                                            <Avatar className="h-7 w-7 shrink-0">
                                                <AvatarFallback className="bg-[#F2A900] text-white text-[10px] font-black">
                                                    {comment.user.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 bg-gray-50 rounded-2xl px-3 py-2">
                                                <p className="font-black text-[11px] text-[#2D1B08]">{comment.user}</p>
                                                <p className="text-xs text-[#5D4037] mt-0.5">{comment.text}</p>
                                                <button
                                                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                                    className="text-[10px] font-bold text-[#F2A900] mt-1 flex items-center gap-1"
                                                >
                                                    <Reply className="h-3 w-3" />Répondre
                                                </button>
                                            </div>
                                        </div>
                                        {replyingTo === comment.id && (
                                            <div className="ml-9 flex gap-2">
                                                <Textarea
                                                    value={newReply}
                                                    onChange={(e) => setNewReply(e.target.value)}
                                                    placeholder="Répondre..."
                                                    className="min-h-[50px] resize-none text-xs border-[#EBE3D5] focus:border-[#F2A900]"
                                                />
                                                <Button size="sm" className="bg-[#F2A900] hover:bg-[#D49400] text-white self-end px-3"
                                                    onClick={() => { setNewReply(''); setReplyingTo(null); }}>
                                                    <Send className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="flex gap-2 pt-2 border-t border-[#EBE3D5]">
                                    <Textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Ajouter un commentaire..."
                                        className="min-h-[50px] resize-none text-xs border-[#EBE3D5] focus:border-[#F2A900]"
                                    />
                                    <Button size="sm" className="bg-[#1B5E20] hover:bg-[#15490F] text-white self-end px-3"
                                        onClick={() => setNewComment('')}>
                                        <Send className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── About Tab ────────────────────────────────────────────────

const AboutTab: React.FC<{ profile: MockUserProfile; role: UserRole }> = ({ profile, role }) => (
    <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                <h3 className="text-lg font-black text-[#2D1B08] mb-3">À propos</h3>
                <p className="text-[#5D4037] leading-relaxed">{profile.bio}</p>
            </div>

            {/* Languages */}
            {(profile.languages || profile.guidingLanguages) && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-lg font-black text-[#2D1B08] mb-3 flex items-center gap-2">
                        <Languages className="h-5 w-5 text-[#F2A900]" />
                        Langues
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {(profile.languages || profile.guidingLanguages || []).map((lang) => (
                            <Badge key={lang} variant="outline" className="border-[#F2A900] text-[#F2A900] font-bold px-3 py-1">
                                {lang}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Interests (tourist/local) */}
            {profile.interests && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-lg font-black text-[#2D1B08] mb-3 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-[#F2A900]" />
                        Centres d'intérêt
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest) => (
                            <Badge key={interest} variant="outline" className="border-[#1B5E20] text-[#1B5E20] font-bold px-3 py-1">
                                {interest}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Organizer-specific */}
            {role === 'organizer' && profile.organizationName && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-lg font-black text-[#2D1B08] mb-3 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-[#F2A900]" />
                        Organisation
                    </h3>
                    <p className="text-[#2D1B08] font-bold text-lg mb-3">{profile.organizationName}</p>
                    {profile.eventTypes && (
                        <div className="flex flex-wrap gap-2">
                            {profile.eventTypes.map((t) => (
                                <Badge key={t} className="bg-purple-100 text-purple-700 font-bold px-3 py-1 border-none">
                                    {t}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Guide specialties in about */}
            {role === 'guide' && profile.specialties && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-lg font-black text-[#2D1B08] mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5 text-[#F2A900]" />
                        Spécialités
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.specialties.map((s) => (
                            <Badge key={s} className="bg-blue-100 text-blue-700 font-bold px-3 py-1 border-none">
                                {s}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Contact sidebar */}
        <div className="space-y-4">
            {(profile.phone || profile.email || profile.website) && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-lg font-black text-[#2D1B08] mb-4">Contact</h3>
                    <div className="space-y-3">
                        {profile.phone && (
                            <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-[#5D4037] hover:text-[#F2A900] transition-colors group">
                                <div className="bg-[#FFF8E7] group-hover:bg-[#F2A900] p-2 rounded-xl transition-colors">
                                    <Phone className="h-4 w-4 text-[#F2A900] group-hover:text-white" />
                                </div>
                                <span className="font-bold text-sm">{profile.phone}</span>
                            </a>
                        )}
                        {profile.email && (
                            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-[#5D4037] hover:text-[#F2A900] transition-colors group">
                                <div className="bg-[#FFF8E7] group-hover:bg-[#F2A900] p-2 rounded-xl transition-colors">
                                    <Mail className="h-4 w-4 text-[#F2A900] group-hover:text-white" />
                                </div>
                                <span className="font-bold text-sm">{profile.email}</span>
                            </a>
                        )}
                        {profile.website && (
                            <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#5D4037] hover:text-[#F2A900] transition-colors group">
                                <div className="bg-[#FFF8E7] group-hover:bg-[#F2A900] p-2 rounded-xl transition-colors">
                                    <Globe className="h-4 w-4 text-[#F2A900] group-hover:text-white" />
                                </div>
                                <span className="font-bold text-sm">{profile.website}</span>
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Social links for organizer */}
            {role === 'organizer' && profile.socialLinks && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-lg font-black text-[#2D1B08] mb-4">Réseaux Sociaux</h3>
                    <div className="space-y-3">
                        {profile.socialLinks.instagram && (
                            <div className="flex items-center gap-3 text-[#5D4037]">
                                <div className="bg-pink-50 p-2 rounded-xl"><Instagram className="h-4 w-4 text-pink-500" /></div>
                                <span className="font-bold text-sm">{profile.socialLinks.instagram}</span>
                            </div>
                        )}
                        {profile.socialLinks.twitter && (
                            <div className="flex items-center gap-3 text-[#5D4037]">
                                <div className="bg-sky-50 p-2 rounded-xl"><Twitter className="h-4 w-4 text-sky-500" /></div>
                                <span className="font-bold text-sm">{profile.socialLinks.twitter}</span>
                            </div>
                        )}
                        {profile.socialLinks.facebook && (
                            <div className="flex items-center gap-3 text-[#5D4037]">
                                <div className="bg-blue-50 p-2 rounded-xl"><Facebook className="h-4 w-4 text-blue-600" /></div>
                                <span className="font-bold text-sm">{profile.socialLinks.facebook}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Location */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                <h3 className="text-lg font-black text-[#2D1B08] mb-3">Localisation</h3>
                <div className="flex items-center gap-2 text-[#5D4037]">
                    <Flag className="h-4 w-4 text-[#F2A900]" />
                    <span className="font-bold">{profile.location}</span>
                </div>
            </div>
        </div>
    </div>
);

// ─── Services Tab (Guide) ────────────────────────────────────

const ServicesTab: React.FC<{ profile: MockUserProfile }> = ({ profile }) => (
    <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            {/* Pricing */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                <h3 className="text-xl font-black text-[#2D1B08] mb-5 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-[#F2A900]" />
                    Tarifs
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#FFF8E7] to-[#FFF3D0] rounded-2xl p-5 border border-[#F2A900]/30">
                        <p className="text-xs font-black text-[#F2A900] uppercase tracking-widest mb-1">Demi-journée</p>
                        <p className="text-3xl font-black text-[#2D1B08]">{profile.pricePerHalf}</p>
                        <p className="text-xs text-[#5D4037] mt-1">jusqu'à 4 heures</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl p-5 text-white">
                        <p className="text-xs font-black text-green-200 uppercase tracking-widest mb-1">Journée complète</p>
                        <p className="text-3xl font-black">{profile.pricePerDay}</p>
                        <p className="text-xs text-green-200 mt-1">8 heures incluses</p>
                    </div>
                </div>
                <p className="text-xs text-[#5D4037]/70 mt-4">* Les tarifs peuvent varier selon la destination et le nombre de personnes. Contactez le guide pour un devis personnalisé.</p>
            </div>

            {/* Activity zone */}
            {profile.activityZone && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-xl font-black text-[#2D1B08] mb-3 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-[#F2A900]" />
                        Zone d'Activité
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.activityZone.split(', ').map((zone) => (
                            <Badge key={zone} className="bg-[#EBE3D5] text-[#2D1B08] font-bold px-4 py-2 border-none">
                                <MapPin className="h-3 w-3 mr-1.5" />
                                {zone}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Specialties */}
            {profile.specialties && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-xl font-black text-[#2D1B08] mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5 text-[#F2A900]" />
                        Spécialités
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {profile.specialties.map((s) => (
                            <div key={s} className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                                <Check className="h-4 w-4 text-blue-500 shrink-0" />
                                <span className="font-bold text-blue-700 text-sm">{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
            {profile.guidingLanguages && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-lg font-black text-[#2D1B08] mb-3 flex items-center gap-2">
                        <Languages className="h-4 w-4 text-[#F2A900]" />
                        Langues de Guidage
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.guidingLanguages.map((lang) => (
                            <Badge key={lang} variant="outline" className="border-[#F2A900] text-[#F2A900] font-bold">
                                {lang}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {profile.certifications && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-lg font-black text-[#2D1B08] mb-3 flex items-center gap-2">
                        <Award className="h-4 w-4 text-[#F2A900]" />
                        Certifications
                    </h3>
                    <div className="space-y-2">
                        {profile.certifications.map((cert) => (
                            <div key={cert} className="flex items-center gap-2 bg-[#FFF8E7] rounded-xl px-3 py-2">
                                <Check className="h-4 w-4 text-[#1B5E20] shrink-0" />
                                <span className="text-sm font-bold text-[#2D1B08]">{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-gradient-to-br from-[#F2A900] to-[#D49400] rounded-2xl p-6 text-white shadow-lg">
                <h3 className="font-black text-lg mb-2">Réserver ce guide</h3>
                <p className="text-sm text-white/80 mb-4">Disponible pour des visites privées, des groupes et des événements spéciaux.</p>
                <Button className="w-full bg-white text-[#F2A900] hover:bg-white/90 font-black rounded-xl">
                    <Calendar className="h-4 w-4 mr-2" />
                    Demander une réservation
                </Button>
            </div>
        </div>
    </div>
);

// ─── Events Tab (Organizer) ───────────────────────────────────

const mockEvents = [
    { id: 1, title: 'Festival de Jazz de Dakar', date: '15 Mars 2024', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop', attendees: 850, status: 'À venir' },
    { id: 2, title: 'Gala Teranga 2024', date: '22 Fév 2024', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop', attendees: 350, status: 'Terminé' },
    { id: 3, title: 'Exposition Art Contemporain', date: '5 Fév 2024', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop', attendees: 420, status: 'Terminé' },
];

const EventsTab: React.FC<{ profile: MockUserProfile }> = ({ profile }) => (
    <div className="space-y-6">
        {profile.eventTypes && (
            <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                <h3 className="text-lg font-black text-[#2D1B08] mb-3">Types d'événements organisés</h3>
                <div className="flex flex-wrap gap-2">
                    {profile.eventTypes.map((t) => (
                        <Badge key={t} className="bg-purple-100 text-purple-700 font-bold px-4 py-2 border-none">
                            {t}
                        </Badge>
                    ))}
                </div>
            </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl overflow-hidden border-2 border-[#EBE3D5] hover:border-[#F2A900] transition-all shadow-sm hover:shadow-xl">
                    <div className="h-40 overflow-hidden relative">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        <Badge className={`absolute top-3 right-3 text-white border-none font-black ${event.status === 'À venir' ? 'bg-[#1B5E20]' : 'bg-gray-500'}`}>
                            {event.status}
                        </Badge>
                    </div>
                    <div className="p-5">
                        <h4 className="font-black text-[#2D1B08] mb-2">{event.title}</h4>
                        <div className="flex items-center gap-1.5 text-sm text-[#5D4037] mb-1">
                            <Calendar className="h-4 w-4 text-[#F2A900]" />
                            <span className="font-bold">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-[#5D4037]">
                            <Users className="h-4 w-4 text-[#F2A900]" />
                            <span className="font-bold">{event.attendees.toLocaleString()} participants</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ─── Properties Tab (Host only) ──────────────────────────────

const PropertiesTab: React.FC<{ hostId: string }> = ({ hostId }) => {
    const hostProperties = mockAccommodations.filter(acc => acc.host?.id === hostId);
    const [selectedProperty, setSelectedProperty] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const handleViewDetails = (property: any) => {
        setSelectedProperty(property);
        setIsDetailsOpen(true);
    };

    const handleBooking = (property: any) => {
        setSelectedProperty(property);
        setIsBookingOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="bg-[#2D1B08] rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2A900]/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Catalogue Immobilier</h3>
                    <p className="text-white/60 text-sm font-medium italic">
                        Découvrez toutes les villas, appartements et résidences gérés par cet hôte.
                    </p>
                </div>
            </div>

            {hostProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {hostProperties.map((property) => (
                        <div key={property.id} className="group bg-white rounded-3xl overflow-hidden border-2 border-[#EBE3D5] hover:border-[#F2A900] transition-all shadow-sm hover:shadow-xl flex flex-col">
                             <div 
                                className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                                onClick={() => handleViewDetails(property)}
                            >
                                <img 
                                    src={property.image} 
                                    alt={property.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-black/50 backdrop-blur-md text-white border-none text-[10px] font-black uppercase px-3 py-1.5 rounded-full">
                                        {property.type}
                                    </Badge>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="text-white font-black text-2xl tracking-tighter">{property.price}</div>
                                </div>
                             </div>
                             
                             <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <h4 className="font-black text-xl text-[#2D1B08] uppercase tracking-tighter group-hover:text-[#F2A900] transition-colors mb-1">
                                        {property.name}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-xs text-[#5D4037]/70">
                                        <MapPin className="h-3.5 w-3.5 text-[#F2A900]" />
                                        <span className="font-bold">{property.location}</span>
                                    </div>
                                </div>

                                <p className="text-sm text-[#5D4037]/70 italic line-clamp-2 mb-6 flex-1">
                                    "{property.description}"
                                </p>

                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <Button 
                                        variant="outline" 
                                        className="border-[#2D1B08] text-[#2D1B08] hover:bg-[#2D1B08] hover:text-white font-black uppercase tracking-widest text-[9px] h-11 rounded-xl"
                                        onClick={() => handleViewDetails(property)}
                                    >
                                        Détails
                                    </Button>
                                    <Button 
                                        className="bg-[#2D1B08] hover:bg-black text-[#F2A900] font-black uppercase tracking-widest text-[9px] h-11 rounded-xl shadow-lg shadow-[#2D1B08]/10"
                                        onClick={() => handleBooking(property)}
                                    >
                                        Réserver
                                    </Button>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-white rounded-3xl border-2 border-[#EBE3D5] border-dashed">
                    <div className="w-16 h-16 bg-[#F2A900]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Home className="h-8 w-8 text-[#F2A900]" />
                    </div>
                    <h3 className="text-lg font-black text-[#2D1B08]">Aucune propriété répertoriée</h3>
                    <p className="text-[#5D4037]/60 text-sm italic">Cet hôte n'a pas encore ajouté de propriétés à son portfolio.</p>
                </div>
            )}

            {/* Modales */}
            {selectedProperty && (
                <>
                    <AccommodationDetailsModal 
                        isOpen={isDetailsOpen} 
                        onClose={() => setIsDetailsOpen(false)} 
                        accommodation={selectedProperty} 
                    />
                    <AccommodationBookingModal 
                        isOpen={isBookingOpen} 
                        onClose={() => setIsBookingOpen(false)} 
                        accommodation={selectedProperty} 
                    />
                </>
            )}
        </div>
    );
};

// ─── Reviews Tab ──────────────────────────────────────────────

const ReviewsTab: React.FC<{ reviews: any[]; rating: number; reviewCount: number }> = ({ reviews, rating, reviewCount }) => (
    <div className="space-y-6">
        <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64">
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=500&fit=crop" alt="Avis" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#F2A900]/95 to-[#D49400]/95" />
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-white text-center">
                <div className="text-6xl font-black mb-2 drop-shadow-lg">{rating}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-6 w-6 drop-shadow ${i < Math.floor(rating) ? 'fill-white text-white' : 'fill-white/30 text-white/30'}`} />
                    ))}
                </div>
                <p className="font-black text-white/90">Basé sur {reviewCount} avis</p>
            </div>
        </div>
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-11 w-11 shrink-0">
                            <AvatarFallback className="bg-[#F2A900] text-white font-black">{review.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-black text-[#2D1B08]">{review.user}</h4>
                                <span className="text-xs text-[#5D4037]/70 font-bold">{new Date(review.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-[#F2A900] text-[#F2A900]' : 'text-[#EBE3D5]'}`} />
                                ))}
                            </div>
                            <p className="text-[#5D4037] text-sm leading-relaxed">{review.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default UserPublicProfilePage;
