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
  AlertCircle,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrganizerDashboardProps {
  user: any;
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ user }) => {
  const mockOrganizerStats = {
    totalEvents: 8,
    activeEvents: 3,
    totalParticipants: 245,
    totalRevenue: '850,000 FCFA',
    averageRating: 4.7,
    pendingEvents: 2,
    completedEvents: 5,
    responseTime: '1h'
  };

  const mockRecentEvents = [
    {
      id: '1',
      title: 'Festival de Jazz de Saint-Louis',
      date: '15-17 Avril 2024',
      location: 'Saint-Louis',
      participants: 120,
      status: 'Actif',
      revenue: '300,000 FCFA'
    },
    {
      id: '2',
      title: 'Foire Internationale de Dakar',
      date: '20-25 Avril 2024',
      location: 'Dakar',
      participants: 85,
      status: 'En attente',
      revenue: '0 FCFA'
    },
    {
      id: '3',
      title: 'Semaine Culturelle de Thiès',
      date: '10-15 Mars 2024',
      location: 'Thiès',
      participants: 200,
      status: 'Terminé',
      revenue: '450,000 FCFA'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Bonjour, {user.name}! 👋</h2>
          <p className="opacity-90">Créez et gérez vos événements pour la communauté</p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Événements actifs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOrganizerStats.activeEvents}</div>
            <p className="text-xs text-muted-foreground">+1 cette semaine</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants total</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOrganizerStats.totalParticipants}</div>
            <p className="text-xs text-muted-foreground">+45 ce mois</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOrganizerStats.averageRating}</div>
            <p className="text-xs text-muted-foreground">Basée sur 156 avis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus ce mois</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180,000 FCFA</div>
            <p className="text-xs text-muted-foreground">+25% vs mois dernier</p>
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
                  <span className="text-sm text-gray-600">3/4 événements</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Satisfaction participants</span>
                  <span className="text-sm text-gray-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Taux de participation</span>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-500" />
              Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Événements total</span>
                <span className="font-semibold">{mockOrganizerStats.totalEvents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Événements terminés</span>
                <span className="font-semibold">{mockOrganizerStats.completedEvents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">En attente validation</span>
                <span className="font-semibold">{mockOrganizerStats.pendingEvents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Revenus totaux</span>
                <span className="font-semibold">{mockOrganizerStats.totalRevenue}</span>
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
                <Badge className="bg-purple-100 text-purple-700">Organisateur Premium</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-700">Certifié</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-100 text-blue-700">Top Organisateur</Badge>
              </div>
              <div className="text-sm text-gray-600 mt-3">
                <p>• Événements de qualité</p>
                <p>• Excellente organisation</p>
                <p>• Participants satisfaits</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Mes événements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date} • {event.location}</p>
                    <p className="text-xs text-gray-500">{event.participants} participants</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={
                      event.status === 'Actif' 
                        ? 'default' 
                        : event.status === 'En attente' 
                        ? 'secondary' 
                        : 'outline'
                    }
                  >
                    {event.status}
                  </Badge>
                  <span className="font-semibold text-purple-600">{event.revenue}</span>
                  {event.status === 'En attente' && (
                    <Button size="sm" variant="outline">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Modifier
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
            <Link to="/events">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Créer un événement
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Gérer mes événements
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
                  <p className="text-sm font-medium">Événement approuvé</p>
                  <p className="text-xs text-gray-600">Festival de Jazz validé</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Nouvelle inscription</p>
                  <p className="text-xs text-gray-600">15 participants pour votre événement</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Rappel</p>
                  <p className="text-xs text-gray-600">Événement prévu demain à 14h</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
