import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Star,
    ArrowLeft,
    User,
    Calendar,
    Search,
    MapPin,
    TrendingUp,
    ThumbsUp,
    MessageSquare,
    Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const mockReviews = [
    {
        id: '1',
        guestName: 'Amadou Ndiaye',
        rating: 5,
        date: '22 Février 2026',
        circuit: 'Safari Delta du Saloum',
        comment: 'Voyage exceptionnel ! Le guide était fascinant, les paysages à couper le souffle. On a vu des oiseaux migrateurs incroyables. L\'hébergement en pleine nature était parfait. Je recommande fortement cette expérience unique.',
        helpful: 12
    },
    {
        id: '2',
        guestName: 'Marie Lecomte',
        rating: 5,
        date: '18 Février 2026',
        circuit: 'Circuit Casamance Authentique',
        comment: 'Une immersion culturelle incomparable. Les villageois Diola sont d\'une gentillesse rare. Les cases à impluvium valent vraiment le détour. L\'agence a parfaitement tout organisé, aucun stress.',
        helpful: 9
    },
    {
        id: '3',
        guestName: 'Jean-Pierre Durand',
        rating: 4,
        date: '14 Février 2026',
        circuit: 'Retraite Éco-Lodge Sine Saloum',
        comment: 'Très belle expérience éco-responsable. Le lodge est magnifique, les repas bio délicieux. Le kayak dans la mangrove au lever du soleil : un souvenir inoubliable. Juste un point : le WiFi aurait pu être un peu meilleur.',
        helpful: 7
    },
    {
        id: '4',
        guestName: 'Fatou Sow',
        rating: 5,
        date: '10 Février 2026',
        circuit: 'Dakar Street Art & Gastronomie',
        comment: 'Journée parfaite ! La guide Aïssatou connaît Dakar comme sa poche. Les quartiers artistiques sont une vraie révélation. Le déjeuner gastronomique était sublime. Je referais ce circuit les yeux fermés.',
        helpful: 15
    },
    {
        id: '5',
        guestName: 'Thomas Beaumont',
        rating: 4,
        date: '5 Février 2026',
        circuit: 'Aventure Lac Rose & Désert',
        comment: 'Superbe aventure en 4x4 ! Les dunes de Lompoul sont impressionnantes et la nuit sous les étoiles était magique. Le feu de camp avec la musique locale était un vrai plus. À refaire absolument !',
        helpful: 11
    },
    {
        id: '6',
        guestName: 'Ndeye Diop',
        rating: 5,
        date: '28 Janvier 2026',
        circuit: 'Plages & Détente à Saly',
        comment: 'Un pur moment de bonheur ! Le resort était parfait, le spa vraiment relaxant. L\'excursion en pirogue optionnelle était une excellente idée. L\'équipe de l\'agence est toujours disponible et souriante.',
        helpful: 8
    },
    {
        id: '7',
        guestName: 'Sophie Martin',
        rating: 3,
        date: '20 Janvier 2026',
        circuit: 'Safari Delta du Saloum',
        comment: 'Bon circuit dans l\'ensemble mais le transport au départ de Dakar a pris beaucoup de retard. La nature était quand même splendide et le guide très compétent. L\'agence a fait des gestes pour compenser le retard, ce qui est bien.',
        helpful: 4
    },
];

const AgencyReviewsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ratingFilter, setRatingFilter] = useState('Tous');

    const filtered = mockReviews.filter(r => {
        const matchesSearch =
            r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.circuit.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.comment.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = ratingFilter === 'Tous' || r.rating === parseInt(ratingFilter);
        return matchesSearch && matchesRating;
    });

    const avgRating = mockReviews.reduce((s, r) => s + r.rating, 0) / mockReviews.length;
    const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    mockReviews.forEach(r => dist[r.rating]++);
    const satisfactionRate = ((dist[5] + dist[4]) / mockReviews.length * 100).toFixed(0);

    const renderStars = (rating: number, size = 'h-4 w-4') =>
        [...Array(5)].map((_, i) => (
            <Star key={i} className={`${size} ${i < rating ? 'fill-[#F2A900] text-[#F2A900]' : 'text-[#EBE3D5]'}`} />
        ));

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <Link to="/dashboard">
                    <Button variant="ghost" size="sm" className="mb-3 text-[#6B4226] hover:bg-[#F2A900]/10">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                    </Button>
                </Link>
                <h1 className="text-3xl font-black text-[#2D1B08] tracking-tight">Avis Clients</h1>
                <p className="text-[#5D4037]/70 mt-1 font-medium">Retours de vos voyageurs sur vos circuits</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    {
                        label: 'Note Moyenne', value: avgRating.toFixed(1),
                        color: 'text-[#F2A900]', bg: 'bg-amber-50', border: 'border-amber-200',
                        icon: <Star className="h-5 w-5 text-[#F2A900] fill-[#F2A900]" />
                    },
                    {
                        label: 'Total Avis', value: mockReviews.length,
                        color: 'text-[#2D1B08]', bg: 'bg-white', border: 'border-[#EBE3D5]',
                        icon: <MessageSquare className="h-5 w-5 text-[#F2A900]" />
                    },
                    {
                        label: '5 Étoiles', value: dist[5],
                        color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200',
                        icon: <ThumbsUp className="h-5 w-5 text-emerald-600" />
                    },
                    {
                        label: 'Satisfaction', value: `${satisfactionRate}%`,
                        color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200',
                        icon: <TrendingUp className="h-5 w-5 text-blue-600" />
                    },
                ].map((s, i) => (
                    <div key={i} className={`${s.bg} border-2 ${s.border} rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5 min-h-[90px]`}>
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">{s.icon}</div>
                        <p className={`text-xl font-black leading-none ${s.color}`}>{s.value}</p>
                        <p className="text-[10px] text-[#5D4037]/60 font-bold uppercase tracking-wide leading-tight">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Rating Distribution */}
            <div className="bg-white border-2 border-[#EBE3D5] rounded-2xl p-6">
                <h3 className="font-black text-[#2D1B08] mb-4 flex items-center gap-2">
                    <Filter className="h-4 w-4 text-[#F2A900]" /> Répartition des notes
                </h3>
                <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map(rating => {
                        const count = dist[rating];
                        const pct = mockReviews.length > 0 ? (count / mockReviews.length) * 100 : 0;
                        return (
                            <div key={rating} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-20">
                                    <span className="text-sm font-black text-[#2D1B08]">{rating}</span>
                                    <Star className="h-3.5 w-3.5 fill-[#F2A900] text-[#F2A900]" />
                                </div>
                                <div className="flex-1 bg-[#EBE3D5] rounded-full h-2.5">
                                    <div className="h-2.5 rounded-full bg-[#F2A900] transition-all duration-500"
                                        style={{ width: `${pct}%` }} />
                                </div>
                                <span className="text-sm font-bold text-[#5D4037] w-8 text-right">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5D4037]/40" />
                    <Input
                        placeholder="Rechercher par client, circuit ou mot-clé..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-11 py-5 border-2 border-[#EBE3D5] focus:border-[#F2A900] rounded-2xl"
                    />
                </div>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="w-full md:w-48 border-2 border-[#EBE3D5] rounded-2xl py-5">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Tous">Toutes les notes</SelectItem>
                        <SelectItem value="5">⭐⭐⭐⭐⭐ 5 étoiles</SelectItem>
                        <SelectItem value="4">⭐⭐⭐⭐ 4 étoiles</SelectItem>
                        <SelectItem value="3">⭐⭐⭐ 3 étoiles</SelectItem>
                        <SelectItem value="2">⭐⭐ 2 étoiles</SelectItem>
                        <SelectItem value="1">⭐ 1 étoile</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-[#5D4037]/40">
                        <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="font-bold">Aucun avis trouvé</p>
                    </div>
                )}
                {filtered.map((review) => (
                    <div key={review.id}
                        className="bg-white border-2 border-[#EBE3D5] hover:border-[#F2A900] rounded-2xl p-6 transition-all hover:shadow-md">
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-12 h-12 bg-[#F2A900]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <User className="h-6 w-6 text-[#F2A900]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                {/* Top row */}
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div>
                                        <h3 className="font-black text-[#2D1B08] text-base">{review.guestName}</h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <div className="flex">{renderStars(review.rating)}</div>
                                            <span className="text-xs text-[#5D4037]/60 font-bold flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />{review.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Circuit badge */}
                                <div className="mb-3">
                                    <Badge className="bg-[#F2A900]/10 text-[#6B4226] border border-[#F2A900]/20 font-bold text-xs">
                                        <MapPin className="h-3 w-3 mr-1 text-[#F2A900]" />
                                        {review.circuit}
                                    </Badge>
                                </div>

                                {/* Comment */}
                                <p className="text-sm text-[#5D4037]/80 leading-relaxed bg-[#F9F6F2] rounded-xl p-3">
                                    "{review.comment}"
                                </p>

                                {/* Helpful */}
                                <div className="flex items-center gap-1.5 mt-3 text-xs text-[#5D4037]/50 font-bold">
                                    <ThumbsUp className="h-3.5 w-3.5" />
                                    {review.helpful} personnes ont trouvé cet avis utile
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgencyReviewsPage;
