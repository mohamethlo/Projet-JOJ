import React from 'react';
import { Bell, CheckCircle2, Info, AlertTriangle, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type NotificationType = 'info' | 'success' | 'warning';

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string; // ISO string
  read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'success',
    title: 'Réservation confirmée',
    message: 'Votre réservation pour la visite guidée de Gorée est confirmée pour demain 14:00.',
    date: new Date().toISOString(),
    read: false,
  },
  {
    id: 'n2',
    type: 'info',
    title: 'Nouvel article',
    message: 'Découvrez notre nouvel article sur les meilleures plages de la Petite Côte.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    type: 'warning',
    title: 'Changement d’horaire',
    message: 'L’événement « Festival Jazz » a été décalé à 20:30.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
  },
];

const typeIcon: Record<NotificationType, React.ReactNode> = {
  info: <Info className="h-4 w-4 text-blue-600" />,
  success: <CheckCircle2 className="h-4 w-4 text-green-600" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
};

const typeBadge: Record<NotificationType, string> = {
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

const formatRelative = (iso: string) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days} j`;
};

const NotificationsPage: React.FC = () => {
  const [items, setItems] = React.useState<NotificationItem[]>(mockNotifications);

  const unreadCount = items.filter(i => !i.read).length;

  const markAllAsRead = () => {
    setItems(prev => prev.map(i => ({ ...i, read: true })));
  };

  const clearAll = () => {
    setItems([]);
  };

  const toggleRead = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, read: !i.read } : i));
  };

  const removeOne = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-orange-100">
            <Bell className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">Notifications</h1>
            <p className="text-gray-500 text-xs sm:text-sm">Restez informé de vos activités et mises à jour</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0} size="sm" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Marquer tout comme lu</span>
            <span className="sm:hidden">Tout lire</span>
          </Button>
          <Button variant="outline" onClick={clearAll} size="sm" className="text-xs sm:text-sm">
            <Trash2 className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Vider</span>
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <Card className="p-10 text-center text-gray-500">
          Aucune notification pour le moment.
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((n) => (
            <Card key={n.id} className={`p-3 sm:p-4 ${!n.read ? 'bg-orange-50/60' : 'bg-white'}`}>
              <div className="flex items-start justify-between gap-2 sm:gap-4">
                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="mt-1 flex-shrink-0">{typeIcon[n.type]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-sm sm:text-base">{n.title}</h3>
                      <Badge className={`${typeBadge[n.type]} text-xs`}>{n.type}</Badge>
                      {!n.read && <span className="inline-block h-2 w-2 rounded-full bg-orange-500 flex-shrink-0" />}
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1 break-words">{n.message}</p>
                    <p className="text-gray-400 text-xs mt-2">{formatRelative(n.date)}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={() => toggleRead(n.id)} className="text-xs w-full sm:w-auto">
                    <span className="hidden sm:inline">{n.read ? 'Marquer non lu' : 'Marquer lu'}</span>
                    <span className="sm:hidden">{n.read ? 'Non lu' : 'Lu'}</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => removeOne(n.id)} className="text-xs w-full sm:w-auto">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;


