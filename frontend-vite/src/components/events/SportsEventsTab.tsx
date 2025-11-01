import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users } from 'lucide-react';

interface SportsEventsTabProps {
  events: any[];
}

const SportsEventsTab: React.FC<SportsEventsTabProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Aucun événement sportif trouvé.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card
          key={event.id}
          className="hover:shadow-lg transition-all duration-200 border border-gray-100"
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                {event.title}
              </span>
              {event.isLive && (
                <Badge className="bg-red-100 text-red-700 animate-pulse">
                  🔴 Live
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-gray-600 text-sm space-x-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{event.location || 'Non spécifiée'}</span>
            </div>

            <div className="flex items-center text-gray-600 text-sm space-x-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>
                {new Date(event.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            {event.category && (
              <Badge variant="outline" className="text-blue-700 border-blue-200">
                {event.category}
              </Badge>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center text-gray-700 text-sm space-x-2">
                <Users className="w-4 h-4 text-green-500" />
                <span>{event.registered || 0} participants</span>
              </div>
              {event.price && (
                <span className="text-sm font-semibold text-gray-900">
                  {event.price}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SportsEventsTab;
