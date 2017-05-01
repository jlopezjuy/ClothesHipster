package ar.com.anelsoftware.clothes.repository.search;

import ar.com.anelsoftware.clothes.domain.Modelo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Modelo entity.
 */
public interface ModeloSearchRepository extends ElasticsearchRepository<Modelo, Long> {
}
