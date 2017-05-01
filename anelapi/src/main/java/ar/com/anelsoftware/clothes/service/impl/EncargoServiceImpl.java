package ar.com.anelsoftware.clothes.service.impl;

import ar.com.anelsoftware.clothes.service.EncargoService;
import ar.com.anelsoftware.clothes.domain.Encargo;
import ar.com.anelsoftware.clothes.repository.EncargoRepository;
import ar.com.anelsoftware.clothes.repository.search.EncargoSearchRepository;
import ar.com.anelsoftware.clothes.service.dto.EncargoDTO;
import ar.com.anelsoftware.clothes.service.mapper.EncargoMapper;
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
 * Service Implementation for managing Encargo.
 */
@Service
@Transactional
public class EncargoServiceImpl implements EncargoService{

    private final Logger log = LoggerFactory.getLogger(EncargoServiceImpl.class);
    
    private final EncargoRepository encargoRepository;

    private final EncargoMapper encargoMapper;

    private final EncargoSearchRepository encargoSearchRepository;

    public EncargoServiceImpl(EncargoRepository encargoRepository, EncargoMapper encargoMapper, EncargoSearchRepository encargoSearchRepository) {
        this.encargoRepository = encargoRepository;
        this.encargoMapper = encargoMapper;
        this.encargoSearchRepository = encargoSearchRepository;
    }

    /**
     * Save a encargo.
     *
     * @param encargoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EncargoDTO save(EncargoDTO encargoDTO) {
        log.debug("Request to save Encargo : {}", encargoDTO);
        Encargo encargo = encargoMapper.encargoDTOToEncargo(encargoDTO);
        encargo = encargoRepository.save(encargo);
        EncargoDTO result = encargoMapper.encargoToEncargoDTO(encargo);
        encargoSearchRepository.save(encargo);
        return result;
    }

    /**
     *  Get all the encargos.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EncargoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Encargos");
        Page<Encargo> result = encargoRepository.findAll(pageable);
        return result.map(encargo -> encargoMapper.encargoToEncargoDTO(encargo));
    }

    /**
     *  Get one encargo by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EncargoDTO findOne(Long id) {
        log.debug("Request to get Encargo : {}", id);
        Encargo encargo = encargoRepository.findOne(id);
        EncargoDTO encargoDTO = encargoMapper.encargoToEncargoDTO(encargo);
        return encargoDTO;
    }

    /**
     *  Delete the  encargo by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Encargo : {}", id);
        encargoRepository.delete(id);
        encargoSearchRepository.delete(id);
    }

    /**
     * Search for the encargo corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EncargoDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Encargos for query {}", query);
        Page<Encargo> result = encargoSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(encargo -> encargoMapper.encargoToEncargoDTO(encargo));
    }
}
