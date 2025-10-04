package sn.terangamatch.backeend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.terangamatch.backeend.model.Event;
import sn.terangamatch.backeend.model.Guide;
import sn.terangamatch.backeend.model.Place;
import sn.terangamatch.backeend.model.Review;
import sn.terangamatch.backeend.model.User;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByAuthor(User author);

    List<Review> findByGuide(Guide guide);

    List<Review> findByPlace(Place place);

    List<Review> findByEvent(Event event);
}
