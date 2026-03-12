import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Users,
    Clock,
    ArrowLeft,
    Star,
    MapPin,
    CheckCircle2,
    Plane,
    Leaf,
    Camera,
    Compass,
    Palmtree,
    Mountain,
    TrendingUp,
    Eye,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const TYPE_CONFIG: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
    'Safari': { color: '#D97706', bg: '#FEF3C7', icon: <Leaf className="h-3 w-3" /> },
    'Nature & Aventure': { color: '#059669', bg: '#D1FAE5', icon: <Mountain className="h-3 w-3" /> },
    'Culturel': { color: '#7C3AED', bg: '#EDE9FE', icon: <Compass className="h-3 w-3" /> },
    'Éco-Tourisme': { color: '#0D9488', bg: '#CCFBF1', icon: <Leaf className="h-3 w-3" /> },
    'Détente': { color: '#EC4899', bg: '#FCE7F3', icon: <Palmtree className="h-3 w-3" /> },
    'Aventure': { color: '#DC2626', bg: '#FEE2E2', icon: <Mountain className="h-3 w-3" /> },
    'Photo & Art': { color: '#2563EB', bg: '#DBEAFE', icon: <Camera className="h-3 w-3" /> },
};

const mockOffersData = [
    {
        id: '1',
        title: 'Safari Delta du Saloum',
        type: 'Safari',
        price: '150,000',
        duration: '3 jours',
        capacity: 12,
        booked: 8,
        status: 'Active',
        rating: 4.9,
        reviews: 47,
        location: 'Delta du Saloum',
        amenities: ['Transport inclus', 'Hébergement', 'Repas', 'Guide certifié'],
        description: 'Une immersion totale dans la réserve de biosphère du Delta du Saloum. Pirogue, observation d\'oiseaux migrateurs, mangroves.',
        images: ['https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80']
    },
    {
        id: '2',
        title: 'Circuit Casamance Authentique',
        type: 'Culturel',
        price: '280,000',
        duration: '7 jours',
        capacity: 8,
        booked: 5,
        status: 'Active',
        rating: 4.8,
        reviews: 32,
        location: 'Casamance',
        amenities: ['Vols internes', 'Hébergement chez l\'habitant', 'Repas traditionnels'],
        description: 'Découvrez les traditions Diola et les paysages luxuriants de la Casamance. Cases à impluvium, cérémonies ancestrales.',
        images: ['https://images.unsplash.com/photo-1523805009345-7448842a9e1d?w=800&q=80']
    },
    {
        id: '3',
        title: 'Aventure Lac Rose & Désert',
        type: 'Aventure',
        price: '95,000',
        duration: '2 jours',
        capacity: 16,
        booked: 12,
        status: 'Active',
        rating: 4.7,
        reviews: 89,
        location: 'Lac Rose, Thiès',
        amenities: ['4x4 inclus', 'Camping étoilé', 'Repas du soir', 'Guide local'],
        description: 'Traversée en 4x4 des dunes de Lompoul, baignade dans le lac rose. Nuit sous les étoiles avec feu de camp.',
        images: ['https://images.unsplash.com/photo-1509316785289-025f5b8462e7?w=800&q=80']
    },
    {
        id: '4',
        title: 'Retraite Éco-Lodge Sine Saloum',
        type: 'Éco-Tourisme',
        price: '220,000',
        duration: '5 jours',
        capacity: 6,
        booked: 3,
        status: 'Active',
        rating: 5.0,
        reviews: 18,
        location: 'Sine Saloum',
        amenities: ['Lodge écologique', 'Kayak & paddleboard', 'Repas bio locaux', 'Yoga matinal'],
        description: 'Séjour immersif dans un lodge 100% éco-responsable, au cœur de la mangrove primaire. Idéal pour la déconnexion et la nature.',
        images: ['https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80']
    },
    {
        id: '5',
        title: 'Dakar Street Art & Gastronomie',
        type: 'Photo & Art',
        price: '65,000',
        duration: '1 jour',
        capacity: 20,
        booked: 17,
        status: 'Active',
        rating: 4.6,
        reviews: 124,
        location: 'Dakar',
        amenities: ['Van privé', 'Déjeuner gastronomique', 'Photographe local', 'Atelier djembé'],
        description: 'Tour immersif des quartiers artistiques de Dakar : Ouakam, Medina et Grand Dakar. Rencontre avec des artistes locaux.',
        images: ['https://images.unsplash.com/photo-1571732154690-f6d1c3e5178a?w=800&q=80']
    },
    {
        id: '6',
        title: 'Grand Tour du Sénégal',
        type: 'Culturel',
        price: '520,000',
        duration: '14 jours',
        capacity: 10,
        booked: 2,
        status: 'Active',
        rating: 4.9,
        reviews: 12,
        location: 'Sénégal complet',
        amenities: ['Vols internes', 'Hôtels 4★', 'Tous repas', 'Guide bilingue', 'Assurance voyage'],
        description: 'Le Grand Tour : Dakar → Saint-Louis → Touba → Tambacounda → Casamance → Saly. Le Sénégal dans toute sa splendeur.',
        images: ['https://images.unsplash.com/photo-1612531387486-08ccb79b7f4e?w=800&q=80']
    },
    {
        id: '7',
        title: 'Plages & Détente à Saly',
        type: 'Détente',
        price: '180,000',
        duration: '4 jours',
        capacity: 14,
        booked: 9,
        status: 'Active',
        rating: 4.5,
        reviews: 67,
        location: 'Saly Portudal',
        amenities: ['Resort bord de mer', 'Spa & hammam', 'Sports nautiques', 'Excursion optionnelle'],
        description: 'Farniente et luxe sur les plages dorées de la Petite Côte. Spa, sports nautiques et cuisine créole dans un resort 5 étoiles.',
        images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80']
    },
];

const AgencyOffersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedDetailOffer, setSelectedDetailOffer] = useState<any>(null);
    const [detailImageIndex, setDetailImageIndex] = useState(0);
    const [offers, setOffers] = useState(mockOffersData);
    const [formImages, setFormImages] = useState<string[]>(['']);

    const filteredOffers = offers.filter(offer =>
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddOffer = () => {
        setSelectedOffer(null);
        setIsEditing(false);
        setFormImages(['']);
        setIsDialogOpen(true);
    };

    const handleEditOffer = (offer: any) => {
        setSelectedOffer(offer);
        setIsEditing(true);
        setFormImages(offer.images?.length > 0 ? [...offer.images] : ['']);
        setIsDialogOpen(true);
    };

    const handleAddImageField = () => setFormImages([...formImages, '']);

    const handleRemoveImageField = (index: number) => {
        const n = [...formImages];
        n.splice(index, 1);
        setFormImages(n.length > 0 ? n : ['']);
    };

    const handleImageChange = (index: number, value: string) => {
        const n = [...formImages];
        n[index] = value;
        setFormImages(n);
    };

    const handleSaveOffer = () => {
        const get = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value || '';
        const cleanedImages = formImages.filter(img => img.trim() !== '');
        if (cleanedImages.length === 0) { alert('Veuillez ajouter au moins une image.'); return; }

        const offerData = {
            id: isEditing ? selectedOffer.id : Math.random().toString(36).substr(2, 9),
            title: get('title'),
            type: selectedOffer?.type || 'Culturel',
            price: get('price'),
            duration: get('duration'),
            capacity: parseInt(get('capacity')) || 10,
            booked: 0,
            status: 'Active',
            rating: 4.5,
            reviews: 0,
            location: get('location'),
            description: get('description'),
            amenities: get('amenities').split(',').map(a => a.trim()).filter(Boolean),
            images: cleanedImages
        };

        if (isEditing) {
            setOffers(offers.map(o => o.id === selectedOffer.id ? offerData : o));
        } else {
            setOffers([...offers, offerData]);
        }
        setIsDialogOpen(false);
    };

    const handleDeleteOffer = (id: string) => {
        if (confirm('Supprimer cette offre ?')) setOffers(offers.filter(o => o.id !== id));
    };

    const totalBooked = offers.reduce((a, o) => a + (o.booked || 0), 0);
    const totalCapacity = offers.reduce((a, o) => a + o.capacity, 0);

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <Link to="/dashboard">
                        <Button variant="ghost" size="sm" className="mb-3 text-[#6B4226] hover:bg-[#F2A900]/10">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-black text-[#2D1B08] tracking-tight">Nos Offres & Circuits</h1>
                    <p className="text-[#5D4037]/70 mt-1 font-medium">Gérez vos packages touristiques et leur visibilité</p>
                </div>
                <Button
                    onClick={handleAddOffer}
                    className="bg-[#F2A900] hover:bg-[#D49400] text-white font-black px-6 py-5 rounded-full shadow-lg shadow-[#F2A900]/30 transition-all hover:scale-105"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Nouvelle Offre
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Offres', value: offers.length, color: 'text-[#2D1B08]', bg: 'bg-white', border: 'border-[#EBE3D5]', icon: <Compass className="h-5 w-5 text-[#F2A900]" /> },
                    { label: 'Offres Actives', value: offers.filter(o => o.status === 'Active').length, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" /> },
                    { label: 'Voyageurs Inscrits', value: totalBooked, color: 'text-[#F2A900]', bg: 'bg-amber-50', border: 'border-amber-200', icon: <Users className="h-5 w-5 text-[#F2A900]" /> },
                    { label: 'Taux de Remplissage', value: `${Math.round((totalBooked / totalCapacity) * 100)}%`, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: <TrendingUp className="h-5 w-5 text-blue-600" /> },
                ].map((s, i) => (
                    <div key={i} className={`${s.bg} border-2 ${s.border} rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5 min-h-[90px]`}>
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                            {s.icon}
                        </div>
                        <p className={`text-xl font-black leading-none ${s.color} mt-0.5`}>{s.value}</p>
                        <p className="text-[10px] text-[#5D4037]/60 font-bold uppercase tracking-wide leading-tight">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5D4037]/40" />
                <Input
                    placeholder="Rechercher par titre, type, destination..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-6 text-base rounded-2xl border-2 border-[#EBE3D5] focus:border-[#F2A900] bg-white shadow-sm"
                />
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOffers.map((offer) => {
                    const typeConf = TYPE_CONFIG[offer.type] || { color: '#6B4226', bg: '#EBE3D5', icon: <Plane className="h-3 w-3" /> };
                    const fillPct = Math.round(((offer.booked || 0) / offer.capacity) * 100);

                    return (
                        <div
                            key={offer.id}
                            className="group bg-white rounded-[1.5rem] overflow-hidden border-2 border-[#EBE3D5] hover:border-[#F2A900] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden flex-shrink-0">
                                <img
                                    src={offer.images[0]}
                                    alt={offer.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800'; }}
                                />
                                {/* Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                {/* Type Badge */}
                                <div
                                    className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md"
                                    style={{ backgroundColor: typeConf.bg, color: typeConf.color }}
                                >
                                    {typeConf.icon}
                                    {offer.type}
                                </div>

                                {/* Status */}
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-black ${offer.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-gray-400 text-white'}`}>
                                    {offer.status}
                                </div>

                                {/* Bottom info on image */}
                                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-white">
                                        <MapPin className="h-3.5 w-3.5 text-[#F2A900]" />
                                        <span className="text-xs font-bold drop-shadow">{offer.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                        <Star className="h-3 w-3 text-[#F2A900] fill-[#F2A900]" />
                                        <span className="text-white text-xs font-black">{offer.rating}</span>
                                        <span className="text-white/70 text-xs">({offer.reviews})</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1 gap-3">
                                {/* Title & Price */}
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-lg font-black text-[#2D1B08] leading-tight">{offer.title}</h3>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-base font-black text-[#F2A900]">{offer.price}</p>
                                        <p className="text-[10px] text-[#5D4037]/50 font-bold">FCFA/pers.</p>
                                    </div>
                                </div>

                                {/* Meta */}
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="flex items-center gap-1.5 text-[#5D4037]">
                                        <Clock className="h-4 w-4 text-[#F2A900]" />
                                        <span className="font-bold">{offer.duration}</span>
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[#5D4037]">
                                        <Users className="h-4 w-4 text-[#F2A900]" />
                                        <span className="font-bold">{offer.capacity} pers. max</span>
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-[#5D4037]/70 leading-relaxed line-clamp-2">{offer.description}</p>

                                {/* Fill rate bar */}
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-[#5D4037]/60 mb-1.5">
                                        <span>Remplissage</span>
                                        <span>{offer.booked || 0}/{offer.capacity} inscrits</span>
                                    </div>
                                    <div className="h-1.5 bg-[#EBE3D5] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${fillPct}%`,
                                                backgroundColor: fillPct > 80 ? '#DC2626' : fillPct > 50 ? '#F2A900' : '#059669'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div className="flex flex-wrap gap-1.5">
                                    {offer.amenities.slice(0, 3).map((a, i) => (
                                        <span key={i} className="inline-flex items-center gap-1 text-[10px] bg-[#F9F6F2] border border-[#EBE3D5] text-[#6B4226] px-2 py-1 rounded-full font-bold">
                                            <CheckCircle2 className="h-2.5 w-2.5 text-[#F2A900]" />
                                            {a}
                                        </span>
                                    ))}
                                    {offer.amenities.length > 3 && (
                                        <span className="text-[10px] text-[#5D4037]/50 font-bold self-center">+{offer.amenities.length - 3}</span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-3 mt-auto border-t border-[#EBE3D5]">
                                    <Button
                                        onClick={() => { setSelectedDetailOffer(offer); setDetailImageIndex(0); }}
                                        variant="outline"
                                        className="flex-1 border-2 border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black rounded-xl py-5 text-sm transition-all"
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        Détail
                                    </Button>
                                    <Button
                                        onClick={() => handleEditOffer(offer)}
                                        className="flex-1 bg-[#6B4226] hover:bg-[#5D3820] text-white font-black rounded-xl py-5 text-sm transition-all"
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDeleteOffer(offer.id)}
                                        className="h-10 w-10 rounded-xl border-2 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Add new offer card */}
                <button
                    onClick={handleAddOffer}
                    className="border-2 border-dashed border-[#EBE3D5] hover:border-[#F2A900] rounded-[1.5rem] flex flex-col items-center justify-center gap-4 py-16 text-[#5D4037]/40 hover:text-[#F2A900] transition-all group min-h-[300px]"
                >
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="h-8 w-8" />
                    </div>
                    <span className="font-black text-sm uppercase tracking-widest">Ajouter une offre</span>
                </button>
            </div>

            {/* ===== DETAIL MODAL ===== */}
            {selectedDetailOffer && (() => {
                const typeConf = TYPE_CONFIG[selectedDetailOffer.type] || { color: '#6B4226', bg: '#EBE3D5', icon: <Plane className="h-4 w-4" /> };
                const fillPct = Math.round(((selectedDetailOffer.booked || 0) / selectedDetailOffer.capacity) * 100);
                const imgs = selectedDetailOffer.images || [];
                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
                        <div className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in slide-in-from-bottom-4 duration-300">
                            {/* Close */}
                            <button
                                onClick={() => setSelectedDetailOffer(null)}
                                className="absolute top-5 right-5 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-[#F2A900] hover:text-white transition-all"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Image Gallery */}
                            <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-[2rem]">
                                <img
                                    src={imgs[detailImageIndex] || imgs[0]}
                                    alt={selectedDetailOffer.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800'; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                {/* Type Badge */}
                                <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-lg"
                                    style={{ backgroundColor: typeConf.bg, color: typeConf.color }}>
                                    {typeConf.icon}
                                    {selectedDetailOffer.type}
                                </div>

                                {/* Gallery navigation */}
                                {imgs.length > 1 && (
                                    <>
                                        <button onClick={() => setDetailImageIndex(i => (i - 1 + imgs.length) % imgs.length)}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-all">
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => setDetailImageIndex(i => (i + 1) % imgs.length)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-all">
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                            {imgs.map((_: string, i: number) => (
                                                <button key={i} onClick={() => setDetailImageIndex(i)}
                                                    className={`w-2 h-2 rounded-full transition-all ${i === detailImageIndex ? 'bg-[#F2A900] w-5' : 'bg-white/50'}`} />
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Bottom overlay */}
                                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-white">
                                        <MapPin className="h-4 w-4 text-[#F2A900]" />
                                        <span className="text-sm font-bold drop-shadow">{selectedDetailOffer.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                        <Star className="h-4 w-4 text-[#F2A900] fill-[#F2A900]" />
                                        <span className="text-white font-black">{selectedDetailOffer.rating}</span>
                                        <span className="text-white/70 text-sm">({selectedDetailOffer.reviews} avis)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-5">
                                {/* Title & Price */}
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-black text-[#2D1B08] leading-tight">{selectedDetailOffer.title}</h2>
                                        <div className={`inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-black ${selectedDetailOffer.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${selectedDetailOffer.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                                            {selectedDetailOffer.status}
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0 bg-[#F2A900]/10 rounded-2xl px-4 py-3">
                                        <p className="text-2xl font-black text-[#F2A900]">{selectedDetailOffer.price}</p>
                                        <p className="text-xs text-[#5D4037]/60 font-bold">FCFA / personne</p>
                                    </div>
                                </div>

                                {/* Key Stats */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { icon: <Clock className="h-5 w-5 text-[#F2A900]" />, label: 'Durée', value: selectedDetailOffer.duration },
                                        { icon: <Users className="h-5 w-5 text-[#F2A900]" />, label: 'Capacité', value: `${selectedDetailOffer.capacity} pers.` },
                                        { icon: <TrendingUp className="h-5 w-5 text-[#F2A900]" />, label: 'Inscrits', value: `${selectedDetailOffer.booked || 0} / ${selectedDetailOffer.capacity}` },
                                    ].map((s, i) => (
                                        <div key={i} className="bg-[#F9F6F2] rounded-2xl p-3.5 flex flex-col gap-2">
                                            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">{s.icon}</div>
                                            <p className="text-[11px] font-bold text-[#5D4037]/60 uppercase tracking-wider">{s.label}</p>
                                            <p className="font-black text-[#2D1B08] text-sm">{s.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Fill rate */}
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-[#5D4037]/60 mb-2">
                                        <span>Taux de remplissage</span>
                                        <span className="font-black" style={{ color: fillPct > 80 ? '#DC2626' : fillPct > 50 ? '#F2A900' : '#059669' }}>{fillPct}%</span>
                                    </div>
                                    <div className="h-2.5 bg-[#EBE3D5] rounded-full overflow-hidden">
                                        <div className="h-full rounded-full transition-all duration-700"
                                            style={{ width: `${fillPct}%`, backgroundColor: fillPct > 80 ? '#DC2626' : fillPct > 50 ? '#F2A900' : '#059669' }} />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h4 className="font-black text-[#2D1B08] mb-2">Description</h4>
                                    <p className="text-sm text-[#5D4037]/80 leading-relaxed bg-[#F9F6F2] rounded-2xl p-4">{selectedDetailOffer.description}</p>
                                </div>

                                {/* Amenities */}
                                <div>
                                    <h4 className="font-black text-[#2D1B08] mb-3">Ce qui est inclus</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedDetailOffer.amenities.map((a: string, i: number) => (
                                            <span key={i} className="inline-flex items-center gap-2 bg-[#F2A900]/10 border border-[#F2A900]/20 text-[#6B4226] px-3 py-1.5 rounded-full text-sm font-bold">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-[#F2A900]" />
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-3 pt-2 border-t border-[#EBE3D5]">
                                    <Button
                                        onClick={() => { setSelectedDetailOffer(null); handleEditOffer(selectedDetailOffer); }}
                                        className="flex-1 bg-[#6B4226] hover:bg-[#5D3820] text-white font-black py-5 rounded-xl"
                                    >
                                        <Edit className="h-4 w-4 mr-2" /> Modifier cette offre
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedDetailOffer(null)}
                                        className="border-2 border-[#EBE3D5] text-[#5D4037] hover:bg-[#F9F6F2] font-black py-5 px-6 rounded-xl"
                                    >
                                        Fermer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black text-[#2D1B08]">
                            {isEditing ? "Modifier l'offre" : 'Nouvelle offre'}
                        </DialogTitle>
                        <DialogDescription>Détails du circuit ou package touristique</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="title" className="font-bold text-[#2D1B08]">Titre de l'Offre</Label>
                            <Input id="title" defaultValue={selectedOffer?.title} placeholder="Ex: Safari Delta du Saloum" className="mt-1 border-[#EBE3D5] focus:border-[#F2A900]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="font-bold text-[#2D1B08]">Type de Circuit</Label>
                                <Select defaultValue={selectedOffer?.type}>
                                    <SelectTrigger className="mt-1 border-[#EBE3D5]">
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(TYPE_CONFIG).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                        <SelectItem value="Aventure">Aventure</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="location" className="font-bold text-[#2D1B08]">Destination</Label>
                                <Input id="location" defaultValue={selectedOffer?.location} placeholder="Ex: Delta du Saloum" className="mt-1 border-[#EBE3D5]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="price" className="font-bold text-[#2D1B08]">Prix (FCFA/pers.)</Label>
                                <Input id="price" defaultValue={selectedOffer?.price} placeholder="150,000" className="mt-1 border-[#EBE3D5]" />
                            </div>
                            <div>
                                <Label htmlFor="duration" className="font-bold text-[#2D1B08]">Durée</Label>
                                <Input id="duration" defaultValue={selectedOffer?.duration} placeholder="3 jours" className="mt-1 border-[#EBE3D5]" />
                            </div>
                            <div>
                                <Label htmlFor="capacity" className="font-bold text-[#2D1B08]">Capacité max</Label>
                                <Input id="capacity" type="number" defaultValue={selectedOffer?.capacity} placeholder="12" className="mt-1 border-[#EBE3D5]" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="description" className="font-bold text-[#2D1B08]">Description</Label>
                            <Textarea id="description" defaultValue={selectedOffer?.description} placeholder="Décrivez l'expérience..." rows={3} className="mt-1 border-[#EBE3D5]" />
                        </div>
                        <div>
                            <Label htmlFor="amenities" className="font-bold text-[#2D1B08]">Inclus (séparés par virgule)</Label>
                            <Input id="amenities" defaultValue={selectedOffer?.amenities?.join(', ')} placeholder="Transport, Hébergement, Repas, Guide" className="mt-1 border-[#EBE3D5]" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="font-bold text-[#2D1B08]">Images (URLs)</Label>
                                <Button type="button" variant="outline" size="sm" onClick={handleAddImageField} className="text-[#F2A900] border-[#F2A900]/30 hover:bg-[#F2A900]/10 text-xs">
                                    <Plus className="h-3 w-3 mr-1" /> Ajouter
                                </Button>
                            </div>
                            {formImages.map((url, i) => (
                                <div key={i} className="flex gap-2">
                                    <Input value={url} onChange={(e) => handleImageChange(i, e.target.value)} placeholder="https://images.unsplash.com/..." className="border-[#EBE3D5]" />
                                    {formImages.length > 1 && (
                                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveImageField(i)} className="text-red-400 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[#EBE3D5]">Annuler</Button>
                        <Button onClick={handleSaveOffer} className="bg-[#F2A900] hover:bg-[#D49400] text-white font-black">
                            {isEditing ? 'Enregistrer' : 'Ajouter l\'offre'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AgencyOffersPage;
