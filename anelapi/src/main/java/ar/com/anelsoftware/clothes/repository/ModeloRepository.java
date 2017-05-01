package ar.com.anelsoftware.clothes.repository;

import ar.com.anelsoftware.clothes.domain.Modelo;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Modelo entity.
 */
@SuppressWarnings("unused")
public interface ModeloRepository extends JpaRepository<Modelo,Long> {

}
