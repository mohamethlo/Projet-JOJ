import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
    Send,
    Reply
} from 'lucide-react';

const EstablishmentProfilePage: React.FC = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<'publications' | 'about' | 'reviews' | 'photos'>('publications');
    const [isFollowing, setIsFollowing] = useState(false);

    // Mock data - will be replaced with API call
    const establishment = {
        id: id || '1',
        name: 'Le Djoloff Royal',
        category: 'Restaurant',
        tagline: 'Saveurs authentiques du Sénégal dans un cadre royal',
        description: 'Découvrez l\'essence de la cuisine sénégalaise dans notre restaurant emblématique. Depuis 1998, nous perpétuons les traditions culinaires avec passion et authenticité.',
        coverImage: '/images/restaurant_cover.jpg',
        profileImage: '/images/restaurant_profile.jpg',
        location: 'Dakar, Plateau',
        followers: 2847,
        posts: 156,
        rating: 4.8,
        reviewCount: 342,
        verified: true,
        contact: {
            phone: '+221 33 821 45 67',
            email: 'contact@djoloffroyal.sn',
            website: 'www.djoloffroyal.sn'
        },
        hours: {
            'Lundi - Vendredi': '12h00 - 23h00',
            'Samedi - Dimanche': '11h00 - 00h00'
        },
        amenities: ['WiFi Gratuit', 'Terrasse', 'Parking', 'Climatisation', 'Service Traiteur']
    };

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
                                            {establishment.category === 'Restaurant' ? (
                                                <Utensils className="h-3 w-3 mr-1" />
                                            ) : (
                                                <Hotel className="h-3 w-3 mr-1" />
                                            )}
                                            {establishment.category}
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
                                            <span className="text-[#5D4037]/70">({establishment.reviewCount})</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                    <Button
                                        onClick={() => setIsFollowing(!isFollowing)}
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
                                        className="border-[#6B4226] text-[#6B4226] hover:bg-[#6B4226] hover:text-white font-black rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm"
                                    >
                                        <Phone className="h-4 w-4 mr-1.5" />
                                        <span className="hidden xs:inline">Contacter</span>
                                        <span className="xs:hidden">Appel</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white font-black rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm"
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
                            { id: 'about', label: 'À propos', shortLabel: 'Info', icon: MessageSquare },
                            { id: 'reviews', label: 'Avis', shortLabel: 'Avis', icon: Star },
                            { id: 'photos', label: 'Photos', shortLabel: 'Photos', icon: ImageIcon }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
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
                        <PublicationsTab posts={mockPosts} />
                    )}
                    {activeTab === 'about' && (
                        <AboutTab establishment={establishment} />
                    )}
                    {activeTab === 'reviews' && (
                        <ReviewsTab reviews={mockReviews} rating={establishment.rating} reviewCount={establishment.reviewCount} />
                    )}
                    {activeTab === 'photos' && (
                        <PhotosTab posts={mockPosts} />
                    )}
                </div>
            </div>
        </div>
    );
};

// Publications Tab Component with Comments
const PublicationsTab: React.FC<{ posts: any[] }> = ({ posts }) => {
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
                                <button className="flex items-center gap-2 text-[#F2A900] hover:text-[#D49400] font-bold transition-colors">
                                    <Heart className="h-5 w-5" />
                                    <span>{post.likes}</span>
                                </button>
                                <button
                                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
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
                                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
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
                                        onClick={() => setNewComment('')}
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

export default EstablishmentProfilePage;
