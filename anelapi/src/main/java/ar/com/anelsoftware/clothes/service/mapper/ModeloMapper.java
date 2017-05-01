package ar.com.anelsoftware.clothes.service.mapper;

import ar.com.anelsoftware.clothes.domain.*;
import ar.com.anelsoftware.clothes.service.dto.ModeloDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Modelo and its DTO ModeloDTO.
 */
@Mapper(componentModel = "spring", uses = {ClienteMapper.class, })
public interface ModeloMapper {

    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "cliente.nombre", target = "clienteNombre")
    ModeloDTO modeloToModeloDTO(Modelo modelo);

    List<ModeloDTO> modelosToModeloDTOs(List<Modelo> modelos);

    @Mapping(source = "clienteId", target = "cliente")
    Modelo modeloDTOToModelo(ModeloDTO modeloDTO);

    List<Modelo> modeloDTOsToModelos(List<ModeloDTO> modeloDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Modelo modeloFromId(Long id) {
        if (id == null) {
            return null;
        }
        Modelo modelo = new Modelo();
        modelo.setId(id);
        return modelo;
    }
    

}
