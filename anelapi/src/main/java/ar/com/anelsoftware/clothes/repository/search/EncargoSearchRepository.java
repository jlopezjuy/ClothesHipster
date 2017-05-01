package ar.com.anelsoftware.clothes.repository.search;

import ar.com.anelsoftware.clothes.domain.Encargo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Encargo entity.
 */
public interface EncargoSearchRepository extends ElasticsearchRepository<Encargo, Long> {
}
