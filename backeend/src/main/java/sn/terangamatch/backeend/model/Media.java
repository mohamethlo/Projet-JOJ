package sn.terangamatch.backeend.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "media")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @Enumerated(EnumType.STRING)
    private MediaType type;

    @Enumerated(EnumType.STRING)
    private ModerationStatus status;

    private String relatedType; // PLACE, EVENT, PROFILE
    private Long relatedId;
}

