import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { QRCode } from 'react-qr-code';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Search,
  Filter,
  Eye,
  MessageCircle,
  Download,
  BarChart3,
  TrendingUp,
  DollarSign,
  User,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  MessageCircle as MessageCircleIcon,
  Download as DownloadIcon,
  BarChart3 as BarChart3Icon,
  TrendingUp as TrendingUpIcon,
  DollarSign as DollarSignIcon,
  User as UserIcon,
  QrCode,
  Play,
  Square
} from 'lucide-react';
import { toast } from 'sonner';

// Données mock pour les réservations
const mockBookings = [
  {
    id: '1',
    tourist: {
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      phone: '+33 6 12 34 56 78',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      nationality: 'Française'
    },
    tour: {
      name: 'Visite Historique de Saint-Louis',
      date: '2024-02-15',
      time: '09:00',
      duration: '4 heures',
      location: 'Saint-Louis',
      price: '25,000 FCFA',
      maxGroupSize: 15,
      currentGroupSize: 8
    },
    status: 'confirmed',
    bookingDate: '2024-01-20',
    specialRequests: 'Visite en français, accessible aux personnes à mobilité réduite',
    paymentStatus: 'paid',
    totalAmount: '25,000 FCFA',
    notes: 'Touriste très intéressée par l\'histoire coloniale'
  },
  {
    id: '2',
    tourist: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 555 123 4567',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      nationality: 'Américaine'
    },
    tour: {
      name: 'Découverte de la Culture Wolof',
      date: '2024-02-18',
      time: '14:00',
      duration: '3 heures',
      location: 'Dakar',
      price: '20,000 FCFA',
      maxGroupSize: 12,
      currentGroupSize: 5
    },
    status: 'pending',
    bookingDate: '2024-01-22',
    specialRequests: 'Traduction en anglais',
    paymentStatus: 'pending',
    totalAmount: '20,000 FCFA',
    notes: 'Première visite au Sénégal'
  },
  {
    id: '3',
    tourist: {
      name: 'Fatou Sarr',
      email: 'fatou.sarr@email.com',
      phone: '+221 77 123 45 67',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      nationality: 'Sénégalaise'
    },
    tour: {
      name: 'Visite des Marchés Traditionnels',
      date: '2024-02-20',
      time: '08:00',
      duration: '5 heures',
      location: 'Thiès',
      price: '30,000 FCFA',
      maxGroupSize: 10,
      currentGroupSize: 10
    },
    status: 'completed',
    bookingDate: '2024-01-15',
    specialRequests: 'Visite des marchés locaux',
    paymentStatus: 'paid',
    totalAmount: '30,000 FCFA',
    notes: 'Très satisfaite de la visite précédente',
    rating: 5,
    review: 'Excellent guide, très professionnel et passionné !'
  },
  {
    id: '4',
    tourist: {
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+221 78 987 65 43',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      nationality: 'Mauritanienne'
    },
    tour: {
      name: 'Visite Historique de Saint-Louis',
      date: '2024-02-25',
      time: '10:00',
      duration: '4 heures',
      location: 'Saint-Louis',
      price: '25,000 FCFA',
      maxGroupSize: 15,
      currentGroupSize: 3
    },
    status: 'cancelled',
    bookingDate: '2024-01-18',
    specialRequests: 'Visite en arabe',
    paymentStatus: 'refunded',
    totalAmount: '25,000 FCFA',
    notes: 'Annulation pour raisons personnelles',
    cancellationReason: 'Problème de santé'
  },
  {
    id: '5',
    tourist: {
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      phone: '+33 6 98 76 54 32',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      nationality: 'Française'
    },
    tour: {
      name: 'Découverte de la Culture Wolof',
      date: '2024-03-01',
      time: '15:00',
      duration: '3 heures',
      location: 'Dakar',
      price: '20,000 FCFA',
      maxGroupSize: 12,
      currentGroupSize: 7
    },
    status: 'confirmed',
    bookingDate: '2024-01-25',
    specialRequests: 'Visite en français',
    paymentStatus: 'paid',
    totalAmount: '20,000 FCFA',
    notes: 'Groupe d\'amis en voyage'
  }
];

const GuideBookingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [scannedTicket, setScannedTicket] = useState<any>(null);

  // Filtrage des réservations
  const filteredBookings = useMemo(() => {
    let filtered = bookings;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.tour.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par statut
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === selectedStatus);
    }

    // Filtre par date
    if (selectedDate !== 'all') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.tour.date);
        switch (selectedDate) {
          case 'today':
            return bookingDate.toDateString() === today.toDateString();
          case 'tomorrow':
            return bookingDate.toDateString() === tomorrow.toDateString();
          case 'thisWeek':
            return bookingDate >= today && bookingDate <= nextWeek;
          case 'nextWeek':
            const nextWeekEnd = new Date(nextWeek);
            nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);
            return bookingDate > nextWeek && bookingDate <= nextWeekEnd;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [bookings, searchTerm, selectedStatus, selectedDate]);

  // Actions sur les réservations
  const handleConfirmBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'confirmed' }
        : booking
    ));
    toast.success('Réservation confirmée avec succès');
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
    toast.success('Réservation annulée');
  };

  const handleCompleteBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'completed' }
        : booking
    ));
    toast.success('Réservation marquée comme terminée');
  };

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDetailsModalOpen(true);
  };

  const handleContactTourist = (booking: any) => {
    // Simulation d'envoi de message
    toast.info(`Message envoyé à ${booking.tourist.name}`);
  };

  const handleMarkAsPresent = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, present: true, presentAt: new Date().toISOString() }
        : booking
    ));
    toast.success('Client marqué comme présent');
  };

  const handleStartVisit = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, visitStarted: true, visitStartedAt: new Date().toISOString() }
        : booking
    ));
    toast.success('Visite démarrée');
  };

  const handleEndVisit = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, visitEnded: true, visitEndedAt: new Date().toISOString() }
        : booking
    ));
    toast.success('Visite terminée');
  };

  const handleScanQRCode = () => {
    setIsQrScannerOpen(true);
  };

  const handleQRCodeScanned = (qrData: string) => {
    try {
      // Essayer de parser comme JSON (QR code structuré)
      let ticketData;
      try {
        ticketData = JSON.parse(qrData);
      } catch {
        // Si ce n'est pas du JSON, chercher par ID direct
        const booking = bookings.find(b => b.id === qrData || b.id.includes(qrData));
        if (booking) {
          setScannedTicket(booking);
          setIsQrScannerOpen(false);
          setSelectedBooking(booking);
          setIsDetailsModalOpen(true);
          toast.success(`Réservation trouvée pour ${booking.tourist.name}`);
          return;
        } else {
          toast.error('Aucune réservation trouvée pour ce code');
          return;
        }
      }

      // Si c'est du JSON, chercher par les données du ticket
      const booking = bookings.find(b => 
        b.id === ticketData.id || 
        b.tourist.name.toLowerCase() === ticketData.customer?.toLowerCase() ||
        (ticketData.id && b.id.includes(ticketData.id))
      );
      
      if (booking) {
        setScannedTicket(booking);
        setIsQrScannerOpen(false);
        setSelectedBooking(booking);
        setIsDetailsModalOpen(true);
        toast.success(`Réservation trouvée pour ${booking.tourist.name}`);
      } else {
        toast.error('Aucune réservation trouvée pour ce QR code');
      }
    } catch (error) {
      toast.error('QR code invalide');
    }
  };

  // Statistiques
  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    const totalRevenue = bookings
      .filter(b => b.status === 'completed' || b.status === 'confirmed')
      .reduce((sum, b) => sum + parseInt(b.totalAmount.replace(/[^\d]/g, '')), 0);
    const averageRating = bookings
      .filter(b => b.rating)
      .reduce((sum, b) => sum + b.rating, 0) / bookings.filter(b => b.rating).length || 0;

    return {
      total,
      confirmed,
      pending,
      completed,
      cancelled,
      totalRevenue,
      averageRating
    };
  }, [bookings]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: 'Confirmée', variant: 'default' as const, icon: CheckCircleIcon },
      pending: { label: 'En attente', variant: 'secondary' as const, icon: ClockIcon },
      completed: { label: 'Terminée', variant: 'default' as const, icon: CheckCircleIcon },
      cancelled: { label: 'Annulée', variant: 'destructive' as const, icon: XCircleIcon }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: 'Payé', variant: 'default' as const },
      pending: { label: 'En attente', variant: 'secondary' as const },
      refunded: { label: 'Remboursé', variant: 'destructive' as const }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="container mx-auto p-6">
      {/* En-tête */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mes Réservations</h1>
          <p className="text-gray-600">
            Gérez vos réservations et suivez vos revenus
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <Button 
            onClick={handleScanQRCode}
            className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700"
          >
            <QrCode className="h-4 w-4" />
            <span>Scanner QR</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <DownloadIcon className="h-4 w-4" />
            <span>Exporter</span>
          </Button>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par nom, tour ou localisation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="confirmed">Confirmée</SelectItem>
              <SelectItem value="completed">Terminée</SelectItem>
              <SelectItem value="cancelled">Annulée</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les dates</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="tomorrow">Demain</SelectItem>
              <SelectItem value="thisWeek">Cette semaine</SelectItem>
              <SelectItem value="nextWeek">Semaine prochaine</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bookings">Réservations ({filteredBookings.length})</TabsTrigger>
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        {/* Onglet Réservations */}
        <TabsContent value="bookings" className="space-y-6">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation trouvée</h3>
                <p className="text-gray-600">Aucune réservation ne correspond à vos critères de recherche.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      {/* Informations du touriste */}
                      <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                        <img
                          src={booking.tourist.avatar}
                          alt={booking.tourist.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{booking.tourist.name}</h3>
                            <Badge variant="outline">{booking.tourist.nationality}</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{booking.tourist.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{booking.tourist.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Informations de la visite */}
                      <div className="flex-1 lg:mx-6">
                        <h4 className="text-lg font-medium mb-2">{booking.tour.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(booking.tour.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{booking.tour.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.tour.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{booking.tour.currentGroupSize}/{booking.tour.maxGroupSize} personnes</span>
                          </div>
                        </div>
                        {booking.specialRequests && (
                          <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Demandes spéciales:</strong> {booking.specialRequests}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Statut et actions */}
                      <div className="flex flex-col items-end space-y-3">
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(booking.status)}
                          {getPaymentStatusBadge(booking.paymentStatus)}
                          {booking.present && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Présent
                            </Badge>
                          )}
                          {booking.visitStarted && (
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                              <Play className="h-3 w-3 mr-1" />
                              Visite en cours
                            </Badge>
                          )}
                          {booking.visitEnded && (
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                              <Square className="h-3 w-3 mr-1" />
                              Visite terminée
                            </Badge>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-semibold text-green-600">{booking.totalAmount}</p>
                          <p className="text-sm text-gray-500">
                            Réservé le {new Date(booking.bookingDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(booking)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleContactTourist(booking)}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Contacter
                          </Button>

                          {booking.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleConfirmBooking(booking.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirmer
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Annuler
                              </Button>
                            </>
                          )}

                          {booking.status === 'confirmed' && (
                            <>
                              {!booking.present && (
                                <Button
                                  size="sm"
                                  onClick={() => handleMarkAsPresent(booking.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Présent
                                </Button>
                              )}
                              {booking.present && !booking.visitStarted && (
                                <Button
                                  size="sm"
                                  onClick={() => handleStartVisit(booking.id)}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <Play className="h-4 w-4 mr-1" />
                                  Démarrer
                                </Button>
                              )}
                              {booking.visitStarted && !booking.visitEnded && (
                                <Button
                                  size="sm"
                                  onClick={() => handleEndVisit(booking.id)}
                                  className="bg-purple-600 hover:bg-purple-700"
                                >
                                  <Square className="h-4 w-4 mr-1" />
                                  Terminer
                                </Button>
                              )}
                              {!booking.visitStarted && (
                                <Button
                                  size="sm"
                                  onClick={() => handleCompleteBooking(booking.id)}
                                  className="bg-gray-600 hover:bg-gray-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Finaliser
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Onglet Calendrier */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Calendrier des Réservations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Calendrier en développement</h3>
                <p className="text-gray-600">Cette fonctionnalité sera bientôt disponible !</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Statistiques */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Réservations</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Confirmées</p>
                    <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">En Attente</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Terminées</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Revenus</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {stats.totalRevenue.toLocaleString()} FCFA
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Revenus totaux</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Note Moyenne</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-600">
                    {stats.averageRating.toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Basée sur les avis</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de détails de réservation */}
      {isDetailsModalOpen && selectedBooking && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setIsDetailsModalOpen(false);
            setSelectedBooking(null);
          }}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Détails de la Réservation</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedBooking(null);
                }}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Informations du touriste */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Informations du Touriste</h3>
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedBooking.tourist.avatar}
                    alt={selectedBooking.tourist.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-medium">{selectedBooking.tourist.name}</h4>
                      <Badge variant="outline">{selectedBooking.tourist.nationality}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{selectedBooking.tourist.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{selectedBooking.tourist.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations de la visite */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Informations de la Visite</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nom de la visite</p>
                    <p className="font-medium">{selectedBooking.tour.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{new Date(selectedBooking.tour.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Heure</p>
                    <p className="font-medium">{selectedBooking.tour.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Durée</p>
                    <p className="font-medium">{selectedBooking.tour.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Localisation</p>
                    <p className="font-medium">{selectedBooking.tour.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Groupe</p>
                    <p className="font-medium">{selectedBooking.tour.currentGroupSize}/{selectedBooking.tour.maxGroupSize} personnes</p>
                  </div>
                </div>
              </div>


              {/* Statut et paiement */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Statut et Paiement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Statut de la réservation</p>
                    <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Statut du paiement</p>
                    <div className="mt-1">{getPaymentStatusBadge(selectedBooking.paymentStatus)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Montant total</p>
                    <p className="font-medium text-green-600">{selectedBooking.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date de réservation</p>
                    <p className="font-medium">{new Date(selectedBooking.bookingDate).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                
                {/* Suivi de visite */}
                {(selectedBooking.present || selectedBooking.visitStarted || selectedBooking.visitEnded) && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Suivi de visite</h4>
                    <div className="space-y-1 text-sm">
                      {selectedBooking.present && selectedBooking.presentAt && (
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="h-4 w-4" />
                          <span>Présent à: {new Date(selectedBooking.presentAt).toLocaleTimeString('fr-FR')}</span>
                        </div>
                      )}
                      {selectedBooking.visitStarted && selectedBooking.visitStartedAt && (
                        <div className="flex items-center gap-2 text-blue-700">
                          <Play className="h-4 w-4" />
                          <span>Visite démarrée à: {new Date(selectedBooking.visitStartedAt).toLocaleTimeString('fr-FR')}</span>
                        </div>
                      )}
                      {selectedBooking.visitEnded && selectedBooking.visitEndedAt && (
                        <div className="flex items-center gap-2 text-purple-700">
                          <Square className="h-4 w-4" />
                          <span>Visite terminée à: {new Date(selectedBooking.visitEndedAt).toLocaleTimeString('fr-FR')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Demandes spéciales */}
              {selectedBooking.specialRequests && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Demandes Spéciales</h3>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800">{selectedBooking.specialRequests}</p>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedBooking.notes && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Notes</h3>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{selectedBooking.notes}</p>
                  </div>
                </div>
              )}

              {/* Avis (si terminée) */}
              {selectedBooking.status === 'completed' && selectedBooking.rating && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Avis du Touriste</h3>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < selectedBooking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{selectedBooking.rating}/5</span>
                    </div>
                    {selectedBooking.review && (
                      <p className="text-gray-700">{selectedBooking.review}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Raison d'annulation */}
              {selectedBooking.status === 'cancelled' && selectedBooking.cancellationReason && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Raison d'Annulation</h3>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-800">{selectedBooking.cancellationReason}</p>
                  </div>
                </div>
              )}

              {/* QR Code du ticket */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-orange-600" />
                  QR Code du Ticket
                </h3>
                <Card className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-white p-4 rounded-xl border-4 border-orange-300 shadow-lg">
                        <QRCode
                          value={JSON.stringify({
                            id: selectedBooking.id,
                            type: 'guide',
                            date: selectedBooking.tour.date,
                            customer: selectedBooking.tourist.name,
                            location: selectedBooking.tour.location
                          })}
                          size={150}
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        />
                      </div>
                      <p className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        ID: {selectedBooking.id}
                      </p>
                      <p className="text-sm text-gray-600 text-center">
                        Le client peut présenter ce QR code pour vérification
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 mt-6">
              {selectedBooking.status === 'confirmed' && (
                <>
                  {!selectedBooking.present && (
                    <Button 
                      onClick={() => {
                        handleMarkAsPresent(selectedBooking.id);
                        setIsDetailsModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Marquer présent
                    </Button>
                  )}
                  {selectedBooking.present && !selectedBooking.visitStarted && (
                    <Button 
                      onClick={() => {
                        handleStartVisit(selectedBooking.id);
                        setIsDetailsModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Démarrer la visite
                    </Button>
                  )}
                  {selectedBooking.visitStarted && !selectedBooking.visitEnded && (
                    <Button 
                      onClick={() => {
                        handleEndVisit(selectedBooking.id);
                        setIsDetailsModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Square className="h-4 w-4 mr-2" />
                      Terminer la visite
                    </Button>
                  )}
                </>
              )}
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedBooking(null);
                }}
              >
                Fermer
              </Button>
              <Button 
                onClick={() => {
                  handleContactTourist(selectedBooking);
                  setIsDetailsModalOpen(false);
                  setSelectedBooking(null);
                }}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contacter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Scanner QR Code */}
      <Dialog open={isQrScannerOpen} onOpenChange={setIsQrScannerOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-orange-600" />
              Scanner le QR Code du ticket
            </DialogTitle>
            <DialogDescription>
              Scannez le QR code du ticket du client pour accéder rapidement aux détails de la réservation
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                Fonctionnalité de scan caméra à venir. Pour l'instant, saisissez le code du ticket manuellement.
              </p>
              <Input
                placeholder="Collez le code QR ou saisissez l'ID du ticket"
                onChange={(e) => {
                  if (e.target.value.length > 10) {
                    handleQRCodeScanned(e.target.value);
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsQrScannerOpen(false)}>
                Fermer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuideBookingsPage;
