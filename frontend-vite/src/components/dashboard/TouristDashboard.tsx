import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Heart, 
  Star, 
  MapPin, 
  Users, 
  ArrowRight,
  Clock,
  CheckCircle,
  TrendingUp,
  Globe,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TouristDashboardProps {
  user: any;
}

const TouristDashboard: React.FC<TouristDashboardProps> = ({ user }) => {
  // Mock data for tourist dashboard
  const mockGuides = [
    {
      id: '1',
      name: 'Amadou Diallo',
      location: 'Dakar',
      rating: 4.9,
      price: '50€/jour',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      name: 'Fatou Sarr',
      location: 'Saint-Louis',
      rating: 4.8,
      price: '45€/jour',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      name: 'Moussa Ba',
      location: 'Thiès',
      rating: 4.7,
      price: '40€/jour',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const mockEvents = [
    {
      id: '1',
      title: 'Festival de Jazz de Saint-Louis',
      description: 'Découvrez la musique jazz dans la ville historique',
      date: '15-17 Avril 2024',
      location: 'Saint-Louis',
      category: 'Musique'
    },
    {
      id: '2',
      title: 'Foire Internationale de Dakar',
      description: 'Exposition des produits locaux et internationaux',
      date: '20-25 Avril 2024',
      location: 'Dakar',
      category: 'Culture'
    }
  ];

  const mockMatches = [
    {
      id: '1',
      local: {
        name: 'Aïcha Diop',
        location: 'Dakar',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      compatibility: 95,
      reason: 'Vous partagez les mêmes intérêts pour la culture et l\'histoire du Sénégal',
      commonInterests: ['Culture', 'Histoire', 'Gastronomie']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Bienvenue, {user.name}! 👋</h2>
          <p className="opacity-90">Découvrez les merveilles du Sénégal avec laTeranga</p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mes réservations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Prochaine le 15 avril</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jumelages</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">En attente</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avis donnés</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Note moyenne: 4.8</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points fidélité</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">+150 ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Matches */}
      {mockMatches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              Jumelages recommandés par l'IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockMatches.map((match) => (
              <div key={match.id} className="p-4 border rounded-lg mb-4 last:mb-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={match.local.avatar} 
                      alt={match.local.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{match.local.name}</h4>
                      <p className="text-sm text-gray-600">{match.local.location}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {match.compatibility}% compatible
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{match.reason}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {match.commonInterests.map((interest, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">Refuser</Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Accepter</Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions & Popular Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/guides">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Trouver un guide
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Événements à venir
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Explorer la carte
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Mes jumelages
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guides populaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockGuides.slice(0, 3).map((guide) => (
                <div key={guide.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <img 
                    src={guide.avatar} 
                    alt={guide.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{guide.name}</p>
                    <p className="text-xs text-gray-600">{guide.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-xs">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {guide.rating}
                    </div>
                    <p className="text-xs text-gray-500">{guide.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/guides">
              <Button variant="ghost" className="w-full mt-3 text-orange-600">
                Voir tous les guides
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle>Événements à venir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{event.title}</h4>
                  <Badge variant="outline">{event.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TouristDashboard;
