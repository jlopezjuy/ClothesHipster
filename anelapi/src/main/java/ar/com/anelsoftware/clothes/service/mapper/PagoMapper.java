package ar.com.anelsoftware.clothes.service.mapper;

import ar.com.anelsoftware.clothes.domain.*;
import ar.com.anelsoftware.clothes.service.dto.PagoDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Pago and its DTO PagoDTO.
 */
@Mapper(componentModel = "spring", uses = {EncargoMapper.class, })
public interface PagoMapper {

    @Mapping(source = "encargo.id", target = "encargoId")
    PagoDTO pagoToPagoDTO(Pago pago);

    List<PagoDTO> pagosToPagoDTOs(List<Pago> pagos);

    @Mapping(source = "encargoId", target = "encargo")
    Pago pagoDTOToPago(PagoDTO pagoDTO);

    List<Pago> pagoDTOsToPagos(List<PagoDTO> pagoDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Pago pagoFromId(Long id) {
        if (id == null) {
            return null;
        }
        Pago pago = new Pago();
        pago.setId(id);
        return pago;
    }
    

}
