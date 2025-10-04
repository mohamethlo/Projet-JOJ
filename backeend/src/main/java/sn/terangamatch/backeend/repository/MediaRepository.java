package sn.terangamatch.backeend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.terangamatch.backeend.model.Media;
import sn.terangamatch.backeend.model.ModerationStatus;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {

    List<Media> findByRelatedTypeAndRelatedId(String relatedType, Long relatedId);

    List<Media> findByStatus(ModerationStatus status);
}
