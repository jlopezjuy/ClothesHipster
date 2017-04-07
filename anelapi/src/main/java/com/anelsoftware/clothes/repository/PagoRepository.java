package com.anelsoftware.clothes.repository;

import com.anelsoftware.clothes.domain.Pago;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Pago entity.
 */
@SuppressWarnings("unused")
public interface PagoRepository extends JpaRepository<Pago,Long> {

}
