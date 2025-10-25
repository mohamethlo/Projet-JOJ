package sn.terangamatch.backeend.model;

import lombok.*;
import jakarta.persistence.Embeddable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class LiveData {
    private String homeTeam;
    private String awayTeam;
    private String score;
}
