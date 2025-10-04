package sn.terangamatch.backeend.model;


import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "agences_voyage")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AgenceVoyage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String adresse;
    private String telephone;
    private String email;

    @OneToMany(mappedBy = "agenceVoyage")
    private List<Guide> guides;
}
