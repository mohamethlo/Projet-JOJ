import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Calendar, Users, TrendingUp, MapPin } from 'lucide-react';
import { mockEvents } from '@/lib/mockData';
import { SportsEventsTab, OtherEventsTab } from '@/components/events';

const EventsPage: React.FC = () => {

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
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FFFDFB] space-y-8 px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2D1B08] uppercase tracking-tighter">Événements</h1>
          <p className="text-[#5D4037] mt-1 text-sm sm:text-lg font-medium">Découvrez tous les événements du Sénégal</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-[#E11D48]/10 text-[#E11D48] border-[#E11D48]/20 text-xs sm:text-sm font-black uppercase tracking-widest px-4 py-1.5">
            {liveEvents.length} en direct
          </Badge>
          <Badge className="bg-[#F2A900]/10 text-[#F2A900] border-[#F2A900]/20 text-xs sm:text-sm font-black uppercase tracking-widest px-4 py-1.5">
            {mockEvents.length} événement(s)
          </Badge>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 border-[#EBE3D5] shadow-sm hover:border-[#F2A900] transition-colors bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#F2A900]/10 rounded-xl">
                <Calendar className="h-6 w-6 text-[#F2A900]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5D4037]/60">Total Événements</p>
                <p className="text-3xl font-black text-[#2D1B08] tracking-tighter">{mockEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#EBE3D5] shadow-sm hover:border-[#1B5E20] transition-colors bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#1B5E20]/10 rounded-xl">
                <Users className="h-6 w-6 text-[#1B5E20]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5D4037]/60">Participants</p>
                <p className="text-3xl font-black text-[#2D1B08] tracking-tighter">{totalParticipants.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#EBE3D5] shadow-sm hover:border-[#5D4037] transition-colors bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#5D4037]/10 rounded-xl">
                <TrendingUp className="h-6 w-6 text-[#5D4037]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5D4037]/60">Taux Participation</p>
                <p className="text-3xl font-black text-[#2D1B08] tracking-tighter">{participationRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#EBE3D5] shadow-sm hover:border-[#F28B06] transition-colors bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#F28B06]/10 rounded-xl">
                <MapPin className="h-6 w-6 text-[#F28B06]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5D4037]/60">Villes Actives</p>
                <p className="text-3xl font-black text-[#2D1B08] tracking-tighter">{Object.keys(eventsByCity).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Villes */}
      <Card className="border-2 border-[#EBE3D5] shadow-md bg-white overflow-hidden rounded-2xl">
        <CardHeader className="bg-[#FFFDFB] border-b border-[#EBE3D5]">
          <CardTitle className="flex items-center space-x-3 text-[#2D1B08] font-black uppercase tracking-tighter text-xl">
            <MapPin className="h-6 w-6 text-[#F2A900]" />
            <span>Villes les plus actives</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCities.map(([city, count], index) => (
              <div key={city} className="flex items-center justify-between p-4 bg-[#FFFDFB] rounded-xl border border-[#EBE3D5] hover:border-[#F2A900] transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#F2A900] rounded-full flex items-center justify-center shadow-lg shadow-orange-900/10">
                    <span className="text-sm font-black text-white">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-black text-[#2D1B08] uppercase tracking-tight group-hover:text-[#F2A900] transition-colors">{city}</p>
                    <p className="text-xs font-bold text-[#5D4037]/60">{count} événement{count > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-[#EBE3D5] text-[#F2A900] font-black">{count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Onglets */}
      <Tabs defaultValue="sports" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-[#EBE3D5] p-1 h-auto rounded-xl">
          <TabsTrigger value="sports" className="flex items-center justify-center space-x-3 py-4 font-black uppercase tracking-tighter data-[state=active]:bg-[#F2A900] data-[state=active]:text-white transition-all">
            <Trophy className="h-5 w-5" />
            <span>Événements Sportifs</span>
            {liveEvents.length > 0 && (
              <Badge className="bg-white text-[#E11D48] text-[10px] ml-2 font-black border-none h-5 px-1.5 flex items-center shadow-sm">
                {liveEvents.length} LIVE
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="other" className="flex items-center justify-center space-x-3 py-4 font-black uppercase tracking-tighter data-[state=active]:bg-[#F2A900] data-[state=active]:text-white transition-all">
            <Calendar className="h-5 w-5" />
            <span>Culture & Loisirs</span>
            <Badge className="bg-[#F2A900]/10 text-[#F2A900] text-[10px] ml-2 font-black px-1.5 h-5 flex items-center border-none">
              {otherEvents.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sports" className="space-y-8 outline-none">
          <SportsEventsTab events={sportsEvents} />
        </TabsContent>

        <TabsContent value="other" className="space-y-8 outline-none">
          <OtherEventsTab events={otherEvents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;
