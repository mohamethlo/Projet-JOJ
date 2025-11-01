package sn.terangamatch.backeend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // ✅ Permet d'accéder aux fichiers du dossier uploads/articles/
        registry.addResourceHandler("/uploads/articles/**")
                .addResourceLocations("file:uploads/articles/");
    }
}