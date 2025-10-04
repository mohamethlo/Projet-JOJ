package sn.terangamatch.backeend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.terangamatch.backeend.model.Place;
import sn.terangamatch.backeend.model.PlaceType;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {

    List<Place> findByType(PlaceType type);

    List<Place> findByNameContainingIgnoreCase(String q);

    List<Place> findByAddressContainingIgnoreCase(String q);
}
