package com.auth.repository;

import com.auth.model.Product;
import org.hibernate.annotations.Where;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {


//    @Query("SELECT DISTINCT p FROM Product p " +
//            "LEFT JOIN FETCH p.artisan a " +  // Add alias for artisan
//            "LEFT JOIN FETCH p.images")
//    @Where(clause = "active = true")
//    List<Product> findAllWithArtisanAndImages();
//
//    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.images WHERE p.artisan.id = :artisanId")
//    @Transactional(readOnly = true)
//    @Where(clause = "active = true")
//    List<Product> findByArtisanId(@Param("artisanId") Long artisanId);

    @EntityGraph(attributePaths = "images")
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.images WHERE p.id = :id")
    Optional<Product> findByIdWithImages(@Param("id") Long id);

    @NotNull
    @EntityGraph("Product.images")
    Optional<Product> findById(@NotNull Long id);


    @Query("SELECT COUNT(p) FROM Product p WHERE p.artisan.id = :artisanId")
    Long countByArtisanId(@Param("artisanId") Long artisanId);



    @Query("SELECT COUNT(p) FROM Product p WHERE p.artisan.id = :artisanId AND p.stock > 0")
    Long countActiveByArtisanId(@Param("artisanId") Long artisanId);

    // Add @Where annotation to filter active products


    // For admin/order history access to all products
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.images WHERE p.id = :id")
    Optional<Product> findByIdWithImagesIncludingInactive(@Param("id") Long id);

    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.artisan a LEFT JOIN FETCH p.images WHERE p.active = true")
    List<Product> findAllWithArtisanAndImages();

    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.images WHERE p.artisan.id = :artisanId AND p.active = true")
    List<Product> findByArtisanId(@Param("artisanId") Long artisanId);
}
