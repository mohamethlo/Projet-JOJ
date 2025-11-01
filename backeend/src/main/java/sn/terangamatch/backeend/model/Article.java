package sn.terangamatch.backeend.model;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "articles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String excerpt; // résumé

    @Column(columnDefinition = "TEXT")
    private String content;

    private String image;

    private String author;

    private String category; // Histoire, Culture, Art, etc.

    private String readTime; // "5 min", "10 min"

    private boolean featured; // si on veut afficher dans un carrousel ou à la une

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
