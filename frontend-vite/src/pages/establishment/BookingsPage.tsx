import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  Search,
  CheckCircle,
  XCircle,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Filter,
  Clock,
  MoreVertical,
  Printer,
  MessageCircle,
  Bed,
  MapPin,
  CreditCard,
  ChevronRight,
  Plus,
  LayoutGrid,
  List as ListIcon,
  Download,
  AlertCircle,
  Eye,
  Building
} from 'lucide-react';
import { Label } from '@/components/ui/label';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import StatCard from '@/components/dashboard/StatCard';

const BookingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const [bookings, setBookings] = useState([
    {
      id: '101',
      guestName: 'Jean Dupont',
      guestEmail: 'jean.dupont@email.com',
      guestPhone: '+221 77 123 45 67',
      checkIn: '2024-04-15',
      checkInTime: '14:00',
      checkOut: '2024-04-18',
      checkOutTime: '12:00',
      type: 'Double',
      roomNumber: '101',
      status: 'Confirmée',
      paymentStatus: 'Payé',
      paymentMode: 'Wave',
      price: '75,000 FCFA',
      guests: 2,
      nights: 3,
      bookingDate: '2024-04-10',
      source: 'En ligne',
      cancellationPolicy: 'Gratuit jusqu\'à 24h avant',
      specialRequests: 'Lit supplémentaire demandé, Arrivée tardive (22h)'
    },
    {
      id: '102',
      guestName: 'Marie Sow',
      guestEmail: 'marie.sow@email.com',
      guestPhone: '+221 70 987 65 43',
      checkIn: '2024-04-16',
      checkInTime: '15:30',
      checkOut: '2024-04-17',
      checkOutTime: '12:00',
      type: 'Suite',
      roomNumber: '205',
      status: 'En attente',
      paymentStatus: 'Acompte',
      paymentMode: 'Orange Money',
      price: '45,000 FCFA',
      guests: 1,
      nights: 1,
      bookingDate: '2024-04-12',
      source: 'Direct',
      cancellationPolicy: 'Non remboursable',
      specialRequests: null
    }
  ]);

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'Confirmée').length,
    pending: bookings.filter(b => b.status === 'En attente').length,
    cancelled: bookings.filter(b => b.status === 'Annulée').length
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.includes(searchTerm) ||
      booking.roomNumber.includes(searchTerm);
    const matchesStatus = statusFilter === 'Tous' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleConfirm = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Confirmée' } : b));
    toast.success('Réservation confirmée avec succès');
  };

  const handleCancel = (id: string) => {
    if (confirm('Voulez-vous vraiment annuler cette réservation ?')) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Annulée' } : b));
      toast.error('Réservation annulée');
    }
  };

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmée':
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-none rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest">Confirmée</Badge>;
      case 'En attente':
        return <Badge className="bg-amber-500/10 text-amber-600 border-none rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest">En attente</Badge>;
      case 'Annulée':
        return <Badge className="bg-red-500/10 text-red-600 border-none rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest">Annulée</Badge>;
      default:
        return <Badge className="rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'Payé':
        return <Badge className="bg-emerald-500 text-white border-none rounded-md px-1.5 py-0.5 text-[8px] font-black uppercase">Payé</Badge>;
      case 'Acompte':
        return <Badge className="bg-blue-500 text-white border-none rounded-md px-1.5 py-0.5 text-[8px] font-black uppercase">Acompte</Badge>;
      case 'Sur place':
        return <Badge className="bg-gray-400 text-white border-none rounded-md px-1.5 py-0.5 text-[8px] font-black uppercase">Sur place</Badge>;
      case 'Remboursé':
        return <Badge className="bg-purple-500 text-white border-none rounded-md px-1.5 py-0.5 text-[8px] font-black uppercase">Remboursé</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* 🏨 Premium Header */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-8 md:p-12 text-white shadow-2xl mb-12">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A900]/5 rounded-full blur-[100px]" />
          
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 rounded-full h-8 px-3">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                  </Button>
                </Link>
                <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[9px] px-3 border-none">
                  ESPACE HÉBERGEMENT
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                PILOTAGE DES <br /> <span className="text-[#F2A900]">RÉSERVATIONS .</span>
              </h1>
              <p className="text-white/60 font-medium italic text-xs md:text-base max-w-xl">
                Suivez vos arrivées, gérez vos disponibilités et offrez un accueil d'exception à vos hôtes.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4 xl:mt-0">
               <Button className="flex-1 sm:flex-initial bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold h-12 md:h-14 px-6 md:px-8 rounded-2xl shadow-xl transition-all hover:scale-105 backdrop-blur-md">
                <Download className="mr-3 h-5 w-5" /> EXPORTER
              </Button>
              <Button className="flex-1 sm:flex-initial bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-12 md:h-14 px-6 md:px-8 rounded-2xl shadow-xl shadow-[#F2A900]/20 transition-all hover:scale-105">
                <Plus className="mr-3 h-5 w-5" /> NOUVELLE RÉSERV.
              </Button>
            </div>
          </div>
        </div>

        {/* 📊 High-Level Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          <StatCard icon={Calendar} value={stats.total} label="Total Dossiers" trend={{ value: 5, isUp: true }} />
          <StatCard icon={CheckCircle} value={stats.confirmed} label="Confirmées" trend={{ value: 12, isUp: true }} />
          <StatCard icon={Clock} value={stats.pending} label="En Attente" trend={{ value: 2, isUp: false }} />
          <StatCard icon={XCircle} value={stats.cancelled} label="Annulations" trend={{ value: 0, isUp: true }} />
        </div>

        {/* 🔍 Filters & View Mode */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch lg:items-center">
          <Card className="flex-1 rounded-[2rem] border-none bg-white shadow-sm overflow-hidden p-2 md:p-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="Rechercher par client, chambre, ID..." 
                  className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-14 rounded-2xl border-gray-100 font-bold uppercase text-[10px] tracking-widest w-full md:w-48">
                  <Filter className="mr-2 h-4 w-4 text-[#F2A900]" />
                  <SelectValue placeholder="STATUT" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-gray-100 shadow-2xl">
                  <SelectItem value="Tous" className="font-bold uppercase text-[10px]">Tous les statuts</SelectItem>
                  <SelectItem value="Confirmée" className="font-bold uppercase text-[10px]">Confirmées</SelectItem>
                  <SelectItem value="En attente" className="font-bold uppercase text-[10px]">En attente</SelectItem>
                  <SelectItem value="Annulée" className="font-bold uppercase text-[10px]">Annulées</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          
          <div className="bg-white p-2 rounded-2xl shadow-sm flex gap-1 self-end lg:self-auto h-fit border border-gray-100">
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="icon" 
              onClick={() => setViewMode('list')}
              className={cn("rounded-xl h-12 w-12", viewMode === 'list' ? "bg-[#2D1B08] text-white" : "text-gray-400")}
            >
              <ListIcon size={20} />
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="icon" 
              onClick={() => setViewMode('grid')}
              className={cn("rounded-xl h-12 w-12", viewMode === 'grid' ? "bg-[#2D1B08] text-white" : "text-gray-400")}
            >
              <LayoutGrid size={20} />
            </Button>
          </div>
        </div>

        {/* 📋 Bookings Grid/List */}
        <div className={cn(
          "grid gap-6",
          viewMode === 'list' ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="group rounded-[1.5rem] border-none bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full text-[#2D1B08]">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#F2A900]/10 flex items-center justify-center text-[#F2A900] group-hover:bg-[#2D1B08] group-hover:text-white transition-all duration-300">
                        <User size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-tight leading-tight group-hover:text-[#F2A900] transition-colors">{booking.guestName}</h3>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                          #{booking.id}0{booking.id} • {booking.source}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {booking.specialRequests && (
                        <div className="h-6 w-6 rounded-full bg-amber-50 flex items-center justify-center text-amber-600" title="Demandes spéciales">
                          <AlertCircle size={12} />
                        </div>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400 hover:text-[#2D1B08]">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-gray-100 shadow-2xl p-1 w-40">
                          <DropdownMenuItem className="rounded-lg font-bold uppercase text-[9px] tracking-widest py-2 cursor-pointer" onClick={() => handleViewDetails(booking)}>
                            <Eye className="mr-2 h-3.5 w-3.5 text-[#F2A900]" /> Détails
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg font-bold uppercase text-[9px] tracking-widest py-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleCancel(booking.id)}>
                            <XCircle className="mr-2 h-3.5 w-3.5" /> Annuler
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gray-50/50 border border-gray-50 flex flex-col items-center text-center">
                      <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">Check-In</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={10} className="text-[#F2A900]" />
                        <span className="text-xs font-black">{booking.checkIn}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50/50 border border-gray-50 flex flex-col items-center text-center">
                      <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">Check-Out</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={10} className="text-gray-400" />
                        <span className="text-xs font-black">{booking.checkOut === '-' ? 'N/A' : booking.checkOut}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bed size={14} className="text-[#F2A900]" />
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-tight">{booking.type}</p>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Chambre {booking.roomNumber}</p>
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Prix Total</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg font-black text-[#2D1B08]">{booking.price}</span>
                        {getPaymentBadge(booking.paymentStatus)}
                      </div>
                    </div>
                    
                    <div className="flex gap-1.5">
                      {booking.status === 'En attente' ? (
                        <Button 
                          onClick={() => handleConfirm(booking.id)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[9px] uppercase h-8 px-3 rounded-lg shadow-lg shadow-emerald-500/10"
                        >
                          CONFIRMER
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          onClick={() => handleViewDetails(booking)}
                          className="text-[#F2A900] hover:text-[#2D1B08] hover:bg-[#F2A900]/10 font-black text-[9px] uppercase h-8 px-3 rounded-lg"
                        >
                          DÉTAILS <ChevronRight size={12} className="ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] shadow-sm border border-dashed border-gray-200">
               <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-gray-300" />
               </div>
               <h3 className="text-xl font-black uppercase tracking-tighter text-[#2D1B08]">Aucune réservation trouvée</h3>
               <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Essayez d'ajuster vos filtres de recherche</p>
            </div>
          )}
        </div>
      </div>

      {/* 🧾 Booking Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-none p-0">
          <DialogHeader className="bg-[#2D1B08] p-6 md:p-8 text-white relative">
             <div className="absolute top-0 right-0 p-6 md:p-8 text-white/5 pointer-events-none">
                <Building size={100} strokeWidth={4} />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                   <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[8px] border-none">
                     DÉTAILS DU DOSSIER
                   </Badge>
                   {selectedBooking && getStatusBadge(selectedBooking.status)}
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight">
                  #{selectedBooking?.id}0{selectedBooking?.id} — {selectedBooking?.guestName}
                </DialogTitle>
                <DialogDescription className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1 text-xs">
                  Enregistré le {selectedBooking?.bookingDate}
                </DialogDescription>
             </div>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="p-6 md:p-8 bg-white space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Informations Client</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#2D1B08]">
                        <Mail size={14} />
                      </div>
                      <span className="text-xs font-bold">{selectedBooking.guestEmail}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#2D1B08]">
                        <Phone size={14} />
                      </div>
                      <span className="text-xs font-bold">{selectedBooking.guestPhone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Détails Séjour</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-xl bg-gray-50 text-center">
                      <p className="text-[7px] font-black text-gray-400 uppercase mb-0.5">Nuits</p>
                      <p className="text-base font-black">{selectedBooking.nights}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-gray-50 text-center">
                      <p className="text-[7px] font-black text-gray-400 uppercase mb-0.5">Personnes</p>
                      <p className="text-base font-black">{selectedBooking.guests}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#F2A900]">
                      <Bed size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-tight">{selectedBooking.type}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Unité {selectedBooking.roomNumber}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#2D1B08]/5 border border-[#2D1B08]/10 flex flex-col justify-center">
                   <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#2D1B08]">
                      <span>Check-in: {selectedBooking.checkInTime}</span>
                      <span>Check-out: {selectedBooking.checkOutTime || '12:00'}</span>
                   </div>
                   <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F2A900] w-1/2" />
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                 <div className="space-y-1">
                    <Label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Mode Réservation</Label>
                    <Badge className="w-full justify-center bg-gray-100 text-[#2D1B08] border-none font-bold text-[9px] h-8">{selectedBooking.source}</Badge>
                 </div>
                 <div className="space-y-1">
                    <Label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Moyen Paiement</Label>
                    <Badge className="w-full justify-center bg-emerald-50 text-emerald-700 border-none font-bold text-[9px] h-8">{selectedBooking.paymentMode || 'Cash'}</Badge>
                 </div>
                 <div className="hidden sm:block space-y-1">
                    <Label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Politique</Label>
                    <Badge variant="outline" className="w-full justify-center border-gray-200 text-gray-500 font-bold text-[8px] h-8 truncate">{selectedBooking.cancellationPolicy}</Badge>
                 </div>
              </div>

              {selectedBooking.specialRequests && (
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Demandes Spéciales</Label>
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 italic text-xs text-[#2D1B08]/80 leading-relaxed">
                    "{selectedBooking.specialRequests}"
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-gray-50">
                <div className="text-center sm:text-left">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Total Transaction</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-[#2D1B08]">{selectedBooking.price}</span>
                    {getPaymentBadge(selectedBooking.paymentStatus)}
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                   <Button variant="outline" className="flex-1 sm:flex-none rounded-xl h-10 border-gray-100 font-bold px-5 text-xs" onClick={() => setIsDialogOpen(false)}>
                    FERMER
                  </Button>
                  {selectedBooking.status === 'En attente' && (
                    <Button 
                      className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-600 text-white font-black h-10 px-6 rounded-xl shadow-lg shadow-emerald-500/10 text-xs"
                      onClick={() => {
                        handleConfirm(selectedBooking.id);
                        setIsDialogOpen(false);
                      }}
                    >
                      CONFIRMER
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsPage;
