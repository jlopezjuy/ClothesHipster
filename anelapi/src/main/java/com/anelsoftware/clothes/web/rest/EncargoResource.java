package com.anelsoftware.clothes.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.anelsoftware.clothes.domain.Encargo;

import com.anelsoftware.clothes.repository.EncargoRepository;
import com.anelsoftware.clothes.web.rest.util.HeaderUtil;
import com.anelsoftware.clothes.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Encargo.
 */
@RestController
@RequestMapping("/api")
public class EncargoResource {

    private final Logger log = LoggerFactory.getLogger(EncargoResource.class);

    private static final String ENTITY_NAME = "encargo";
        
    private final EncargoRepository encargoRepository;

    public EncargoResource(EncargoRepository encargoRepository) {
        this.encargoRepository = encargoRepository;
    }

    /**
     * POST  /encargos : Create a new encargo.
     *
     * @param encargo the encargo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new encargo, or with status 400 (Bad Request) if the encargo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/encargos")
    @Timed
    public ResponseEntity<Encargo> createEncargo(@Valid @RequestBody Encargo encargo) throws URISyntaxException {
        log.debug("REST request to save Encargo : {}", encargo);
        if (encargo.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new encargo cannot already have an ID")).body(null);
        }
        Encargo result = encargoRepository.save(encargo);
        return ResponseEntity.created(new URI("/api/encargos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /encargos : Updates an existing encargo.
     *
     * @param encargo the encargo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated encargo,
     * or with status 400 (Bad Request) if the encargo is not valid,
     * or with status 500 (Internal Server Error) if the encargo couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/encargos")
    @Timed
    public ResponseEntity<Encargo> updateEncargo(@Valid @RequestBody Encargo encargo) throws URISyntaxException {
        log.debug("REST request to update Encargo : {}", encargo);
        if (encargo.getId() == null) {
            return createEncargo(encargo);
        }
        Encargo result = encargoRepository.save(encargo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, encargo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /encargos : get all the encargos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of encargos in body
     */
    @GetMapping("/encargos")
    @Timed
    public ResponseEntity<List<Encargo>> getAllEncargos(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Encargos");
        Page<Encargo> page = encargoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/encargos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /encargos/:id : get the "id" encargo.
     *
     * @param id the id of the encargo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the encargo, or with status 404 (Not Found)
     */
    @GetMapping("/encargos/{id}")
    @Timed
    public ResponseEntity<Encargo> getEncargo(@PathVariable Long id) {
        log.debug("REST request to get Encargo : {}", id);
        Encargo encargo = encargoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(encargo));
    }

    /**
     * DELETE  /encargos/:id : delete the "id" encargo.
     *
     * @param id the id of the encargo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/encargos/{id}")
    @Timed
    public ResponseEntity<Void> deleteEncargo(@PathVariable Long id) {
        log.debug("REST request to delete Encargo : {}", id);
        encargoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
