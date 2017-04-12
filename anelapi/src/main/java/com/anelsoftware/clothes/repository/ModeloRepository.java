package com.anelsoftware.clothes.repository;

import com.anelsoftware.clothes.domain.Modelo;
import com.anelsoftware.clothes.domain.Cliente;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Modelo entity.
 */
@SuppressWarnings("unused")
public interface ModeloRepository extends JpaRepository<Modelo,Long> {
	/**
	 * Metodo para obtener todos los modelos por cliente
	 * @param pageable
	 * @param id
	 * @return
	 */
	List<Modelo> findAllByClienteId(Long id);
	
	/**
	 * Metodo para buscar un Cliente por el Id
	 * @param id
	 * @return
	 */
	Modelo findOneClienteById(Long id);

}
