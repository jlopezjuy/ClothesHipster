package ar.com.anelsoftware.clothes.repository;

import ar.com.anelsoftware.clothes.domain.Medida;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Medida entity.
 */
@SuppressWarnings("unused")
public interface MedidaRepository extends JpaRepository<Medida,Long> {

}
