package sn.terangamatch.backeend.controller;


import lombok.RequiredArgsConstructor;
import sn.terangamatch.backeend.model.Article;
import sn.terangamatch.backeend.service.ArticleService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "http://localhost:5173") // ou ton domaine React
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category) {

        if (search != null && !search.isEmpty()) {
            return ResponseEntity.ok(articleService.searchArticles(search));
        } else if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(articleService.getArticlesByCategory(category));
        }
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        return articleService.getArticleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Article> createArticle(
            @RequestParam("title") String title,
            @RequestParam("excerpt") String excerpt,
            @RequestParam("content") String content,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam(value = "readTime", required = false) String readTime,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            // Sauvegarde l'image si elle existe
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                String uploadDir = "uploads/articles/";
                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Path filePath = uploadPath.resolve(fileName);
                Files.write(filePath, image.getBytes());
                imageUrl = "/uploads/articles/" + fileName;
            }

            // Crée l’article
            Article article = new Article();
            article.setTitle(title);
            article.setExcerpt(excerpt);
            article.setContent(content);
            article.setAuthor(author);
            article.setCategory(category);
            article.setReadTime(readTime != null ? readTime : "3 min");
            article.setImage(imageUrl);

            Article savedArticle = articleService.createArticle(article);
            return ResponseEntity.ok(savedArticle);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Article> updateArticle(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("excerpt") String excerpt,
            @RequestParam("content") String content,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam(value = "readTime", required = false) String readTime,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            Optional<Article> existingArticle = articleService.getArticleById(id);
            if (existingArticle.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Article article = existingArticle.get();
            
            // Mise à jour des champs
            article.setTitle(title);
            article.setExcerpt(excerpt);
            article.setContent(content);
            article.setAuthor(author);
            article.setCategory(category);
            article.setReadTime(readTime != null ? readTime : article.getReadTime());

            // Mise à jour de l'image si une nouvelle est fournie
            if (image != null && !image.isEmpty()) {
                String uploadDir = "uploads/articles/";
                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Path filePath = uploadPath.resolve(fileName);
                Files.write(filePath, image.getBytes());
                article.setImage("/uploads/articles/" + fileName);
            }

            Article updatedArticle = articleService.updateArticle(article);
            return ResponseEntity.ok(updatedArticle);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}
