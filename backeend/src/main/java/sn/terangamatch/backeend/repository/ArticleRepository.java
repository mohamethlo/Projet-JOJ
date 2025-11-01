package sn.terangamatch.backeend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.terangamatch.backeend.model.Article;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByCategoryIgnoreCase(String category);
    List<Article> findByTitleContainingIgnoreCaseOrExcerptContainingIgnoreCase(String title, String excerpt);
}
