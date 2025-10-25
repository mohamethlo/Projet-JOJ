package sn.terangamatch.backeend.service;


import lombok.RequiredArgsConstructor;
import sn.terangamatch.backeend.model.Event;
import sn.terangamatch.backeend.repository.EventRepository;

import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Événement non trouvé"));
    }

    public List<Event> getEventsByType(String type) {
        return eventRepository.findByType(type);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event updated) {
        Event event = getEventById(id);
        event.setTitle(updated.getTitle());
        event.setDescription(updated.getDescription());
        event.setLocation(updated.getLocation());
        event.setType(updated.getType());
        event.setCategory(updated.getCategory());
        event.setStatus(updated.getStatus());
        event.setDate(updated.getDate());
        event.setPrice(updated.getPrice());
        event.setLive(updated.isLive());
        event.setRegistered(updated.getRegistered());
        event.setLiveData(updated.getLiveData());
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
