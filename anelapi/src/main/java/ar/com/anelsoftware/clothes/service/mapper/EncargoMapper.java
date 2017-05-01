package ar.com.anelsoftware.clothes.service.mapper;

import ar.com.anelsoftware.clothes.domain.*;
import ar.com.anelsoftware.clothes.service.dto.EncargoDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Encargo and its DTO EncargoDTO.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class, })
public interface EncargoMapper {

    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "cliente.nombre", target = "clienteNombre")
    EncargoDTO encargoToEncargoDTO(Encargo encargo);

    List<EncargoDTO> encargosToEncargoDTOs(List<Encargo> encargos);

    @Mapping(target = "pagos", ignore = true)
    @Mapping(source = "clienteId", target = "cliente")
    Encargo encargoDTOToEncargo(EncargoDTO encargoDTO);

    List<Encargo> encargoDTOsToEncargos(List<EncargoDTO> encargoDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Encargo encargoFromId(Long id) {
        if (id == null) {
            return null;
        }
        Encargo encargo = new Encargo();
        encargo.setId(id);
        return encargo;
    }
    

}
