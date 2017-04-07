package com.anelsoftware.clothes.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.anelsoftware.clothes.domain.Modelo;

import com.anelsoftware.clothes.repository.ModeloRepository;
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
 * REST controller for managing Modelo.
 */
@RestController
@RequestMapping("/api")
public class ModeloResource {

    private final Logger log = LoggerFactory.getLogger(ModeloResource.class);

    private static final String ENTITY_NAME = "modelo";
        
    private final ModeloRepository modeloRepository;

    public ModeloResource(ModeloRepository modeloRepository) {
        this.modeloRepository = modeloRepository;
    }

    /**
     * POST  /modelos : Create a new modelo.
     *
     * @param modelo the modelo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new modelo, or with status 400 (Bad Request) if the modelo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/modelos")
    @Timed
    public ResponseEntity<Modelo> createModelo(@Valid @RequestBody Modelo modelo) throws URISyntaxException {
        log.debug("REST request to save Modelo : {}", modelo);
        if (modelo.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new modelo cannot already have an ID")).body(null);
        }
        Modelo result = modeloRepository.save(modelo);
        return ResponseEntity.created(new URI("/api/modelos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /modelos : Updates an existing modelo.
     *
     * @param modelo the modelo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated modelo,
     * or with status 400 (Bad Request) if the modelo is not valid,
     * or with status 500 (Internal Server Error) if the modelo couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/modelos")
    @Timed
    public ResponseEntity<Modelo> updateModelo(@Valid @RequestBody Modelo modelo) throws URISyntaxException {
        log.debug("REST request to update Modelo : {}", modelo);
        if (modelo.getId() == null) {
            return createModelo(modelo);
        }
        Modelo result = modeloRepository.save(modelo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, modelo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /modelos : get all the modelos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of modelos in body
     */
    @GetMapping("/modelos")
    @Timed
    public ResponseEntity<List<Modelo>> getAllModelos(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Modelos");
        Page<Modelo> page = modeloRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/modelos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /modelos/:id : get the "id" modelo.
     *
     * @param id the id of the modelo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the modelo, or with status 404 (Not Found)
     */
    @GetMapping("/modelos/{id}")
    @Timed
    public ResponseEntity<Modelo> getModelo(@PathVariable Long id) {
        log.debug("REST request to get Modelo : {}", id);
        Modelo modelo = modeloRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(modelo));
    }

    /**
     * DELETE  /modelos/:id : delete the "id" modelo.
     *
     * @param id the id of the modelo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/modelos/{id}")
    @Timed
    public ResponseEntity<Void> deleteModelo(@PathVariable Long id) {
        log.debug("REST request to delete Modelo : {}", id);
        modeloRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
