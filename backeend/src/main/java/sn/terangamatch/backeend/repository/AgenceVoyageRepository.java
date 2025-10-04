package sn.terangamatch.backeend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.terangamatch.backeend.model.AgenceVoyage;

import java.util.Optional;

@Repository
public interface AgenceVoyageRepository extends JpaRepository<AgenceVoyage, Long> {

    Optional<AgenceVoyage> findByNom(String nom);

    boolean existsByEmail(String email);
}

