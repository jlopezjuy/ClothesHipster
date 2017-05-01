package ar.com.anelsoftware.clothes.service.mapper;

import ar.com.anelsoftware.clothes.domain.*;
import ar.com.anelsoftware.clothes.service.dto.MedidaDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Medida and its DTO MedidaDTO.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class, })
public interface MedidaMapper {

    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "cliente.nombre", target = "clienteNombre")
    MedidaDTO medidaToMedidaDTO(Medida medida);

    List<MedidaDTO> medidasToMedidaDTOs(List<Medida> medidas);

    @Mapping(source = "clienteId", target = "cliente")
    Medida medidaDTOToMedida(MedidaDTO medidaDTO);

    List<Medida> medidaDTOsToMedidas(List<MedidaDTO> medidaDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Medida medidaFromId(Long id) {
        if (id == null) {
            return null;
        }
        Medida medida = new Medida();
        medida.setId(id);
        return medida;
    }
    

}
