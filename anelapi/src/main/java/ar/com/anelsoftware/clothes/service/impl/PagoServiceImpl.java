package ar.com.anelsoftware.clothes.service.impl;

import ar.com.anelsoftware.clothes.service.PagoService;
import ar.com.anelsoftware.clothes.domain.Pago;
import ar.com.anelsoftware.clothes.repository.PagoRepository;
import ar.com.anelsoftware.clothes.repository.search.PagoSearchRepository;
import ar.com.anelsoftware.clothes.service.dto.PagoDTO;
import ar.com.anelsoftware.clothes.service.mapper.PagoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Pago.
 */
@Service
@Transactional
public class PagoServiceImpl implements PagoService{

    private final Logger log = LoggerFactory.getLogger(PagoServiceImpl.class);
    
    private final PagoRepository pagoRepository;

    private final PagoMapper pagoMapper;

    private final PagoSearchRepository pagoSearchRepository;

    public PagoServiceImpl(PagoRepository pagoRepository, PagoMapper pagoMapper, PagoSearchRepository pagoSearchRepository) {
        this.pagoRepository = pagoRepository;
        this.pagoMapper = pagoMapper;
        this.pagoSearchRepository = pagoSearchRepository;
    }

    /**
     * Save a pago.
     *
     * @param pagoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PagoDTO save(PagoDTO pagoDTO) {
        log.debug("Request to save Pago : {}", pagoDTO);
        Pago pago = pagoMapper.pagoDTOToPago(pagoDTO);
        pago = pagoRepository.save(pago);
        PagoDTO result = pagoMapper.pagoToPagoDTO(pago);
        pagoSearchRepository.save(pago);
        return result;
    }

    /**
     *  Get all the pagos.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PagoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Pagos");
        Page<Pago> result = pagoRepository.findAll(pageable);
        return result.map(pago -> pagoMapper.pagoToPagoDTO(pago));
    }

    /**
     *  Get one pago by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PagoDTO findOne(Long id) {
        log.debug("Request to get Pago : {}", id);
        Pago pago = pagoRepository.findOne(id);
        PagoDTO pagoDTO = pagoMapper.pagoToPagoDTO(pago);
        return pagoDTO;
    }

    /**
     *  Delete the  pago by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pago : {}", id);
        pagoRepository.delete(id);
        pagoSearchRepository.delete(id);
    }

    /**
     * Search for the pago corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PagoDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Pagos for query {}", query);
        Page<Pago> result = pagoSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(pago -> pagoMapper.pagoToPagoDTO(pago));
    }
}
