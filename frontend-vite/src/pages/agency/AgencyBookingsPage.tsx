import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Search,
    CheckCircle,
    XCircle,
    ArrowLeft,
    User,
    Phone,
    Mail,
    Calendar,
    Clock,
    Users,
    MapPin,
    TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const mockBookings = [
    {
        id: '1',
        clientName: 'Amadou Ndiaye',
        clientEmail: 'amadou.ndiaye@email.com',
        clientPhone: '+221 77 123 45 67',
        offer: 'Safari Delta du Saloum',
        destination: 'Delta du Saloum',
        departureDate: '2026-03-20',
        returnDate: '2026-03-23',
        duration: '3 jours',
        passengers: 2,
        price: '300,000 FCFA',
        status: 'Confirmée',
        bookingDate: '2026-03-01',
        specialRequests: 'Chambre double, vue sur le fleuve si possible.',
        paidAmount: '150,000 FCFA',
        remainingAmount: '150,000 FCFA',
    },
    {
        id: '2',
        clientName: 'Marie Lecomte',
        clientEmail: 'marie.lecomte@email.com',
        clientPhone: '+33 6 12 34 56 78',
        offer: 'Circuit Casamance Authentique',
        destination: 'Casamance',
        departureDate: '2026-04-05',
        returnDate: '2026-04-12',
        duration: '7 jours',
        passengers: 4,
        price: '1,120,000 FCFA',
        status: 'En attente',
        bookingDate: '2026-03-02',
        specialRequests: 'Régime végétarien pour 2 personnes.',
        paidAmount: '560,000 FCFA',
        remainingAmount: '560,000 FCFA',
    },
    {
        id: '3',
        clientName: 'Fatou Sow',
        clientEmail: 'fatou.sow@gmail.com',
        clientPhone: '+221 78 987 65 43',
        offer: 'Retraite Éco-Lodge Sine Saloum',
        destination: 'Sine Saloum',
        departureDate: '2026-03-10',
        returnDate: '2026-03-15',
        duration: '5 jours',
        passengers: 1,
        price: '220,000 FCFA',
        status: 'Terminée',
        bookingDate: '2026-02-20',
        specialRequests: '',
        paidAmount: '220,000 FCFA',
        remainingAmount: '0 FCFA',
    },
    {
        id: '4',
        clientName: 'Jean-Pierre Durand',
        clientEmail: 'jp.durand@email.fr',
        clientPhone: '+33 7 89 01 23 45',
        offer: 'Grand Tour du Sénégal',
        destination: 'Sénégal complet',
        departureDate: '2026-05-01',
        returnDate: '2026-05-15',
        duration: '14 jours',
        passengers: 2,
        price: '1,040,000 FCFA',
        status: 'En attente',
        bookingDate: '2026-03-05',
        specialRequests: 'Guide francophone impératif.',
        paidAmount: '0 FCFA',
        remainingAmount: '1,040,000 FCFA',
    },
    {
        id: '5',
        clientName: 'Youssou Diallo',
        clientEmail: 'youssou.diallo@gmail.com',
        clientPhone: '+221 76 543 21 09',
        offer: 'Aventure Lac Rose & Désert',
        destination: 'Lac Rose, Thiès',
        departureDate: '2026-03-15',
        returnDate: '2026-03-17',
        duration: '2 jours',
        passengers: 3,
        price: '285,000 FCFA',
        status: 'Annulée',
        bookingDate: '2026-02-28',
        specialRequests: '',
        paidAmount: '0 FCFA',
        remainingAmount: '0 FCFA',
    },
];

const AgencyBookingsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tous');
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [bookings, setBookings] = useState(mockBookings);

    const filtered = bookings.filter(b => {
        const matchesSearch =
            b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.offer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.destination.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'Tous' || b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleConfirm = (id: string) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Confirmée' } : b));
        setIsDialogOpen(false);
    };

    const handleCancel = (id: string) => {
        if (confirm('Annuler cette réservation ?')) {
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Annulée' } : b));
            setIsDialogOpen(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const map: Record<string, string> = {
            'Confirmée': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
            'En attente': 'bg-amber-100 text-amber-700 border border-amber-200',
            'Annulée': 'bg-red-100 text-red-700 border border-red-200',
            'Terminée': 'bg-gray-100 text-gray-600 border border-gray-200',
        };
        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black ${map[status] || 'bg-gray-100 text-gray-600'}`}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status === 'Confirmée' ? '#059669' : status === 'En attente' ? '#D97706' : status === 'Annulée' ? '#DC2626' : '#9CA3AF' }} />
                {status}
            </span>
        );
    };

    const stats = {
        total: bookings.length,
        confirmed: bookings.filter(b => b.status === 'Confirmée').length,
        pending: bookings.filter(b => b.status === 'En attente').length,
        cancelled: bookings.filter(b => b.status === 'Annulée').length,
    };

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
                    <h1 className="text-3xl font-black text-[#2D1B08] tracking-tight">Réservations de Circuits</h1>
                    <p className="text-[#5D4037]/70 mt-1 font-medium">Gérez les réservations de vos voyages organisés</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total', value: stats.total, color: 'text-[#2D1B08]', bg: 'bg-white', border: 'border-[#EBE3D5]', icon: <TrendingUp className="h-5 w-5 text-[#F2A900]" /> },
                    { label: 'Confirmées', value: stats.confirmed, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: <CheckCircle className="h-5 w-5 text-emerald-600" /> },
                    { label: 'En attente', value: stats.pending, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: <Clock className="h-5 w-5 text-amber-500" /> },
                    { label: 'Annulées', value: stats.cancelled, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: <XCircle className="h-5 w-5 text-red-500" /> },
                ].map((s, i) => (
                    <div key={i} className={`${s.bg} border-2 ${s.border} rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5 min-h-[90px]`}>
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">{s.icon}</div>
                        <p className={`text-xl font-black leading-none ${s.color}`}>{s.value}</p>
                        <p className="text-[10px] text-[#5D4037]/60 font-bold uppercase tracking-wide leading-tight">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5D4037]/40" />
                    <Input
                        placeholder="Rechercher par client, circuit ou destination..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-11 py-5 border-2 border-[#EBE3D5] focus:border-[#F2A900] rounded-2xl"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-52 border-2 border-[#EBE3D5] rounded-2xl py-5">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Tous">Tous les statuts</SelectItem>
                        <SelectItem value="Confirmée">Confirmées</SelectItem>
                        <SelectItem value="En attente">En attente</SelectItem>
                        <SelectItem value="Annulée">Annulées</SelectItem>
                        <SelectItem value="Terminée">Terminées</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-[#5D4037]/40">
                        <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="font-bold">Aucune réservation trouvée</p>
                    </div>
                )}
                {filtered.map((booking) => (
                    <div
                        key={booking.id}
                        className="bg-white border-2 border-[#EBE3D5] hover:border-[#F2A900] rounded-2xl p-5 transition-all hover:shadow-md"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* Left info */}
                            <div className="flex items-start gap-4 flex-1">
                                <div className="w-12 h-12 bg-[#F2A900]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <User className="h-6 w-6 text-[#F2A900]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-black text-[#2D1B08] text-base">{booking.clientName}</h3>
                                        {getStatusBadge(booking.status)}
                                    </div>
                                    <p className="text-sm font-bold text-[#F2A900] mt-0.5">{booking.offer}</p>
                                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#5D4037]/70 font-bold">
                                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[#F2A900]" />{booking.destination}</span>
                                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#F2A900]" />{booking.departureDate}</span>
                                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#F2A900]" />{booking.duration}</span>
                                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-[#F2A900]" />{booking.passengers} pers.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price + actions full-width row on mobile */}
                            <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#EBE3D5] md:border-none md:pt-0 md:flex-col md:items-end md:flex-shrink-0">
                                <p className="text-lg font-black text-[#F2A900]">{booking.price}</p>
                                <div className="flex flex-wrap gap-2 justify-end">
                                    {booking.status === 'En attente' && (
                                        <>
                                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl"
                                                onClick={() => handleConfirm(booking.id)}>
                                                <CheckCircle className="h-3.5 w-3.5 mr-1" /> Confirmer
                                            </Button>
                                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 font-black rounded-xl"
                                                onClick={() => handleCancel(booking.id)}>
                                                <XCircle className="h-3.5 w-3.5 mr-1" /> Refuser
                                            </Button>
                                        </>
                                    )}
                                    <Button size="sm" variant="outline" className="border-[#EBE3D5] text-[#6B4226] hover:bg-[#F9F6F2] font-black rounded-xl"
                                        onClick={() => { setSelectedBooking(booking); setIsDialogOpen(true); }}>
                                        Détails
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black text-[#2D1B08]">Détails de la réservation</DialogTitle>
                        <DialogDescription>Informations complètes sur la réservation</DialogDescription>
                    </DialogHeader>
                    {selectedBooking && (
                        <div className="space-y-5 py-3">
                            {/* Status & offer */}
                            <div className="bg-[#F9F6F2] rounded-2xl p-4">
                                <p className="text-xs font-bold text-[#5D4037]/60 uppercase tracking-wider mb-1">Circuit</p>
                                <p className="text-lg font-black text-[#2D1B08]">{selectedBooking.offer}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    {getStatusBadge(selectedBooking.status)}
                                    <span className="text-xs text-[#5D4037]/60 font-bold">Réservé le {selectedBooking.bookingDate}</span>
                                </div>
                            </div>

                            {/* Client */}
                            <div>
                                <p className="text-sm font-black text-[#2D1B08] mb-3">Client</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        { icon: <User className="h-4 w-4" />, label: 'Nom', value: selectedBooking.clientName },
                                        { icon: <Mail className="h-4 w-4" />, label: 'Email', value: selectedBooking.clientEmail },
                                        { icon: <Phone className="h-4 w-4" />, label: 'Téléphone', value: selectedBooking.clientPhone },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-[#F9F6F2] rounded-xl p-3">
                                            <Label className="text-[10px] text-[#5D4037]/60 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                                                {item.icon}{item.label}
                                            </Label>
                                            <p className="text-sm font-bold text-[#2D1B08] break-all">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Trip details */}
                            <div>
                                <p className="text-sm font-black text-[#2D1B08] mb-3">Détails du voyage</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { icon: <MapPin className="h-4 w-4" />, label: 'Destination', value: selectedBooking.destination },
                                        { icon: <Calendar className="h-4 w-4" />, label: 'Départ', value: selectedBooking.departureDate },
                                        { icon: <Calendar className="h-4 w-4" />, label: 'Retour', value: selectedBooking.returnDate },
                                        { icon: <Users className="h-4 w-4" />, label: 'Voyageurs', value: `${selectedBooking.passengers} pers.` },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-[#F9F6F2] rounded-xl p-3">
                                            <Label className="text-[10px] text-[#5D4037]/60 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                                                {item.icon}{item.label}
                                            </Label>
                                            <p className="text-sm font-bold text-[#2D1B08]">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-[#F2A900]/5 border border-[#F2A900]/20 rounded-2xl p-4">
                                <p className="text-sm font-black text-[#2D1B08] mb-3">Paiement</p>
                                <div className="grid grid-cols-3 gap-3 text-center">
                                    <div><p className="text-xs text-[#5D4037]/60 font-bold">Total</p><p className="text-base font-black text-[#F2A900]">{selectedBooking.price}</p></div>
                                    <div><p className="text-xs text-[#5D4037]/60 font-bold">Versé</p><p className="text-base font-black text-emerald-600">{selectedBooking.paidAmount}</p></div>
                                    <div><p className="text-xs text-[#5D4037]/60 font-bold">Restant</p><p className="text-base font-black text-amber-600">{selectedBooking.remainingAmount}</p></div>
                                </div>
                            </div>

                            {/* Special requests */}
                            {selectedBooking.specialRequests && (
                                <div>
                                    <p className="text-sm font-black text-[#2D1B08] mb-2">Demandes spéciales</p>
                                    <p className="text-sm text-[#5D4037]/80 bg-[#F9F6F2] rounded-xl p-3 leading-relaxed">{selectedBooking.specialRequests}</p>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[#EBE3D5] rounded-xl font-black">Fermer</Button>
                        {selectedBooking?.status === 'En attente' && (
                            <>
                                <Button onClick={() => handleCancel(selectedBooking.id)} variant="outline"
                                    className="text-red-600 border-red-200 hover:bg-red-50 rounded-xl font-black">
                                    <XCircle className="h-4 w-4 mr-2" /> Refuser
                                </Button>
                                <Button onClick={() => handleConfirm(selectedBooking.id)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black">
                                    <CheckCircle className="h-4 w-4 mr-2" /> Confirmer
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AgencyBookingsPage;
