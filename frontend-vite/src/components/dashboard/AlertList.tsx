import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, ShieldAlert, Flag, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

const ALERTS = [
  { id: 1, type: 'Contenu Inapproprié', description: 'Signalement sur la publication #123 de @mame_diarra', priority: 'high', date: 'Il y a 10m' },
  { id: 2, type: 'Suspicion de Spam', description: 'Activité inhabituelle détectée sur le compte @bot_hunter', priority: 'medium', date: 'Il y a 45m' },
  { id: 3, type: 'Vérification Requise', description: 'Nouvelle demande d\'artisan en attente de revue', priority: 'medium', date: 'Il y a 2h' },
  { id: 4, type: 'Signalement Abus', description: 'Utilisateur @saliou_bakho signalé pour langage inapproprié', priority: 'high', date: 'Il y a 4h' },
];

const AlertList: React.FC = () => {
  return (
    <Card className="rounded-2xl border-none bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
      <CardHeader className="bg-red-50/50 border-b border-red-100 flex flex-row items-center justify-between px-8 py-4">
        <CardTitle className="text-sm font-black text-red-900 uppercase tracking-widest flex items-center gap-2">
          <ShieldAlert size={18} className="text-red-600 animate-pulse" />
          Alertes & Modération
        </CardTitle>
        <Badge className="bg-red-600 text-white font-black">{ALERTS.length}</Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#EBE3D5]">
          {ALERTS.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-3 rounded-2xl shrink-0 mt-1 shadow-sm",
                  alert.priority === 'high' ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                )}>
                  {alert.priority === 'high' ? <ShieldAlert size={18} /> : <AlertCircle size={18} />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                      alert.priority === 'high' ? "bg-red-600 text-white" : "bg-orange-500 text-white"
                    )}>
                      {alert.priority === 'high' ? 'Critique' : 'Attention'}
                    </span>
                    <span className="text-[10px] font-black text-[#2D1B08] uppercase tracking-tighter">{alert.type}</span>
                  </div>
                  <p className="text-[11px] text-[#5D4037]/70 font-medium italic">{alert.description}</p>
                  <p className="text-[9px] font-bold text-[#5D4037]/40 uppercase flex items-center gap-1 mt-1">
                    <Flag size={10} /> {alert.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-xl border-2 border-[#EBE3D5] text-[10px] font-black uppercase tracking-widest h-9 hover:bg-white hover:border-[#F2A900] transition-all">
                  Voir détails
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-[#2D1B08]">
                   <MoreVertical size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-4 text-[10px] font-black text-[#6B4226] uppercase tracking-widest hover:bg-gray-50 transition-colors border-t border-[#EBE3D5] bg-[#FAFAFA]">
          Accéder au centre de modération complet
        </button>
      </CardContent>
    </Card>
  );
};

export default AlertList;
