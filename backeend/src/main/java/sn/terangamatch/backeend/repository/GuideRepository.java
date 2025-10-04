package sn.terangamatch.backeend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.terangamatch.backeend.model.AgenceVoyage;
import sn.terangamatch.backeend.model.Guide;

import java.util.List;

@Repository
public interface GuideRepository extends JpaRepository<Guide, Long> {
    
    // Trouver les guides par agence
    List<Guide> findByAgenceVoyage(AgenceVoyage agenceVoyage);

    // Trouver les guides vérifiés
    List<Guide> findByVerifiedTrue();

    // Trouver les guides par spécialité (élément dans la collection)
    List<Guide> findBySpecialtiesContaining(String specialty);

    // Trouver guide par user id (héritage via user)
    List<Guide> findByUser_Id(Long userId);
}
