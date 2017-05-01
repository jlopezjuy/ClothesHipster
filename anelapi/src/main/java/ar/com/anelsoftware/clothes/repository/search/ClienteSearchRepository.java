package ar.com.anelsoftware.clothes.repository.search;

import ar.com.anelsoftware.clothes.domain.Cliente;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Cliente entity.
 */
public interface ClienteSearchRepository extends ElasticsearchRepository<Cliente, Long> {
}
