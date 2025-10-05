import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Star, 
  MapPin, 
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  DollarSign,
  Award,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface GuideDashboardProps {
  user: any;
}

const GuideDashboard: React.FC<GuideDashboardProps> = ({ user }) => {
  const mockGuideStats = {
    totalTours: 15,
    totalTourists: 78,
    totalEarnings: '1,250,000 FCFA',
    averageRating: 4.9,
    activeTours: 3,
    completedTours: 12,
    pendingBookings: 5,
    responseTime: '2h'
  };

  const mockRecentBookings = [
    {
      id: '1',
      touristName: 'Jean Dupont',
      tourTitle: 'Visite historique de l\'île de Gorée',
      date: '10/04/2024',
      status: 'Confirmée',
      price: '60€'
    },
    {
      id: '2',
      touristName: 'Maria Garcia',
      tourTitle: 'Découverte culinaire de Dakar',
      date: '20/05/2024',
      status: 'En attente',
      price: '45€'
    },
    {
      id: '3',
      touristName: 'Kenji Tanaka',
      tourTitle: 'Randonnée dans le Parc National',
      date: '01/06/2024',
      status: 'Terminée',
      price: '90€'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Bonjour, {user.name}! 👋</h2>
          <p className="opacity-90">Gérez vos visites et développez votre activité de guide</p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visites actives</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockGuideStats.activeTours}</div>
            <p className="text-xs text-muted-foreground">+2 cette semaine</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations en attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockGuideStats.pendingBookings}</div>
            <p className="text-xs text-muted-foreground">À confirmer</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockGuideStats.averageRating}</div>
            <p className="text-xs text-muted-foreground">Basée sur 78 avis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gains ce mois</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250,000 FCFA</div>
            <p className="text-xs text-muted-foreground">+15% vs mois dernier</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Objectif mensuel</span>
                  <span className="text-sm text-gray-600">8/10 visites</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Satisfaction client</span>
                  <span className="text-sm text-gray-600">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Réactivité</span>
                  <span className="text-sm text-gray-600">2h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-500" />
              Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Visites totales</span>
                <span className="font-semibold">{mockGuideStats.totalTours}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Touristes accueillis</span>
                <span className="font-semibold">{mockGuideStats.totalTourists}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Visites terminées</span>
                <span className="font-semibold">{mockGuideStats.completedTours}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Gains totaux</span>
                <span className="font-semibold">{mockGuideStats.totalEarnings}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-purple-500" />
              Récompenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-100 text-yellow-700">Guide Premium</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-700">Certifié</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-100 text-blue-700">Top Guide</Badge>
              </div>
              <div className="text-sm text-gray-600 mt-3">
                <p>• Guide de confiance</p>
                <p>• Réponse rapide</p>
                <p>• Excellents avis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Réservations récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{booking.touristName}</h4>
                    <p className="text-sm text-gray-600">{booking.tourTitle}</p>
                    <p className="text-xs text-gray-500">{booking.date}</p>
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
                  >
                    {booking.status}
                  </Badge>
                  <span className="font-semibold text-orange-600">{booking.price}</span>
                  {booking.status === 'En attente' && (
                    <Button size="sm" variant="outline">
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
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/guides">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Gérer mes visites
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/guides">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Mes touristes
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Mes avis reçus
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Mes statistiques
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Nouvelle réservation</p>
                  <p className="text-xs text-gray-600">Jean Dupont a réservé votre visite</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Star className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Nouvel avis</p>
                  <p className="text-xs text-gray-600">5 étoiles de Maria Garcia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Rappel</p>
                  <p className="text-xs text-gray-600">Visite prévue demain à 9h</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuideDashboard;
