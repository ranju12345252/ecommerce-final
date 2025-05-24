package com.auth.repository;

import com.auth.model.OrderItem;
import com.auth.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // Check if product exists in any order items
    boolean existsByProduct(Product product);

    // Find all order items for a specific product
    List<OrderItem> findByProduct(Product product);

    // Custom query to delete order items by product
    @Query("DELETE FROM OrderItem oi WHERE oi.product = :product")
    void deleteByProduct(@Param("product") Product product);

    // Find order items with product and order details
    @Query("SELECT oi FROM OrderItem oi " +
            "JOIN FETCH oi.product " +
            "JOIN FETCH oi.order " +
            "WHERE oi.product = :product")
    List<OrderItem> findOrderItemsWithDetailsByProduct(@Param("product") Product product);
}