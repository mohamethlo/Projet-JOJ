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
  Mail
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

const BookingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [bookings, setBookings] = useState([
    {
      id: '1',
      guestName: 'Jean Dupont',
      guestEmail: 'jean.dupont@email.com',
      guestPhone: '+221 77 123 45 67',
      type: 'Chambre Double',
      roomNumber: '101',
      checkIn: '2024-04-15',
      checkOut: '2024-04-18',
      nights: 3,
      guests: 2,
      price: '75,000 FCFA',
      status: 'Confirmée',
      bookingDate: '2024-04-10',
      specialRequests: 'Lit supplémentaire demandé'
    },
    {
      id: '2',
      guestName: 'Maria Garcia',
      guestEmail: 'maria.garcia@email.com',
      guestPhone: '+221 78 234 56 78',
      type: 'Suite Deluxe',
      roomNumber: '102',
      checkIn: '2024-04-20',
      checkOut: '2024-04-23',
      nights: 3,
      guests: 4,
      price: '150,000 FCFA',
      status: 'En attente',
      bookingDate: '2024-04-12',
      specialRequests: 'Petit-déjeuner inclus'
    },
    {
      id: '3',
      guestName: 'Ahmed Diallo',
      guestEmail: 'ahmed.diallo@email.com',
      guestPhone: '+221 76 345 67 89',
      type: 'Réservation Table',
      roomNumber: '-',
      checkIn: '2024-04-17',
      checkOut: '-',
      nights: 0,
      guests: 4,
      price: '25,000 FCFA',
      status: 'Confirmée',
      bookingDate: '2024-04-11',
      specialRequests: 'Table près de la fenêtre'
    },
    {
      id: '4',
      guestName: 'Sophie Martin',
      guestEmail: 'sophie.martin@email.com',
      guestPhone: '+221 77 456 78 90',
      type: 'Chambre Simple',
      roomNumber: '103',
      checkIn: '2024-04-22',
      checkOut: '2024-04-25',
      nights: 3,
      guests: 1,
      price: '54,000 FCFA',
      status: 'Annulée',
      bookingDate: '2024-04-09',
      specialRequests: ''
    }
  ]);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.includes(searchTerm);
    const matchesStatus = statusFilter === 'Tous' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const handleConfirm = (id: string) => {
    setBookings(bookings.map(b =>
      b.id === id ? { ...b, status: 'Confirmée' } : b
    ));
  };

  const handleCancel = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      setBookings(bookings.map(b =>
        b.id === id ? { ...b, status: 'Annulée' } : b
      ));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmée':
        return <Badge className="bg-emerald-500 text-white">Confirmée</Badge>;
      case 'En attente':
        return <Badge className="bg-amber-500 text-white">En attente</Badge>;
      case 'Annulée':
        return <Badge className="bg-red-500 text-white">Annulée</Badge>;
      case 'Terminée':
        return <Badge className="bg-gray-500 text-white">Terminée</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'Confirmée').length,
    pending: bookings.filter(b => b.status === 'En attente').length,
    cancelled: bookings.filter(b => b.status === 'Annulée').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Réservations</h1>
        <p className="text-gray-600 mt-1">Consultez et gérez toutes vos réservations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Réservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{stats.confirmed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annulées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.cancelled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom, email ou numéro de chambre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
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
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <User className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{booking.guestName}</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {booking.checkIn} {booking.checkOut !== '-' && `→ ${booking.checkOut}`}
                          {booking.nights > 0 && ` (${booking.nights} nuit${booking.nights > 1 ? 's' : ''})`}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{booking.type}</span>
                        {booking.roomNumber !== '-' && (
                          <>
                            <span>•</span>
                            <span>Chambre {booking.roomNumber}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{booking.guests} personne{booking.guests > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="text-2xl font-bold text-emerald-600">{booking.price}</div>
                  <div className="flex items-center space-x-2">
                    {booking.status === 'En attente' && (
                      <>
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => handleConfirm(booking.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirmer
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleCancel(booking.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Refuser
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(booking)}
                    >
                      Détails
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
            <DialogDescription>
              Informations complètes sur la réservation
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Client</Label>
                  <p className="text-lg font-semibold">{selectedBooking.guestName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Statut</Label>
                  <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Label>
                  <p className="text-sm">{selectedBooking.guestEmail}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500 flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    Téléphone
                  </Label>
                  <p className="text-sm">{selectedBooking.guestPhone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Type</Label>
                  <p className="text-sm">{selectedBooking.type}</p>
                </div>
                {selectedBooking.roomNumber !== '-' && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Numéro de chambre</Label>
                    <p className="text-sm">Chambre {selectedBooking.roomNumber}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Date d'arrivée</Label>
                  <p className="text-sm">{selectedBooking.checkIn}</p>
                </div>
                {selectedBooking.checkOut !== '-' && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Date de départ</Label>
                    <p className="text-sm">{selectedBooking.checkOut}</p>
                  </div>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Prix total</Label>
                <p className="text-2xl font-bold text-emerald-600">{selectedBooking.price}</p>
              </div>
              {selectedBooking.specialRequests && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Demandes spéciales</Label>
                  <p className="text-sm bg-gray-50 p-3 rounded">{selectedBooking.specialRequests}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Fermer
            </Button>
            {selectedBooking?.status === 'En attente' && (
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => {
                  handleConfirm(selectedBooking.id);
                  setIsDialogOpen(false);
                }}
              >
                Confirmer la réservation
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsPage;

