package ar.com.anelsoftware.clothes.service;

import ar.com.anelsoftware.clothes.service.dto.MedidaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Medida.
 */
public interface MedidaService {

    /**
     * Save a medida.
     *
     * @param medidaDTO the entity to save
     * @return the persisted entity
     */
    MedidaDTO save(MedidaDTO medidaDTO);

    /**
     *  Get all the medidas.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<MedidaDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" medida.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    MedidaDTO findOne(Long id);

    /**
     *  Delete the "id" medida.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the medida corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<MedidaDTO> search(String query, Pageable pageable);
}
