package ar.com.anelsoftware.clothes.service.impl;

import ar.com.anelsoftware.clothes.service.ClienteService;
import ar.com.anelsoftware.clothes.domain.Cliente;
import ar.com.anelsoftware.clothes.repository.ClienteRepository;
import ar.com.anelsoftware.clothes.repository.search.ClienteSearchRepository;
import ar.com.anelsoftware.clothes.service.dto.ClienteDTO;
import ar.com.anelsoftware.clothes.service.mapper.ClienteMapper;
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
 * Service Implementation for managing Cliente.
 */
@Service
@Transactional
public class ClienteServiceImpl implements ClienteService{

    private final Logger log = LoggerFactory.getLogger(ClienteServiceImpl.class);
    
    private final ClienteRepository clienteRepository;

    private final ClienteMapper clienteMapper;

    private final ClienteSearchRepository clienteSearchRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository, ClienteMapper clienteMapper, ClienteSearchRepository clienteSearchRepository) {
        this.clienteRepository = clienteRepository;
        this.clienteMapper = clienteMapper;
        this.clienteSearchRepository = clienteSearchRepository;
    }

    /**
     * Save a cliente.
     *
     * @param clienteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ClienteDTO save(ClienteDTO clienteDTO) {
        log.debug("Request to save Cliente : {}", clienteDTO);
        Cliente cliente = clienteMapper.clienteDTOToCliente(clienteDTO);
        cliente = clienteRepository.save(cliente);
        ClienteDTO result = clienteMapper.clienteToClienteDTO(cliente);
        clienteSearchRepository.save(cliente);
        return result;
    }

    /**
     *  Get all the clientes.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ClienteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Clientes");
        Page<Cliente> result = clienteRepository.findAll(pageable);
        return result.map(cliente -> clienteMapper.clienteToClienteDTO(cliente));
    }

    /**
     *  Get one cliente by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ClienteDTO findOne(Long id) {
        log.debug("Request to get Cliente : {}", id);
        Cliente cliente = clienteRepository.findOne(id);
        ClienteDTO clienteDTO = clienteMapper.clienteToClienteDTO(cliente);
        return clienteDTO;
    }

    /**
     *  Delete the  cliente by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cliente : {}", id);
        clienteRepository.delete(id);
        clienteSearchRepository.delete(id);
    }

    /**
     * Search for the cliente corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ClienteDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Clientes for query {}", query);
        Page<Cliente> result = clienteSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(cliente -> clienteMapper.clienteToClienteDTO(cliente));
    }
}
