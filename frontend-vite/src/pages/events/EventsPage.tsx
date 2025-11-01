import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Calendar, Users, TrendingUp, MapPin, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockEvents } from '@/lib/mockData';
import { SportsEventsTab, OtherEventsTab } from '@/components/events';

const EventsPage: React.FC = () => {
  const { user } = useAuth();
  
  // Compter les événements par type
  const sportsEvents = mockEvents.filter(event => event.type === 'sport');
  const otherEvents = mockEvents.filter(event => event.type === 'other');
  const liveEvents = sportsEvents.filter(event => event.isLive);
  
  // Statistiques supplémentaires
  const totalParticipants = mockEvents.reduce((sum, event) => sum + event.registered, 0);
  const totalCapacity = mockEvents.reduce((sum, event) => sum + event.capacity, 0);
  const participationRate = Math.round((totalParticipants / totalCapacity) * 100);
  
  // Événements par ville
  const eventsByCity = mockEvents.reduce((acc, event) => {
    acc[event.location] = (acc[event.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCities = Object.entries(eventsByCity)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <div className="space-y-6 px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Événements</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Découvrez tous les événements du Sénégal</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Badge className="bg-red-100 text-red-700 text-xs sm:text-sm">
            {liveEvents.length} en direct
          </Badge>
          <Badge className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
            {mockEvents.length} événement(s)
          </Badge>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Événements</p>
                <p className="text-2xl font-bold text-gray-900">{mockEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Participants</p>
                <p className="text-2xl font-bold text-gray-900">{totalParticipants.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Taux de Participation</p>
                <p className="text-2xl font-bold text-gray-900">{participationRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Villes Actives</p>
                <p className="text-2xl font-bold text-gray-900">{Object.keys(eventsByCity).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Villes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span>Villes les plus actives</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topCities.map(([city, count], index) => (
              <div key={city} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{city}</p>
                    <p className="text-sm text-gray-600">{count} événement{count > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <Badge variant="outline">{count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Onglets */}
      <Tabs defaultValue="sports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sports" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Événements Sportifs</span>
            {liveEvents.length > 0 && (
              <Badge className="bg-red-100 text-red-700 text-xs ml-1">
                {liveEvents.length} live
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="other" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Autres Événements</span>
            <Badge className="bg-blue-100 text-blue-700 text-xs ml-1">
              {otherEvents.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sports" className="space-y-6">
          <SportsEventsTab events={sportsEvents} />
        </TabsContent>

        <TabsContent value="other" className="space-y-6">
          <OtherEventsTab events={otherEvents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;
