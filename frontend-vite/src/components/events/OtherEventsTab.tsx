import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock } from 'lucide-react';

interface OtherEventsTabProps {
  events: any[];
}

const OtherEventsTab: React.FC<OtherEventsTabProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Aucun autre événement disponible.
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
              <Badge className="bg-gray-100 text-gray-700 capitalize">
                {event.status || 'À venir'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-gray-700 text-sm line-clamp-2">
              {event.description || 'Aucune description disponible.'}
            </div>

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
              <Badge variant="outline" className="text-purple-700 border-purple-200">
                {event.category}
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OtherEventsTab;
