package ar.com.anelsoftware.clothes.service.impl;

import ar.com.anelsoftware.clothes.service.ModeloService;
import ar.com.anelsoftware.clothes.domain.Modelo;
import ar.com.anelsoftware.clothes.repository.ModeloRepository;
import ar.com.anelsoftware.clothes.repository.search.ModeloSearchRepository;
import ar.com.anelsoftware.clothes.service.dto.ModeloDTO;
import ar.com.anelsoftware.clothes.service.mapper.ModeloMapper;
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
 * Service Implementation for managing Modelo.
 */
@Service
@Transactional
public class ModeloServiceImpl implements ModeloService{

    private final Logger log = LoggerFactory.getLogger(ModeloServiceImpl.class);
    
    private final ModeloRepository modeloRepository;

    private final ModeloMapper modeloMapper;

    private final ModeloSearchRepository modeloSearchRepository;

    public ModeloServiceImpl(ModeloRepository modeloRepository, ModeloMapper modeloMapper, ModeloSearchRepository modeloSearchRepository) {
        this.modeloRepository = modeloRepository;
        this.modeloMapper = modeloMapper;
        this.modeloSearchRepository = modeloSearchRepository;
    }

    /**
     * Save a modelo.
     *
     * @param modeloDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ModeloDTO save(ModeloDTO modeloDTO) {
        log.debug("Request to save Modelo : {}", modeloDTO);
        Modelo modelo = modeloMapper.modeloDTOToModelo(modeloDTO);
        modelo = modeloRepository.save(modelo);
        ModeloDTO result = modeloMapper.modeloToModeloDTO(modelo);
        modeloSearchRepository.save(modelo);
        return result;
    }

    /**
     *  Get all the modelos.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ModeloDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Modelos");
        Page<Modelo> result = modeloRepository.findAll(pageable);
        return result.map(modelo -> modeloMapper.modeloToModeloDTO(modelo));
    }

    /**
     *  Get one modelo by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ModeloDTO findOne(Long id) {
        log.debug("Request to get Modelo : {}", id);
        Modelo modelo = modeloRepository.findOne(id);
        ModeloDTO modeloDTO = modeloMapper.modeloToModeloDTO(modelo);
        return modeloDTO;
    }

    /**
     *  Delete the  modelo by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Modelo : {}", id);
        modeloRepository.delete(id);
        modeloSearchRepository.delete(id);
    }

    /**
     * Search for the modelo corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ModeloDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Modelos for query {}", query);
        Page<Modelo> result = modeloSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(modelo -> modeloMapper.modeloToModeloDTO(modelo));
    }
}
