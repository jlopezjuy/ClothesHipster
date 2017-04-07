package com.anelsoftware.clothes.repository;

import com.anelsoftware.clothes.domain.Modelo;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Modelo entity.
 */
@SuppressWarnings("unused")
public interface ModeloRepository extends JpaRepository<Modelo,Long> {

}
