package sn.terangamatch.backeend.service;


import lombok.RequiredArgsConstructor;
import sn.terangamatch.backeend.model.Article;
import sn.terangamatch.backeend.repository.ArticleRepository;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Optional<Article> getArticleById(Long id) {
        return articleRepository.findById(id);
    }

    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }

    public List<Article> searchArticles(String query) {
        return articleRepository.findByTitleContainingIgnoreCaseOrExcerptContainingIgnoreCase(query, query);
    }

    public List<Article> getArticlesByCategory(String category) {
        return articleRepository.findByCategoryIgnoreCase(category);
    }

    public Article updateArticle(Article article) {
        return articleRepository.save(article);
    }
}
