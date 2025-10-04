package sn.terangamatch.backeend.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "guides")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guide {

    @Id
    private Long id; 

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    @ElementCollection
    private List<String> specialties;

    private Double hourlyRate;
    private Double ratingAvg;
    private boolean verified;

    // 🔹 Lien vers l'agence de voyage
    @ManyToOne
    @JoinColumn(name = "agence_voyage_id")
    private AgenceVoyage agenceVoyage;
}

