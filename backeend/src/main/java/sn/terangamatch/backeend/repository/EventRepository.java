package sn.terangamatch.backeend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.terangamatch.backeend.model.Event;
import sn.terangamatch.backeend.model.User;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByOrganizer(User organizer);

    // Trouver événements où un user participe
    List<Event> findByParticipantsContaining(User user);

    // Recherche par tranche de dates
    List<Event> findByStartDateTimeBetween(LocalDateTime start, LocalDateTime end);
}
