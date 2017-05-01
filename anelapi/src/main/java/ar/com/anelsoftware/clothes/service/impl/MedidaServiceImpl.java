package ar.com.anelsoftware.clothes.service.impl;

import ar.com.anelsoftware.clothes.service.MedidaService;
import ar.com.anelsoftware.clothes.domain.Medida;
import ar.com.anelsoftware.clothes.repository.MedidaRepository;
import ar.com.anelsoftware.clothes.repository.search.MedidaSearchRepository;
import ar.com.anelsoftware.clothes.service.dto.MedidaDTO;
import ar.com.anelsoftware.clothes.service.mapper.MedidaMapper;
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
 * Service Implementation for managing Medida.
 */
@Service
@Transactional
public class MedidaServiceImpl implements MedidaService{

    private final Logger log = LoggerFactory.getLogger(MedidaServiceImpl.class);
    
    private final MedidaRepository medidaRepository;

    private final MedidaMapper medidaMapper;

    private final MedidaSearchRepository medidaSearchRepository;

    public MedidaServiceImpl(MedidaRepository medidaRepository, MedidaMapper medidaMapper, MedidaSearchRepository medidaSearchRepository) {
        this.medidaRepository = medidaRepository;
        this.medidaMapper = medidaMapper;
        this.medidaSearchRepository = medidaSearchRepository;
    }

    /**
     * Save a medida.
     *
     * @param medidaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MedidaDTO save(MedidaDTO medidaDTO) {
        log.debug("Request to save Medida : {}", medidaDTO);
        Medida medida = medidaMapper.medidaDTOToMedida(medidaDTO);
        medida = medidaRepository.save(medida);
        MedidaDTO result = medidaMapper.medidaToMedidaDTO(medida);
        medidaSearchRepository.save(medida);
        return result;
    }

    /**
     *  Get all the medidas.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MedidaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Medidas");
        Page<Medida> result = medidaRepository.findAll(pageable);
        return result.map(medida -> medidaMapper.medidaToMedidaDTO(medida));
    }

    /**
     *  Get one medida by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MedidaDTO findOne(Long id) {
        log.debug("Request to get Medida : {}", id);
        Medida medida = medidaRepository.findOne(id);
        MedidaDTO medidaDTO = medidaMapper.medidaToMedidaDTO(medida);
        return medidaDTO;
    }

    /**
     *  Delete the  medida by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Medida : {}", id);
        medidaRepository.delete(id);
        medidaSearchRepository.delete(id);
    }

    /**
     * Search for the medida corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MedidaDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Medidas for query {}", query);
        Page<Medida> result = medidaSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(medida -> medidaMapper.medidaToMedidaDTO(medida));
    }
}
