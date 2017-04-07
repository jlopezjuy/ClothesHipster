package com.anelsoftware.clothes.repository;

import com.anelsoftware.clothes.domain.Encargo;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Encargo entity.
 */
@SuppressWarnings("unused")
public interface EncargoRepository extends JpaRepository<Encargo,Long> {

}
