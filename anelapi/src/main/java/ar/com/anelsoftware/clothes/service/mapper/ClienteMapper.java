package ar.com.anelsoftware.clothes.service.mapper;

import ar.com.anelsoftware.clothes.domain.*;
import ar.com.anelsoftware.clothes.service.dto.ClienteDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Cliente and its DTO ClienteDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ClienteMapper {

    ClienteDTO clienteToClienteDTO(Cliente cliente);

    List<ClienteDTO> clientesToClienteDTOs(List<Cliente> clientes);

    @Mapping(target = "modelos", ignore = true)
    @Mapping(target = "medidas", ignore = true)
    @Mapping(target = "encargos", ignore = true)
    Cliente clienteDTOToCliente(ClienteDTO clienteDTO);

    List<Cliente> clienteDTOsToClientes(List<ClienteDTO> clienteDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Cliente clienteFromId(Long id) {
        if (id == null) {
            return null;
        }
        Cliente cliente = new Cliente();
        cliente.setId(id);
        return cliente;
    }
    

}
