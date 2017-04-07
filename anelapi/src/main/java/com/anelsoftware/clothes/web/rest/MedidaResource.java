package com.anelsoftware.clothes.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.anelsoftware.clothes.domain.Cliente;
import com.anelsoftware.clothes.domain.Medida;
import com.anelsoftware.clothes.repository.ClienteRepository;
import com.anelsoftware.clothes.repository.MedidaRepository;
import com.anelsoftware.clothes.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Medida.
 */
@RestController
@RequestMapping("/api")
public class MedidaResource {

    private final Logger log = LoggerFactory.getLogger(MedidaResource.class);

    private static final String ENTITY_NAME = "medida";
        
    private final MedidaRepository medidaRepository;
    private final ClienteRepository clienteRepository;

    public MedidaResource(MedidaRepository medidaRepository, ClienteRepository clienteRepository) {
        this.medidaRepository = medidaRepository;
        this.clienteRepository = clienteRepository;
    }

    /**
     * POST  /medidas : Create a new medida.
     *
     * @param medida the medida to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medida, or with status 400 (Bad Request) if the medida has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/medidas")
    @Timed
    public ResponseEntity<Medida> createMedida(@Valid @RequestBody Medida medida) throws URISyntaxException {
        log.debug("REST request to save Medida : {}", medida);
        if (medida.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new medida cannot already have an ID")).body(null);
        }
        Medida result = medidaRepository.save(medida);
        return ResponseEntity.created(new URI("/api/medidas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /medidas : Updates an existing medida.
     *
     * @param medida the medida to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medida,
     * or with status 400 (Bad Request) if the medida is not valid,
     * or with status 500 (Internal Server Error) if the medida couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/medidas")
    @Timed
    public ResponseEntity<Medida> updateMedida(@Valid @RequestBody Medida medida) throws URISyntaxException {
        log.debug("REST request to update Medida : {}", medida);
        if (medida.getId() == null) {
            return createMedida(medida);
        }
        Medida result = medidaRepository.save(medida);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medida.getId().toString()))
            .body(result);
    }

    /**
     * GET  /medidas : get all the medidas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of medidas in body
     */
    @GetMapping("/medidas")
    @Timed
    public List<Medida> getAllMedidas() {
        log.debug("REST request to get all Medidas");
        List<Medida> medidas = medidaRepository.findAll();
        return medidas;
    }
    
    /**
     * GET  /medidas : get all the medidas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of medidas in body
     */
    @GetMapping("/medidas/cliente/{id}")
    @Timed
    public List<Medida> getAllMedidasCliente(@PathVariable Long id) {
        log.debug("REST request to get all Medidas");
        Cliente cliente = clienteRepository.getOne(id);
        List<Medida> medidas = medidaRepository.findAllByCliente(cliente);
        return medidas;
    }

    /**
     * GET  /medidas/:id : get the "id" medida.
     *
     * @param id the id of the medida to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medida, or with status 404 (Not Found)
     */
    @GetMapping("/medidas/{id}")
    @Timed
    public ResponseEntity<Medida> getMedida(@PathVariable Long id) {
        log.debug("REST request to get Medida : {}", id);
        Medida medida = medidaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(medida));
    }

    /**
     * DELETE  /medidas/:id : delete the "id" medida.
     *
     * @param id the id of the medida to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/medidas/{id}")
    @Timed
    public ResponseEntity<Void> deleteMedida(@PathVariable Long id) {
        log.debug("REST request to delete Medida : {}", id);
        medidaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
