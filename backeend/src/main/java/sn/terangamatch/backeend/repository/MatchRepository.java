package sn.terangamatch.backeend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.terangamatch.backeend.model.Match;
import sn.terangamatch.backeend.model.MatchStatus;
import sn.terangamatch.backeend.model.User;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    // Tous les match impliquant un user (soit user1 soit user2)
    List<Match> findByUser1OrUser2(User user1, User user2);

    // Variante par id
    List<Match> findByUser1_IdOrUser2_Id(Long user1Id, Long user2Id);

    List<Match> findByStatus(MatchStatus status);
}

