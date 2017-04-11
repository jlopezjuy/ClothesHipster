package com.anelsoftware.clothes.repository;

import com.anelsoftware.clothes.domain.Cliente;
import com.anelsoftware.clothes.domain.Medida;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Medida entity.
 */
@SuppressWarnings("unused")
public interface MedidaRepository extends JpaRepository<Medida,Long> {
	
	/**
	 * Metodo para obtener las medidas por cliente seleccionado
	 * @param cliente
	 * @return
	 */
	List<Medida> findAllByCliente(Cliente cliente);
	
	/**
	 * Metodo para obtener las medidas por id de cliente seleccionado
	 * @param cliente
	 * @return
	 */
	List<Medida> findAllByClienteId(Long id);

}
