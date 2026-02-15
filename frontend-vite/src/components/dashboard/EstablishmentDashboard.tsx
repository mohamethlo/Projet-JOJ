import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Bed,
  UtensilsCrossed,
  Calendar,
  Star,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Plus,
  MessageSquare,
  Award,
  AlertCircle,
  FileText,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface EstablishmentDashboardProps {
  user: any;
}

const EstablishmentDashboard: React.FC<EstablishmentDashboardProps> = ({ user }) => {
  const establishmentType = user.role === 'hotel' ? 'hotel' : 'restaurant';

  const mockStats = {
    totalBookings: 124,
    activeBookings: 18,
    totalRevenue: '3,450,000 FCFA',
    averageRating: 4.8,
    totalRooms: 25,
    occupiedRooms: 18,
    pendingReservations: 7,
    responseTime: '1h',
    monthlyRevenue: '850,000 FCFA',
    occupancyRate: 72
  };

  const mockRecentBookings = [
    {
      id: '1',
      guestName: 'Jean Dupont',
      type: 'Chambre Double',
      checkIn: '15/04/2024',
      checkOut: '18/04/2024',
      status: 'Confirmée',
      price: '75,000 FCFA',
      nights: 3
    },
    {
      id: '2',
      guestName: 'Maria Garcia',
      type: 'Suite Deluxe',
      checkIn: '20/04/2024',
      checkOut: '23/04/2024',
      status: 'En attente',
      price: '150,000 FCFA',
      nights: 3
    },
    {
      id: '3',
      guestName: 'Ahmed Diallo',
      type: 'Réservation Table',
      checkIn: '17/04/2024',
      checkOut: '-',
      status: 'Confirmée',
      price: '25,000 FCFA',
      nights: 0
    }
  ];

  const getEstablishmentIcon = () => {
    switch (establishmentType) {
      case 'hotel':
        return <Building2 className="h-8 w-8" />;
      case 'restaurant':
        return <UtensilsCrossed className="h-8 w-8" />;
      default:
        return <Building2 className="h-8 w-8" />;
    }
  };

  const getEstablishmentName = () => {
    return establishmentType === 'hotel' ? 'Hôtel' : 'Restaurant';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section - Beautiful Gradient */}
      <Card className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                {getEstablishmentIcon()}
                <Badge className="bg-white/20 text-white border-white/30">
                  {establishmentType === 'hotel' ? 'Hôtel' : 'Restaurant'}
                </Badge>
              </div>
              <h2 className="text-3xl font-bold mb-2">Bienvenue, {user.name}! 👋</h2>
              <p className="text-white/90 text-lg">
                Gérez votre {getEstablishmentName().toLowerCase()} et offrez une expérience inoubliable à vos clients
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                <div className="text-4xl font-bold mb-1">{mockStats.averageRating}</div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-white text-white" />
                  ))}
                </div>
                <div className="text-sm text-white/90">Note moyenne</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations actives</CardTitle>
            <Calendar className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockStats.activeBookings}</div>
            <p className="text-xs text-muted-foreground mt-1">+3 cette semaine</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${mockStats.occupancyRate}%` }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockStats.pendingReservations}</div>
            <p className="text-xs text-muted-foreground mt-1">Nécessitent confirmation</p>
            <Button size="sm" variant="outline" className="mt-3 w-full">
              Voir les demandes
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus ce mois</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.monthlyRevenue}</div>
            <p className="text-xs text-muted-foreground mt-1">+18% vs mois dernier</p>
            <div className="mt-2 flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-semibold">En hausse</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {establishmentType === 'hotel' ? "Taux d'occupation" : 'Taux de remplissage'}
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockStats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {establishmentType === 'hotel'
                ? `${mockStats.occupiedRooms}/${mockStats.totalRooms} chambres occupées`
                : `${mockStats.occupiedRooms}/${mockStats.totalRooms} tables occupées`}
            </p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${mockStats.occupancyRate}%` }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-emerald-500" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Taux d'occupation</span>
                  <span className="text-sm text-gray-600">{mockStats.occupancyRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{ width: `${mockStats.occupancyRate}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Satisfaction client</span>
                  <span className="text-sm text-gray-600">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Réactivité</span>
                  <span className="text-sm text-gray-600">1h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-purple-500" />
              Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm">Réservations totales</span>
                <span className="font-semibold text-lg">{mockStats.totalBookings}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm">
                  {establishmentType === 'hotel' ? 'Chambres disponibles' : 'Tables disponibles'}
                </span>
                <span className="font-semibold text-lg">{mockStats.totalRooms - mockStats.occupiedRooms}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm">Revenus totaux</span>
                <span className="font-semibold text-lg text-emerald-600">{mockStats.totalRevenue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Temps de réponse moyen</span>
                <span className="font-semibold text-lg">{mockStats.responseTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-purple-500" />
              Badges & Récompenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Établissement Premium</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">Certifié</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">Top Qualité</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-orange-100 text-orange-700 border-orange-300">Meilleure Note</Badge>
              </div>
              <div className="text-sm text-gray-600 mt-4 space-y-1">
                <p>✓ Service exceptionnel</p>
                <p>✓ Accueil chaleureux</p>
                <p>✓ Excellente réputation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Réservations récentes
          </CardTitle>
          <Link to="/establishment/bookings">
            <Button variant="outline" size="sm">
              Voir tout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${establishmentType === 'hotel' ? 'bg-emerald-100' :
                    establishmentType === 'restaurant' ? 'bg-orange-100' :
                      'bg-blue-100'
                    }`}>
                    {establishmentType === 'hotel' ? <Bed className="h-6 w-6 text-emerald-600" /> :
                      establishmentType === 'restaurant' ? <UtensilsCrossed className="h-6 w-6 text-orange-600" /> :
                        <Home className="h-6 w-6 text-blue-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{booking.guestName}</h4>
                    <p className="text-sm text-gray-600">{booking.type}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-gray-500">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {booking.checkIn} {booking.checkOut !== '-' && `→ ${booking.checkOut}`}
                      </span>
                      {establishmentType === 'hotel' && booking.nights > 0 && (
                        <span className="text-xs text-gray-500">{booking.nights} nuit{booking.nights > 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    variant={
                      booking.status === 'Confirmée'
                        ? 'default'
                        : booking.status === 'En attente'
                          ? 'secondary'
                          : 'outline'
                    }
                    className={
                      booking.status === 'Confirmée' ? 'bg-emerald-500 text-white' :
                        booking.status === 'En attente' ? 'bg-amber-500 text-white' : ''
                    }
                  >
                    {booking.status}
                  </Badge>
                  <span className="font-semibold text-emerald-600 text-lg">{booking.price}</span>
                  {booking.status === 'En attente' && (
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirmer
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {establishmentType === 'hotel' ? (
              <>
                <Link to="/establishment/rooms">
                  <Button variant="outline" className="w-full justify-start bg-white hover:bg-emerald-50 border-emerald-200">
                    <Bed className="mr-2 h-4 w-4" />
                    Gérer les chambres
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/establishment/rooms">
                  <Button variant="outline" className="w-full justify-start bg-white hover:bg-emerald-50 border-emerald-200">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une chambre
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/establishment/menu">
                  <Button variant="outline" className="w-full justify-start bg-white hover:bg-emerald-50 border-emerald-200">
                    <UtensilsCrossed className="mr-2 h-4 w-4" />
                    Gérer le menu
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/establishment/menu">
                  <Button variant="outline" className="w-full justify-start bg-white hover:bg-emerald-50 border-emerald-200">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un plat
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
            <Link to="/establishment/bookings">
              <Button variant="outline" className="w-full justify-start bg-white hover:bg-emerald-50 border-emerald-200">
                <Calendar className="mr-2 h-4 w-4" />
                Toutes les réservations
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/establishment/create-post">
              <Button variant="outline" className="w-full justify-start bg-white hover:bg-[#F2A900]/10 border-[#F2A900] text-[#F2A900] font-black">
                <FileText className="mr-2 h-4 w-4" />
                Créer une publication
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="outline" className="w-full justify-start bg-white hover:bg-emerald-50 border-emerald-200">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messagerie
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/establishment/profile">
              <Button variant="outline" className="w-full justify-start bg-white hover:bg-emerald-50 border-emerald-200">
                <Building2 className="mr-2 h-4 w-4" />
                Profil de l'établissement
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/establishment/reviews">
              <Button variant="outline" className="w-full justify-start bg-white hover:bg-emerald-50 border-emerald-200">
                <MessageSquare className="mr-2 h-4 w-4" />
                Avis clients
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Nouvelle réservation</p>
                  <p className="text-xs text-gray-600">Jean Dupont a réservé une chambre double</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Star className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Nouvel avis</p>
                  <p className="text-xs text-gray-600">5 étoiles de Maria Garcia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Rappel</p>
                  <p className="text-xs text-gray-600">Arrivée prévue demain à 14h</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <TrendingUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Objectif atteint</p>
                  <p className="text-xs text-gray-600">Taux d'occupation supérieur à 70%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EstablishmentDashboard;

