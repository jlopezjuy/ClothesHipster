package ar.com.anelsoftware.clothes.repository.search;

import ar.com.anelsoftware.clothes.domain.Medida;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Medida entity.
 */
public interface MedidaSearchRepository extends ElasticsearchRepository<Medida, Long> {
}
