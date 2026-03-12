import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNotifications } from '@/context/NotificationContext';
import { mockAccommodations } from '@/lib/mockData';
import { AccommodationBookingModal } from '@/components/modals';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
    MapPin,
    Heart,
    MessageCircle,
    Phone,
    Mail,
    Globe,
    Star,
    Users,
    FileText,
    Image as ImageIcon,
    MessageSquare,
    Check,
    Calendar,
    Award,
    Utensils,
    Hotel,
    Bed,
    Send,
    Reply,
    Wifi,
    Tv,
    Coffee,
    Waves,
    ChevronLeft,
    ChevronRight,
    Plane,
    Map
} from 'lucide-react';

import useProtectedAction from '../../hooks/useProtectedAction';
import { mockAgencies } from '@/lib/mockData';

const EstablishmentProfilePage: React.FC = () => {
    const { id } = useParams();
    const { toggleFollow, isFollowing: checkFollowing } = useNotifications();
    const { performAction, AuthModalComponent } = useProtectedAction();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = (searchParams.get('tab') as any) || 'publications';
    const [activeTab, setActiveTab] = useState<'publications' | 'about' | 'reviews' | 'photos' | 'rooms' | 'menu' | 'offers'>(initialTab);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab as any);
        setSearchParams({ tab });
    };

    const isFollowing = id ? checkFollowing(id) : false;

    let baseEstablishment = mockAccommodations.find(a => a.id === id);
    if (!baseEstablishment) {
        // Fallback to agencies if not found in accommodations (since restaurants are also in mockAccommodations for now)
        baseEstablishment = mockAgencies.find(a => a.id === id) as any;
    }

    if (!baseEstablishment) {
        baseEstablishment = {
            id: id || '1',
            name: 'Le Djoloff Royal',
            type: 'Restaurant',
            description: 'Découvrez l\'essence de la cuisine sénégalaise dans notre restaurant emblématique.',
            location: 'Dakar, Plateau',
            rating: 4.8,
            reviews: 342,
            image: '/images/restaurant_profile.jpg',
            availability: 'Ouvert',
            amenities: ['WiFi Gratuit', 'Terrasse', 'Parking', 'Climatisation', 'Service Traiteur'],
            rooms: []
        };
    }

    const establishment = {
        ...baseEstablishment,
        category: (baseEstablishment as any).type || 'Établissement',
        tagline: (baseEstablishment as any).tagline || 'Saveurs authentiques du Sénégal dans un cadre royal',
        coverImage: (baseEstablishment as any).coverImage || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop',
        profileImage: baseEstablishment.image,
        followers: (baseEstablishment as any).followers || 2847,
        posts: (baseEstablishment as any).posts || 156,
        verified: true,
        contact: (baseEstablishment as any).contact || {
            phone: '+221 33 821 45 67',
            email: 'contact@djoloffroyal.sn',
            website: 'www.djoloffroyal.sn'
        },
        hours: (baseEstablishment as any).hours || {
            'Lundi - Vendredi': '12h00 - 23h00',
            'Samedi - Dimanche': '11h00 - 00h00'
        }
    };

    const isAccommodation = ['Hôtel', 'Auberge', 'Villa', 'Résidence'].includes(establishment.category);
    const isRestaurant = establishment.category === 'Restaurant';
    const isAgency = establishment.category === 'Agency' || establishment.type === 'Agency';

    const mockPosts = [
        {
            id: 1,
            image: '/images/thieboudienne.png',
            text: 'Notre Thiéboudienne du jour, préparé avec amour selon la recette traditionnelle 🇸🇳',
            likes: 234,
            comments: [
                { id: 1, user: 'Fatou Sall', avatar: '', text: 'Ça a l\'air délicieux ! 😍', date: '2024-01-28', replies: [] },
                {
                    id: 2, user: 'Moussa Diop', avatar: '', text: 'Meilleur Thieb de Dakar !', date: '2024-01-28', replies: [
                        { id: 3, user: 'Le Djoloff Royal', avatar: '', text: 'Merci beaucoup ! 🙏', date: '2024-01-28' }
                    ]
                }
            ],
            date: '2024-01-28'
        },
        {
            id: 2,
            image: '/images/yassa.jpg',
            text: 'Yassa Poulet accompagné de riz parfumé aux oignons caramélisés',
            likes: 189,
            comments: [
                { id: 4, user: 'Aissatou Ba', avatar: '', text: 'J\'adore votre Yassa !', date: '2024-01-27', replies: [] }
            ],
            date: '2024-01-27'
        },
        {
            id: 3,
            image: '/images/mafe.jpg',
            text: 'Mafé de bœuf, une explosion de saveurs dans votre assiette',
            likes: 156,
            comments: [],
            date: '2024-01-26'
        }
    ];

    const mockReviews = [
        {
            id: 1,
            user: 'Aminata Diallo',
            avatar: '/images/avatar1.jpg',
            rating: 5,
            text: 'Excellente expérience ! La nourriture est délicieuse et le service impeccable. Je recommande vivement le Thiéboudienne.',
            date: '2024-01-25'
        },
        {
            id: 2,
            user: 'Jean-Pierre Martin',
            avatar: '/images/avatar2.jpg',
            rating: 5,
            text: 'Un vrai voyage culinaire au cœur du Sénégal. L\'ambiance est chaleureuse et authentique.',
            date: '2024-01-20'
        }
    ];

    return (
        <div className="min-h-screen bg-[#FFFDFB] pb-12">
            {/* Cover Image */}
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop"
                    alt={`Couverture ${establishment.name}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>

            {/* Profile Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative -mt-16 sm:-mt-20 md:-mt-24">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
                        {/* Profile Picture */}
                        <Avatar className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 border-4 sm:border-6 border-white shadow-2xl bg-white">
                            <AvatarImage src={establishment.profileImage} alt={establishment.name} />
                            <AvatarFallback className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F2A900] bg-[#FFFDFB]">
                                {establishment.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        {/* Info & Actions */}
                        <div className="flex-1 w-full sm:pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2D1B08]">
                                            {establishment.name}
                                        </h1>
                                        {establishment.verified && (
                                            <Badge className="bg-[#1B5E20] text-white border-none">
                                                <Check className="h-3 w-3 mr-1" />
                                                Vérifié
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 flex-wrap">
                                        <Badge variant="outline" className="border-[#F2A900] text-[#F2A900] font-bold">
                                            {isRestaurant && <Utensils className="h-3 w-3 mr-1" />}
                                            {isAccommodation && <Hotel className="h-3 w-3 mr-1" />}
                                            {isAgency && <Plane className="h-3 w-3 mr-1" />}
                                            {establishment.category === 'Agency' ? 'Agence de Voyage' : establishment.category}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-sm text-[#5D4037]">
                                            <MapPin className="h-4 w-4" />
                                            <span className="font-bold">{establishment.location}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm sm:text-base text-[#5D4037] max-w-2xl">
                                        {establishment.tagline}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm pt-2">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#F2A900] shrink-0" />
                                            <span className="font-black text-[#2D1B08]">{establishment.followers.toLocaleString()}</span>
                                            <span className="text-[#5D4037]/70 hidden xs:inline">abonnés</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#F2A900] shrink-0" />
                                            <span className="font-black text-[#2D1B08]">{establishment.posts}</span>
                                            <span className="text-[#5D4037]/70 hidden xs:inline">publications</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#F2A900] fill-[#F2A900] shrink-0" />
                                            <span className="font-black text-[#2D1B08]">{establishment.rating}</span>
                                            <span className="text-[#5D4037]/70">({establishment.reviews})</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                    <Button
                                        onClick={() => id && performAction(() => toggleFollow(id))}
                                        className={`${isFollowing
                                            ? 'bg-[#EBE3D5] text-[#2D1B08] hover:bg-[#EBE3D5]/80'
                                            : 'bg-[#F2A900] hover:bg-[#D49400] text-white'
                                            } font-black rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm transition-all`}
                                    >
                                        {isFollowing ? (
                                            <>
                                                <Check className="h-4 w-4 mr-1.5" />
                                                Abonné
                                            </>
                                        ) : (
                                            <>
                                                <Heart className="h-4 w-4 mr-1.5" />
                                                Suivre
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full border-[#6B4226] text-[#6B4226] hover:bg-[#6B4226] hover:text-white font-black rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm"
                                        onClick={() => performAction(() => { } /* Navigate logic handled better via Button or Link protection */)}
                                    >
                                        <MessageSquare className="h-4 w-4 mr-1.5" />
                                        <span className="hidden xs:inline">Contacter</span>
                                        <span className="xs:hidden">Chat</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white font-black rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm"
                                        onClick={() => performAction(() => handleTabChange('rooms'))}
                                    >
                                        <Calendar className="h-4 w-4 mr-1.5" />
                                        Réserver
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mt-6 sm:mt-8 border-b-2 border-[#EBE3D5]">
                    <div className="flex gap-0 overflow-x-auto scrollbar-hide">
                        {[
                            { id: 'publications', label: 'Publications', shortLabel: 'Posts', icon: FileText },
                            ...(isAccommodation ? [{ id: 'rooms', label: 'Chambres', shortLabel: 'Chambres', icon: Bed }] : []),
                            ...(isRestaurant ? [{ id: 'menu', label: 'Menu', shortLabel: 'Menu', icon: Utensils }] : []),
                            ...(isAgency ? [{ id: 'offers', label: 'Offres & Circuits', shortLabel: 'Offres', icon: Plane }] : []),
                            { id: 'about', label: 'À propos', shortLabel: 'Info', icon: MessageSquare },
                            { id: 'reviews', label: 'Avis', shortLabel: 'Avis', icon: Star },
                            { id: 'photos', label: 'Photos', shortLabel: 'Photos', icon: ImageIcon }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex items-center gap-1.5 px-4 sm:px-6 py-3 sm:py-4 font-black text-xs sm:text-sm md:text-base transition-all relative whitespace-nowrap ${activeTab === tab.id
                                    ? 'text-[#F2A900]'
                                    : 'text-[#5D4037]/60 hover:text-[#2D1B08]'
                                    }`}
                            >
                                <tab.icon className="h-4 w-4 shrink-0" />
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.shortLabel}</span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2A900] rounded-t-full"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="mt-8">
                    {activeTab === 'publications' && (
                        <PublicationsTab posts={mockPosts} performAction={performAction} />
                    )}
                    {activeTab === 'rooms' && isAccommodation && (
                        <RoomsTab establishment={establishment} performAction={performAction} />
                    )}
                    {activeTab === 'menu' && isRestaurant && (
                        <MenuTab performAction={performAction} />
                    )}
                    {activeTab === 'offers' && isAgency && (
                        <OffersTab establishment={establishment} performAction={performAction} />
                    )}
                    {activeTab === 'about' && (
                        <AboutTab establishment={establishment} />
                    )}
                    {activeTab === 'reviews' && (
                        <ReviewsTab reviews={mockReviews} rating={establishment.rating} reviewCount={establishment.reviews} />
                    )}
                    {activeTab === 'photos' && (
                        <PhotosTab posts={mockPosts} />
                    )}
                </div>
            </div>
            {AuthModalComponent}
        </div>
    );
};

// Publications Tab Component with Comments
const PublicationsTab: React.FC<{ posts: any[]; performAction: (callback: () => void) => void }> = ({ posts, performAction }) => {
    const [expandedPost, setExpandedPost] = useState<number | null>(null);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState('');

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-white rounded-2xl overflow-hidden border-2 border-[#EBE3D5] hover:border-[#F2A900] transition-all shadow-sm hover:shadow-xl"
                >
                    <div className="aspect-square overflow-hidden bg-[#EBE3D5]">
                        <img
                            src={post.image}
                            alt="Publication"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop';
                            }}
                        />
                    </div>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-[#2D1B08] font-medium leading-relaxed">{post.text}</p>

                        <div className="flex items-center justify-between text-sm border-t border-b border-[#EBE3D5] py-3">
                            <div className="flex items-center gap-6">
                                <button
                                    className="flex items-center gap-2 text-[#F2A900] hover:text-[#D49400] font-bold transition-colors"
                                    onClick={() => performAction(() => { })}
                                >
                                    <Heart className="h-5 w-5" />
                                    <span>{post.likes}</span>
                                </button>
                                <button
                                    onClick={() => performAction(() => setExpandedPost(expandedPost === post.id ? null : post.id))}
                                    className="flex items-center gap-2 text-[#1B5E20] hover:text-[#15490F] font-bold transition-colors"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    <span>{post.comments.length}</span>
                                </button>
                            </div>
                            <span className="text-xs text-[#5D4037]/70 font-bold">
                                {new Date(post.date).toLocaleDateString('fr-FR')}
                            </span>
                        </div>

                        {/* Comments Section */}
                        {expandedPost === post.id && (
                            <div className="space-y-4 pt-2">
                                {/* Existing Comments */}
                                {post.comments.map((comment: any) => (
                                    <div key={comment.id} className="space-y-2">
                                        <div className="flex gap-3">
                                            <Avatar className="h-8 w-8 shrink-0">
                                                <AvatarFallback className="bg-[#F2A900] text-white text-xs font-black">
                                                    {comment.user.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 bg-[#F5F5F5] rounded-2xl px-4 py-2">
                                                <p className="font-black text-xs text-[#2D1B08]">{comment.user}</p>
                                                <p className="text-sm text-[#5D4037] mt-1">{comment.text}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <button
                                                        onClick={() => performAction(() => setReplyingTo(replyingTo === comment.id ? null : comment.id))}
                                                        className="text-xs font-bold text-[#F2A900] hover:text-[#D49400] flex items-center gap-1"
                                                    >
                                                        <Reply className="h-3 w-3" />
                                                        Répondre
                                                    </button>
                                                    <span className="text-xs text-[#5D4037]/50 font-bold">{comment.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Replies */}
                                        {comment.replies && comment.replies.length > 0 && (
                                            <div className="ml-11 space-y-2">
                                                {comment.replies.map((reply: any) => (
                                                    <div key={reply.id} className="flex gap-3">
                                                        <Avatar className="h-7 w-7 shrink-0">
                                                            <AvatarFallback className="bg-[#1B5E20] text-white text-xs font-black">
                                                                {reply.user.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 bg-[#F5F5F5] rounded-2xl px-4 py-2">
                                                            <p className="font-black text-xs text-[#2D1B08]">{reply.user}</p>
                                                            <p className="text-sm text-[#5D4037] mt-1">{reply.text}</p>
                                                            <span className="text-xs text-[#5D4037]/50 font-bold mt-1 block">{reply.date}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Reply Input */}
                                        {replyingTo === comment.id && (
                                            <div className="ml-11 flex flex-col sm:flex-row gap-2">
                                                <Textarea
                                                    value={newReply}
                                                    onChange={(e) => setNewReply(e.target.value)}
                                                    placeholder="Écrivez une réponse..."
                                                    className="min-h-[60px] resize-none text-sm border-[#EBE3D5] focus:border-[#F2A900] flex-1"
                                                />
                                                <Button
                                                    size="sm"
                                                    className="bg-[#F2A900] hover:bg-[#D49400] text-white w-full sm:w-auto"
                                                    onClick={() => {
                                                        setNewReply('');
                                                        setReplyingTo(null);
                                                    }}
                                                >
                                                    <Send className="h-4 w-4 sm:mr-0" />
                                                    <span className="sm:hidden ml-2">Envoyer</span>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* New Comment Input */}
                                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[#EBE3D5]">
                                    <Textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Ajouter un commentaire..."
                                        className="min-h-[60px] resize-none text-sm border-[#EBE3D5] focus:border-[#F2A900] flex-1"
                                    />
                                    <Button
                                        size="sm"
                                        className="bg-[#1B5E20] hover:bg-[#15490F] text-white w-full sm:w-auto"
                                        onClick={() => performAction(() => setNewComment(''))}
                                    >
                                        <Send className="h-4 w-4 sm:mr-0" />
                                        <span className="sm:hidden ml-2">Publier</span>
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

// About Tab Component
const AboutTab: React.FC<{ establishment: any }> = ({ establishment }) => {
    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-xl font-black text-[#2D1B08] mb-4">Description</h3>
                    <p className="text-[#5D4037] leading-relaxed">{establishment.description}</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-xl font-black text-[#2D1B08] mb-4">Horaires d'ouverture</h3>
                    <div className="space-y-3">
                        {Object.entries(establishment.hours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between items-center">
                                <span className="font-bold text-[#2D1B08]">{day}</span>
                                <span className="text-[#5D4037]">{hours as string}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-xl font-black text-[#2D1B08] mb-4">Commodités</h3>
                    <div className="flex flex-wrap gap-2">
                        {establishment.amenities.map((amenity: string) => (
                            <Badge key={amenity} variant="outline" className="border-[#1B5E20] text-[#1B5E20] font-bold px-4 py-2">
                                <Award className="h-3 w-3 mr-2" />
                                {amenity}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                    <h3 className="text-xl font-black text-[#2D1B08] mb-4">Contact</h3>
                    <div className="space-y-4">
                        <a href={`tel:${establishment.contact.phone}`} className="flex items-center gap-3 text-[#5D4037] hover:text-[#F2A900] transition-colors">
                            <Phone className="h-5 w-5 text-[#F2A900]" />
                            <span className="font-bold">{establishment.contact.phone}</span>
                        </a>
                        <a href={`mailto:${establishment.contact.email}`} className="flex items-center gap-3 text-[#5D4037] hover:text-[#F2A900] transition-colors">
                            <Mail className="h-5 w-5 text-[#F2A900]" />
                            <span className="font-bold">{establishment.contact.email}</span>
                        </a>
                        <a href={`https://${establishment.contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#5D4037] hover:text-[#F2A900] transition-colors">
                            <Globe className="h-5 w-5 text-[#F2A900]" />
                            <span className="font-bold">{establishment.contact.website}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reviews Tab Component with Images
const ReviewsTab: React.FC<{ reviews: any[]; rating: number; reviewCount: number }> = ({ reviews, rating, reviewCount }) => {
    return (
        <div className="space-y-6">
            {/* Overall Rating with Cover Image */}
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80">
                {/* Background Cover Image */}
                <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop"
                    alt="Restaurant"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F2A900]/95 to-[#D49400]/95"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-6 sm:p-8 text-white text-center">
                    <div className="text-5xl sm:text-6xl md:text-7xl font-black mb-3 drop-shadow-2xl">{rating}</div>
                    <div className="flex items-center justify-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-6 w-6 sm:h-7 sm:w-7 drop-shadow-lg ${i < Math.floor(rating) ? 'fill-white text-white' : 'fill-white/30 text-white/30'}`} />
                        ))}
                    </div>
                    <p className="text-white font-black text-base sm:text-lg drop-shadow-lg">Basé sur {reviewCount} avis</p>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-2xl p-6 border-2 border-[#EBE3D5] shadow-sm">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 shrink-0">
                                <AvatarImage src={review.avatar} />
                                <AvatarFallback className="bg-[#F2A900] text-white font-black">
                                    {review.user.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-black text-[#2D1B08]">{review.user}</h4>
                                    <span className="text-xs text-[#5D4037]/70 font-bold">
                                        {new Date(review.date).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < review.rating ? 'fill-[#F2A900] text-[#F2A900]' : 'text-[#EBE3D5]'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-[#5D4037] leading-relaxed">{review.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Photos Tab Component
const PhotosTab: React.FC<{ posts: any[] }> = ({ posts }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer group border-2 border-[#EBE3D5] hover:border-[#F2A900] transition-all"
                >
                    <img
                        src={post.image}
                        alt="Photo"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop';
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

// Rooms Tab Component
const RoomsTab: React.FC<{ establishment: any; performAction: (callback: () => void) => void }> = ({ establishment, performAction }) => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<any>(null);

    const handleBookRoom = (room: any) => {
        setSelectedRoom(room);
        setIsBookingModalOpen(true);
    };

    if (!establishment.rooms || establishment.rooms.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-12 text-center border-2 border-[#EBE3D5] border-dashed">
                <Hotel className="h-16 w-16 mx-auto mb-4 text-[#EBE3D5]" />
                <h3 className="text-xl font-bold text-[#2D1B08]">Aucune chambre disponible</h3>
                <p className="text-[#5D4037]">Cet établissement n'a pas encore listé ses chambres.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {establishment.rooms.map((room: any) => (
                    <Card key={room.id} className="overflow-hidden border-2 border-[#EBE3D5] hover:border-[#F2A900] transition-all group shadow-sm hover:shadow-xl rounded-2xl">
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <img
                                src={room.image}
                                alt={room.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400';
                                }}
                            />
                            <div className="absolute top-4 right-4">
                                <Badge className="bg-white/90 backdrop-blur-sm text-[#1B5E20] border-none font-black shadow-sm">
                                    {room.price}
                                </Badge>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-black text-[#2D1B08] text-lg leading-tight">{room.name}</h4>
                                    <Badge variant="secondary" className="bg-[#EBE3D5]/50 text-[#5D4037] border-none text-[10px] uppercase tracking-widest font-black mt-1">
                                        {room.type}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-1 text-[#F2A900]">
                                    <Users className="h-4 w-4" />
                                    <span className="font-black text-sm">{room.capacity}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {room.amenities.slice(0, 3).map((amenity: string) => (
                                    <span key={amenity} className="text-[10px] font-black uppercase tracking-tighter bg-gray-50 text-[#5D4037] px-2.5 py-1 rounded-md border border-gray-100 italic">
                                        {amenity}
                                    </span>
                                ))}
                                {room.amenities.length > 3 && (
                                    <span className="text-[10px] font-black text-[#5D4037]/50 mt-1">
                                        +{room.amenities.length - 3}
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-2 mt-auto">
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedRoom(room)}
                                    className="flex-1 border-[#EBE3D5] text-[#2D1B08] hover:bg-[#EBE3D5]/20 font-black rounded-full transition-all"
                                >
                                    Détails
                                </Button>
                                <Button
                                    onClick={() => performAction(() => handleBookRoom(room))}
                                    className="flex-[1.5] bg-[#1B5E20] hover:bg-[#15490F] text-white font-black rounded-full transition-all flex items-center justify-center gap-2"
                                >
                                    <Calendar className="h-4 w-3.5" />
                                    Réserver
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modal de détails de la chambre */}
            {selectedRoom && !isBookingModalOpen && (
                <RoomDetailsModal
                    isOpen={!!selectedRoom}
                    onClose={() => setSelectedRoom(null)}
                    room={selectedRoom}
                    onBook={() => handleBookRoom(selectedRoom)}
                />
            )}

            {/* Modal de réservation */}
            {selectedRoom && isBookingModalOpen && (
                <AccommodationBookingModal
                    isOpen={isBookingModalOpen}
                    onClose={() => {
                        setIsBookingModalOpen(false);
                        setSelectedRoom(null);
                    }}
                    accommodation={{
                        ...establishment,
                        price: selectedRoom.price,
                        type: selectedRoom.type,
                        roomName: selectedRoom.name
                    }}
                />
            )}
        </div>
    );
};

// Enriched Room Details Modal
const RoomDetailsModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    room: any;
    onBook: () => void;
}> = ({ isOpen, onClose, room, onBook }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const images = room.images && room.images.length > 0 ? room.images : [room.image];

    const getAmenityIcon = (amenity: string) => {
        const a = amenity.toLowerCase();
        if (a.includes('wifi')) return <Wifi className="h-4 w-4" />;
        if (a.includes('tv')) return <Tv className="h-4 w-4" />;
        if (a.includes('café') || a.includes('petit-déjeuner')) return <Coffee className="h-4 w-4" />;
        if (a.includes('piscine') || a.includes('eau')) return <Waves className="h-4 w-4" />;
        if (a.includes('climatisation')) return <Waves className="h-4 w-4 rotate-90" />;
        return <Check className="h-4 w-4" />;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-none rounded-3xl shadow-2xl h-[90vh] lg:h-auto lg:max-h-[85vh]">
                <div className="flex flex-col lg:flex-row h-full lg:max-h-[85vh]">
                    {/* Visual Section: Image Gallery */}
                    <div className="w-full lg:w-1/2 relative bg-[#F8F9FA] h-[35vh] sm:h-[45vh] lg:h-auto flex-shrink-0">
                        <div className="h-full w-full relative overflow-hidden">
                            <img
                                src={images[activeImageIndex]}
                                alt={room.name}
                                className="w-full h-full object-cover"
                            />

                            {/* Navigation arrows for images */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all text-[#2D1B08] z-10"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all text-[#2D1B08] z-10"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </>
                            )}

                            {/* Image counter */}
                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest z-10">
                                {activeImageIndex + 1} / {images.length}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-4 right-16 flex gap-2 overflow-x-auto p-1 scrollbar-hide z-10">
                                {images.map((img: string, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`relative h-10 w-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${activeImageIndex === idx ? 'border-white ring-2 ring-[#F2A900]' : 'border-transparent opacity-70 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto bg-white">
                        <div className="flex justify-between items-start mb-2">
                            <Badge className="bg-[#F2A900]/10 text-[#F2A900] border-none font-black text-[10px] uppercase tracking-widest px-3">
                                {room.type}
                            </Badge>
                            <button onClick={onClose} className="text-[#2D1B08]/40 hover:text-[#2D1B08] p-1 transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <DialogHeader className="text-left p-0 mb-4">
                            <DialogTitle className="text-2xl sm:text-3xl font-black text-[#2D1B08] leading-tight">
                                {room.name}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="flex items-center gap-6 mb-8 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-[#EBE3D5]/30 flex items-center justify-center">
                                    <Users className="h-4 w-4 text-[#6B4226]" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#5D4037]/60 font-black uppercase tracking-tighter">Capacité</p>
                                    <p className="font-black text-[#2D1B08]">{room.capacity} personnes</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-[#F2A900]/10 flex items-center justify-center">
                                    <Award className="h-4 w-4 text-[#F2A900]" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#5D4037]/60 font-black uppercase tracking-tighter">Prix</p>
                                    <p className="font-black text-[#F2A900]">{room.price}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-xs font-black text-[#5D4037]/40 uppercase tracking-[0.2em] mb-3">Description</h3>
                            <p className="text-[#5D4037] leading-relaxed text-sm">
                                {room.description || "Profitez d'un séjour exceptionnel dans cette chambre élégamment aménagée, alliant confort moderne et charme authentique."}
                            </p>
                        </div>

                        {/* Amenities Grid */}
                        <div className="mb-8">
                            <h3 className="text-xs font-black text-[#5D4037]/40 uppercase tracking-[0.2em] mb-4">Équipements inclus</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {room.amenities.map((amenity: string) => (
                                    <div key={amenity} className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-50 border border-gray-100">
                                        <div className="text-[#1B5E20]">
                                            {getAmenityIcon(amenity)}
                                        </div>
                                        <span className="text-xs font-bold text-[#5D4037]">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="mt-auto pt-6 border-t border-[#EBE3D5]/50">
                            <Button
                                onClick={onBook}
                                className="w-full bg-[#1B5E20] hover:bg-[#15490F] text-white font-black py-4 sm:py-6 rounded-2xl text-lg transition-all shadow-xl shadow-[#1B5E20]/10 flex items-center justify-center gap-3"
                            >
                                <Calendar className="h-5 w-5" />
                                Réserver pour {room.price}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Menu Tab Component
const MenuTab: React.FC<{ performAction: (callback: () => void) => void }> = ({ performAction }) => {
    const mockMenuCategories = [
        {
            name: "Entrées",
            items: [
                { name: "Pastels au poisson", description: "Beignets farcis au poisson et aux épices, servis avec une sauce tomate piquante", price: "2 500 FCFA", popular: true },
                { name: "Salade Sénégalaise", description: "Mélange frais de légumes locaux, avocat, mangue et vinaigrette maison", price: "3 000 FCFA", popular: false },
                { name: "Accras de Niébé", description: "Beignets de haricots cornille croustillants", price: "2 000 FCFA", popular: false }
            ]
        },
        {
            name: "Plats Principaux",
            items: [
                { name: "Thiéboudienne (National)", description: "Riz au poisson avec légumes mijotés dans une sauce tomate parfumée", price: "4 000 FCFA", popular: true },
                { name: "Yassa Poulet", description: "Poulet mariné au citron et oignons confits, servi avec du riz blanc", price: "3 500 FCFA", popular: true },
                { name: "Mafé Bœuf", description: "Ragoût de bœuf à la pâte d'arachide onctueuse, pommes de terre et carottes", price: "4 000 FCFA", popular: false },
                { name: "Dibi Agneau", description: "Viande d'agneau grillée au feu de bois, oignons moutardés et frites", price: "6 000 FCFA", popular: true }
            ]
        },
        {
            name: "Desserts & Boissons",
            items: [
                { name: "Thiéré (Couscous sucré)", description: "Couscous de mil au lait caillé et sucre vanillé", price: "2 000 FCFA", popular: true },
                { name: "Jus de Bissap", description: "Infusion de fleurs d'hibiscus infusée à la menthe", price: "1 000 FCFA", popular: false },
                { name: "Jus de Bouye", description: "Jus crémeux de pain de singe (fruit du baobab)", price: "1 500 FCFA", popular: true }
            ]
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Intro */}
            <div className="bg-white rounded-[2rem] p-8 border-2 border-[#EBE3D5] text-center shadow-sm">
                <Utensils className="h-12 w-12 text-[#F2A900] mx-auto mb-4" />
                <h2 className="text-3xl font-black text-[#2D1B08] uppercase tracking-tighter mb-2">Notre Menu</h2>
                <p className="text-[#5D4037] max-w-xl mx-auto font-medium">
                    Découvrez une sélection de plats authentiques, préparés avec passion à partir de produits frais et locaux pour une expérience culinaire inoubliable.
                </p>
            </div>

            {/* Menu List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockMenuCategories.map((category, idx) => (
                    <div key={idx} className={`bg-white rounded-[2rem] p-6 sm:p-8 border-2 border-[#EBE3D5] shadow-md hover:shadow-xl transition-all ${idx === 1 ? 'md:col-span-2' : ''}`}>
                        <div className="flex items-center gap-3 mb-6 border-b-2 border-[#EBE3D5] pb-4">
                            <h3 className="text-xl sm:text-2xl font-black text-[#1B5E20] uppercase tracking-tight">{category.name}</h3>
                        </div>
                        <div className="space-y-6">
                            {category.items.map((item, idxi) => (
                                <div key={idxi} className="group">
                                    <div className="flex justify-between items-start gap-4 mb-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-lg text-[#2D1B08] group-hover:text-[#F2A900] transition-colors">{item.name}</h4>
                                            {item.popular && (
                                                <Badge className="bg-[#F2A900]/10 text-[#F2A900] border-none text-[8px] uppercase tracking-widest px-2 py-0">
                                                    Populaire
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="font-black text-[#2D1B08] whitespace-nowrap">{item.price}</div>
                                    </div>
                                    <p className="text-sm text-[#5D4037]/70 italic line-clamp-2 md:line-clamp-none pr-8">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Book Table */}
            <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-[2rem] p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <Calendar className="h-10 w-10 text-[#F2A900] mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-black mb-3 uppercase tracking-tighter">Réservez votre table</h3>
                    <p className="text-[#EBE3D5] mb-8 font-medium max-w-md mx-auto">
                        Assurez-vous d'avoir une place pour déguster nos spécialités dans un cadre chaleureux.
                    </p>
                    <Button
                        onClick={() => performAction(() => { })} // Could trigger a specific booking modal for tables
                        className="bg-[#F2A900] hover:bg-[#D49400] text-white font-black py-6 px-10 rounded-2xl text-sm uppercase tracking-widest shadow-xl shadow-[#F2A900]/20 transition-transform hover:scale-105"
                    >
                        Réserver maintenant
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Offers Tab Component for Travel Agencies
const OffersTab: React.FC<{ establishment: any, performAction: (callback: () => void) => void }> = ({ establishment, performAction }) => {
    // Determine the offers to display
    const offers = establishment.offers || [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Intro */}
            <div className="bg-white rounded-[2rem] p-8 border-2 border-[#EBE3D5] text-center shadow-sm">
                <Plane className="h-12 w-12 text-[#F2A900] mx-auto mb-4" />
                <h2 className="text-3xl font-black text-[#2D1B08] uppercase tracking-tighter mb-2">Nos Offres & Circuits</h2>
                <p className="text-[#5D4037] max-w-xl mx-auto font-medium">
                    Plongez au cœur d'expériences uniques organisées de A à Z par notre équipe. De l'aventure sauvage à la détente absolue.
                </p>
            </div>

            {/* Empty State */}
            {offers.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-[#5D4037]">Aucune offre n'est disponible pour le moment.</p>
                </div>
            )}

            {/* Offers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {offers.map((offer: any) => (
                    <Card key={offer.id} className="overflow-hidden rounded-[2rem] border-2 border-[#EBE3D5] shadow-md hover:shadow-xl transition-all group flex flex-col h-full bg-white">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {offer.duration && (
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-[#1B5E20]/90 backdrop-blur-md text-white border-none font-bold shadow-lg flex items-center gap-1.5 px-3 py-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {offer.duration}
                                    </Badge>
                                </div>
                            )}
                        </div>

                        <CardContent className="p-6 flex-1 flex flex-col pt-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-4 gap-2 sm:gap-4">
                                <div className="w-full sm:w-auto">
                                    <h3 className="text-xl font-black text-[#2D1B08] leading-tight mb-2 group-hover:text-[#F2A900] transition-colors">{offer.title}</h3>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm font-bold text-[#5D4037]">
                                        {offer.capacity && (
                                            <span className="flex items-center gap-1.5 bg-[#EBE3D5]/50 px-2.5 py-1 rounded-lg">
                                                <Users size={14} className="text-[#F2A900]" />
                                                Max {offer.capacity} pers.
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-left sm:text-right shrink-0 mt-2 sm:mt-0 w-full sm:w-auto p-3 sm:p-0 bg-[#F9F6F2] sm:bg-transparent rounded-xl sm:rounded-none">
                                    <p className="text-[10px] font-black text-[#5D4037] uppercase tracking-widest mb-0.5">À PARTIR DE</p>
                                    <p className="text-2xl font-black text-[#1B5E20]">{offer.price}</p>
                                </div>
                            </div>

                            <p className="text-sm text-[#5D4037] leading-relaxed mb-6 font-medium line-clamp-3">
                                {offer.description}
                            </p>

                            <div className="mt-auto">
                                <h4 className="text-xs font-black text-[#2D1B08] uppercase tracking-widest mb-3">Inclus dans l'offre</h4>
                                <div className="grid grid-cols-2 gap-2 mb-6">
                                    {offer.amenities?.map((amenity: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-[#5D4037] font-medium bg-[#F5F5F5] rounded-xl px-3 py-1.5">
                                            <Check className="h-3.5 w-3.5 text-[#1B5E20]" />
                                            <span className="truncate">{amenity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#EBE3D5]">
                                    <Button
                                        className="w-full sm:flex-1 bg-[#1B5E20] hover:bg-[#15490F] text-white font-black rounded-xl py-6 tracking-wide shadow-lg shadow-[#1B5E20]/20 text-xs sm:text-sm"
                                        onClick={() => performAction(() => { })}
                                    >
                                        Demander un devis
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full sm:flex-1 border-2 border-[#EBE3D5] text-[#2D1B08] hover:bg-[#F5F5F5] font-black rounded-xl py-6 tracking-wide text-xs sm:text-sm"
                                        onClick={() => performAction(() => { })}
                                    >
                                        Voir les détails
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* CTA Contact Agency */}
            <div className="bg-gradient-to-br from-[#F2A900] to-[#E59400] rounded-[2rem] p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl mt-8">
                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 flex flex-col items-center border-[3px] border-white/20 p-8 rounded-3xl">
                    <Map className="h-10 w-10 text-white mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-black mb-3 uppercase tracking-tighter">Votre voyage sur-mesure !</h3>
                    <p className="text-white/90 mb-8 font-medium max-w-lg mx-auto text-lg leading-relaxed">
                        Vous ne trouvez pas l'offre idéale ? Contactez-nous pour créer le circuit de vos rêves.
                    </p>
                    <Button
                        onClick={() => performAction(() => { })}
                        className="bg-white hover:bg-[#FFFDFB] text-[#F2A900] font-black py-7 px-10 rounded-2xl text-[15px] uppercase tracking-widest shadow-xl transition-all hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                    >
                        <MessageSquare className="h-5 w-5" />
                        NOUS CONTACTER
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EstablishmentProfilePage;
