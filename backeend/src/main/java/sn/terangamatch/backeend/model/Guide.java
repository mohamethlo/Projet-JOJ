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
    private Long id; // même ID que User

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    @ElementCollection
    private List<String> specialties;

    private Double hourlyRate;
    private Double ratingAvg;
    private boolean verified;
}

