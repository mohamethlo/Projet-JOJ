import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, PlusCircle, Palette, Plane, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ACTIVITIES = [
  { id: 1, type: 'artisan', user: 'Abdoulaye Wade', action: 'Nouvel artisan inscrit', time: 'Il y a 2h', icon: Palette, color: 'text-purple-600', bg: 'bg-purple-100' },
  { id: 2, type: 'post', user: 'Mame Diarra', action: 'Nouvelle publication : Le Grand Magal', time: 'Il y a 5h', icon: PlusCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
  { id: 3, type: 'agency', user: 'Voyages Teranga', action: 'Nouvelle offre d\'excursion ajoutée', time: 'Il y a 8h', icon: Plane, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 4, type: 'user', user: 'Ibrahim Sall', action: 'Nouvel utilisateur inscrit', time: 'Hier, 18:30', icon: User, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { id: 5, type: 'artisan', user: 'Keur Birago', action: 'Nouveau produit en boutique', time: 'Hier, 14:15', icon: Palette, color: 'text-purple-600', bg: 'bg-purple-100' },
];

const ActivityFeed: React.FC = () => {
  return (
    <Card className="rounded-2xl border-none bg-white shadow-sm hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-black text-[#2D1B08] uppercase tracking-widest flex items-center gap-2">
          <Clock size={16} className="text-[#F2A900]" />
          Activités Récentes
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        {ACTIVITIES.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 group cursor-default">
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-[#EBE3D5] group-hover:border-[#F2A900] transition-colors">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user}`} />
                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${activity.bg} ${activity.color} ring-2 ring-white`}>
                <activity.icon size={8} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="text-[11px] font-black text-[#2D1B08] uppercase truncate">{activity.user}</h4>
                <span className="text-[9px] font-bold text-[#5D4037]/40 uppercase">{activity.time}</span>
              </div>
              <p className="text-[10px] text-[#5D4037]/70 font-medium leading-relaxed italic">{activity.action}</p>
            </div>
          </div>
        ))}
        <button className="w-full pt-4 text-[10px] font-black text-[#F2A900] uppercase tracking-widest hover:text-[#6B4226] transition-colors flex items-center justify-center gap-2">
          Voir tout l'historique
        </button>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
