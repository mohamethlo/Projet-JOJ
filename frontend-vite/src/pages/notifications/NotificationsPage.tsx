import React from 'react';
import { Bell, CheckCircle2, Heart, MessageCircle, Newspaper } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNotifications, NotificationType } from '@/context/NotificationContext';
import { cn } from '@/lib/utils';

const typeBadge: Record<NotificationType, string> = {
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  like: 'bg-red-50 text-red-600 border-red-100',
  comment: 'bg-blue-50 text-blue-600 border-blue-100',
  publish: 'bg-orange-50 text-[#F2A900] border-orange-100',
};

const formatRelative = (iso: string) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days} j`;
};

const NotificationsPage: React.FC = () => {
  const {
    notifications: items,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    unreadCount
  } = useNotifications();

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-10 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 sm:p-2.5 rounded-xl bg-orange-100 shadow-sm border-2 border-white shrink-0">
            <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#2D1B08] tracking-tight leading-none uppercase truncate sm:whitespace-normal">NOTIFICATIONS</h1>
            <p className="text-[#5D4037]/60 text-[9px] sm:text-xs font-bold uppercase tracking-widest mt-1 leading-tight">
              {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''} mise{unreadCount > 1 ? 's' : ''} à jour
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            size="sm"
            className="flex-1 md:flex-none text-[9px] sm:text-[10px] border-2 border-[#EBE3D5] rounded-full font-black px-3 sm:px-4 h-9 hover:bg-orange-50 transition-all uppercase"
          >
            Tout lire
          </Button>
          <Button
            variant="outline"
            onClick={clearNotifications}
            size="sm"
            className="flex-1 md:flex-none text-[9px] sm:text-[10px] border-2 font-black border-red-50 text-red-500 hover:bg-red-50 rounded-full px-3 sm:px-4 h-9 transition-all uppercase"
          >
            Vider
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <Card className="p-10 sm:p-16 text-center border-2 border-[#EBE3D5] border-dashed rounded-[1.5rem] bg-white shadow-sm overflow-hidden">
          <div className="bg-gray-50 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="h-6 w-6 text-gray-300" />
          </div>
          <p className="text-[#2D1B08]/40 font-black uppercase tracking-widest text-xs sm:text-sm px-4">Aucune notification</p>
        </Card>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {items.map((n, idx) => (
            <Card
              key={n.id}
              className={cn(
                "p-3 sm:p-4 border-2 transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-bottom-2 group rounded-2xl sm:rounded-[1.25rem]",
                !n.read ? "bg-orange-50/30 border-[#F2A900]/20 shadow-sm" : "bg-white border-gray-100 hover:border-orange-100"
              )}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 text-left">
                  <div className={cn(
                    "p-1.5 sm:p-2 rounded-lg shrink-0 shadow-sm transition-transform group-hover:scale-105 duration-300",
                    n.type === 'like' ? "bg-red-50 text-red-500" :
                      n.type === 'comment' ? "bg-blue-50 text-blue-500" :
                        n.type === 'publish' ? "bg-orange-50 text-[#F2A900]" :
                          "bg-gray-50 text-gray-400"
                  )}>
                    {n.type === 'like' && <Heart className="h-4 w-4 sm:h-5 sm:w-5" />}
                    {n.type === 'comment' && <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />}
                    {n.type === 'publish' && <Newspaper className="h-4 w-4 sm:h-5 sm:w-5" />}
                    {['info', 'success', 'warning'].includes(n.type) && <Bell className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className={cn(
                        "font-black text-[#2D1B08] text-xs sm:text-sm tracking-tight uppercase leading-tight truncate px-0",
                        !n.read ? "text-[#2D1B08]" : "text-[#2D1B08]/80"
                      )}>
                        {n.title}
                      </h3>
                      {!n.read && <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#F2A900] shrink-0" />}
                    </div>
                    <p className="text-[#5D4037]/80 text-[10px] sm:text-xs font-medium leading-snug line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                      {n.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-gray-400 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">{formatRelative(n.date)}</span>
                      <div className={cn(
                        "text-[7px] sm:text-[8px] font-black uppercase tracking-tighter px-1.5 py-0 rounded-md border",
                        typeBadge[n.type]
                      )}>
                        {n.type === 'publish' ? 'Post' : n.type}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {!n.read ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(n.id)}
                      className="h-7 px-2 text-[8px] font-black uppercase text-[#F2A900] hover:bg-orange-50 tracking-wider rounded-lg border border-orange-100"
                    >
                      Lu
                    </Button>
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400 opacity-50 block sm:hidden md:block" />
                  )}
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


