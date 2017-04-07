package com.anelsoftware.clothes.web.rest;

import com.anelsoftware.clothes.AnelclothesApp;

import com.anelsoftware.clothes.domain.Modelo;
import com.anelsoftware.clothes.domain.Cliente;
import com.anelsoftware.clothes.repository.ModeloRepository;
import com.anelsoftware.clothes.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ModeloResource REST controller.
 *
 * @see ModeloResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AnelclothesApp.class)
public class ModeloResourceIntTest {

    private static final byte[] DEFAULT_IMAGEN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_IMAGEN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_NOMBRE_MODELO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_MODELO = "BBBBBBBBBB";

    private static final String DEFAULT_COLOR_VESTIDO = "AAAAAAAAAA";
    private static final String UPDATED_COLOR_VESTIDO = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACION = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACION = "BBBBBBBBBB";

    @Autowired
    private ModeloRepository modeloRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restModeloMockMvc;

    private Modelo modelo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ModeloResource modeloResource = new ModeloResource(modeloRepository);
        this.restModeloMockMvc = MockMvcBuilders.standaloneSetup(modeloResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Modelo createEntity(EntityManager em) {
        Modelo modelo = new Modelo()
            .imagen(DEFAULT_IMAGEN)
            .imagenContentType(DEFAULT_IMAGEN_CONTENT_TYPE)
            .nombreModelo(DEFAULT_NOMBRE_MODELO)
            .colorVestido(DEFAULT_COLOR_VESTIDO)
            .observacion(DEFAULT_OBSERVACION);
        // Add required entity
        Cliente cliente = ClienteResourceIntTest.createEntity(em);
        em.persist(cliente);
        em.flush();
        modelo.setCliente(cliente);
        return modelo;
    }

    @Before
    public void initTest() {
        modelo = createEntity(em);
    }

    @Test
    @Transactional
    public void createModelo() throws Exception {
        int databaseSizeBeforeCreate = modeloRepository.findAll().size();

        // Create the Modelo
        restModeloMockMvc.perform(post("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isCreated());

        // Validate the Modelo in the database
        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeCreate + 1);
        Modelo testModelo = modeloList.get(modeloList.size() - 1);
        assertThat(testModelo.getImagen()).isEqualTo(DEFAULT_IMAGEN);
        assertThat(testModelo.getImagenContentType()).isEqualTo(DEFAULT_IMAGEN_CONTENT_TYPE);
        assertThat(testModelo.getNombreModelo()).isEqualTo(DEFAULT_NOMBRE_MODELO);
        assertThat(testModelo.getColorVestido()).isEqualTo(DEFAULT_COLOR_VESTIDO);
        assertThat(testModelo.getObservacion()).isEqualTo(DEFAULT_OBSERVACION);
    }

    @Test
    @Transactional
    public void createModeloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = modeloRepository.findAll().size();

        // Create the Modelo with an existing ID
        modelo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModeloMockMvc.perform(post("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkImagenIsRequired() throws Exception {
        int databaseSizeBeforeTest = modeloRepository.findAll().size();
        // set the field null
        modelo.setImagen(null);

        // Create the Modelo, which fails.

        restModeloMockMvc.perform(post("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isBadRequest());

        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreModeloIsRequired() throws Exception {
        int databaseSizeBeforeTest = modeloRepository.findAll().size();
        // set the field null
        modelo.setNombreModelo(null);

        // Create the Modelo, which fails.

        restModeloMockMvc.perform(post("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isBadRequest());

        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkColorVestidoIsRequired() throws Exception {
        int databaseSizeBeforeTest = modeloRepository.findAll().size();
        // set the field null
        modelo.setColorVestido(null);

        // Create the Modelo, which fails.

        restModeloMockMvc.perform(post("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isBadRequest());

        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkObservacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = modeloRepository.findAll().size();
        // set the field null
        modelo.setObservacion(null);

        // Create the Modelo, which fails.

        restModeloMockMvc.perform(post("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isBadRequest());

        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllModelos() throws Exception {
        // Initialize the database
        modeloRepository.saveAndFlush(modelo);

        // Get all the modeloList
        restModeloMockMvc.perform(get("/api/modelos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modelo.getId().intValue())))
            .andExpect(jsonPath("$.[*].imagenContentType").value(hasItem(DEFAULT_IMAGEN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN))))
            .andExpect(jsonPath("$.[*].nombreModelo").value(hasItem(DEFAULT_NOMBRE_MODELO.toString())))
            .andExpect(jsonPath("$.[*].colorVestido").value(hasItem(DEFAULT_COLOR_VESTIDO.toString())))
            .andExpect(jsonPath("$.[*].observacion").value(hasItem(DEFAULT_OBSERVACION.toString())));
    }

    @Test
    @Transactional
    public void getModelo() throws Exception {
        // Initialize the database
        modeloRepository.saveAndFlush(modelo);

        // Get the modelo
        restModeloMockMvc.perform(get("/api/modelos/{id}", modelo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(modelo.getId().intValue()))
            .andExpect(jsonPath("$.imagenContentType").value(DEFAULT_IMAGEN_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen").value(Base64Utils.encodeToString(DEFAULT_IMAGEN)))
            .andExpect(jsonPath("$.nombreModelo").value(DEFAULT_NOMBRE_MODELO.toString()))
            .andExpect(jsonPath("$.colorVestido").value(DEFAULT_COLOR_VESTIDO.toString()))
            .andExpect(jsonPath("$.observacion").value(DEFAULT_OBSERVACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingModelo() throws Exception {
        // Get the modelo
        restModeloMockMvc.perform(get("/api/modelos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModelo() throws Exception {
        // Initialize the database
        modeloRepository.saveAndFlush(modelo);
        int databaseSizeBeforeUpdate = modeloRepository.findAll().size();

        // Update the modelo
        Modelo updatedModelo = modeloRepository.findOne(modelo.getId());
        updatedModelo
            .imagen(UPDATED_IMAGEN)
            .imagenContentType(UPDATED_IMAGEN_CONTENT_TYPE)
            .nombreModelo(UPDATED_NOMBRE_MODELO)
            .colorVestido(UPDATED_COLOR_VESTIDO)
            .observacion(UPDATED_OBSERVACION);

        restModeloMockMvc.perform(put("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedModelo)))
            .andExpect(status().isOk());

        // Validate the Modelo in the database
        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeUpdate);
        Modelo testModelo = modeloList.get(modeloList.size() - 1);
        assertThat(testModelo.getImagen()).isEqualTo(UPDATED_IMAGEN);
        assertThat(testModelo.getImagenContentType()).isEqualTo(UPDATED_IMAGEN_CONTENT_TYPE);
        assertThat(testModelo.getNombreModelo()).isEqualTo(UPDATED_NOMBRE_MODELO);
        assertThat(testModelo.getColorVestido()).isEqualTo(UPDATED_COLOR_VESTIDO);
        assertThat(testModelo.getObservacion()).isEqualTo(UPDATED_OBSERVACION);
    }

    @Test
    @Transactional
    public void updateNonExistingModelo() throws Exception {
        int databaseSizeBeforeUpdate = modeloRepository.findAll().size();

        // Create the Modelo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restModeloMockMvc.perform(put("/api/modelos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modelo)))
            .andExpect(status().isCreated());

        // Validate the Modelo in the database
        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteModelo() throws Exception {
        // Initialize the database
        modeloRepository.saveAndFlush(modelo);
        int databaseSizeBeforeDelete = modeloRepository.findAll().size();

        // Get the modelo
        restModeloMockMvc.perform(delete("/api/modelos/{id}", modelo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Modelo> modeloList = modeloRepository.findAll();
        assertThat(modeloList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Modelo.class);
    }
}
