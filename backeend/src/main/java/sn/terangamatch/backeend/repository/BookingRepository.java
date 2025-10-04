package sn.terangamatch.backeend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.terangamatch.backeend.model.Booking;
import sn.terangamatch.backeend.model.BookingStatus;
import sn.terangamatch.backeend.model.Guide;
import sn.terangamatch.backeend.model.User;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByVisitor(User visitor);

    List<Booking> findByGuide(Guide guide);

    List<Booking> findByStatus(BookingStatus status);
}
