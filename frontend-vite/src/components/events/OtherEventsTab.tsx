import React from 'react';
import EventCard from '@/components/cards/EventCard';

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
        <EventCard
          key={event.id}
          event={{
            id: event.id,
            title: event.title,
            description: event.description || '',
            date: event.date,
            time: event.time || '',
            location: event.location,
            capacity: event.capacity || 0,
            registered: event.registered || 0,
            price: event.price || 'Gratuit',
            image: event.image || '',
            organizer: event.organizer || '',
            category: event.category || ''
          }}
        />
      ))}
    </div>
  );
};

export default OtherEventsTab;
