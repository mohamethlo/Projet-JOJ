package sn.terangamatch.backeend.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private Double price;

    @ManyToOne
    @JoinColumn(name = "visitor_id")
    private User visitor;

    @ManyToOne
    @JoinColumn(name = "guide_id")
    private Guide guide;
}
