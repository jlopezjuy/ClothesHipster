package ar.com.anelsoftware.clothes.repository.search;

import ar.com.anelsoftware.clothes.domain.Pago;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Pago entity.
 */
public interface PagoSearchRepository extends ElasticsearchRepository<Pago, Long> {
}
