package ar.com.anelsoftware.clothes.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ar.com.anelsoftware.clothes.domain.enumeration.Estado;
import ar.com.anelsoftware.clothes.domain.enumeration.TipoEncargo;

/**
 * A DTO for the Encargo entity.
 */
public class EncargoDTO implements Serializable {

    private Long id;

    @NotNull
    private Double importeTotal;

    @NotNull
    private LocalDate fechaEncargo;

    private LocalDate fechaEntrega;

    @NotNull
    private String detalleVestido;

    private Estado estado;

    private TipoEncargo tipoEncargo;

    private Long clienteId;

    private String clienteNombre;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Double getImporteTotal() {
        return importeTotal;
    }

    public void setImporteTotal(Double importeTotal) {
        this.importeTotal = importeTotal;
    }
    public LocalDate getFechaEncargo() {
        return fechaEncargo;
    }

    public void setFechaEncargo(LocalDate fechaEncargo) {
        this.fechaEncargo = fechaEncargo;
    }
    public LocalDate getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(LocalDate fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }
    public String getDetalleVestido() {
        return detalleVestido;
    }

    public void setDetalleVestido(String detalleVestido) {
        this.detalleVestido = detalleVestido;
    }
    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }
    public TipoEncargo getTipoEncargo() {
        return tipoEncargo;
    }

    public void setTipoEncargo(TipoEncargo tipoEncargo) {
        this.tipoEncargo = tipoEncargo;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public String getClienteNombre() {
        return clienteNombre;
    }

    public void setClienteNombre(String clienteNombre) {
        this.clienteNombre = clienteNombre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EncargoDTO encargoDTO = (EncargoDTO) o;

        if ( ! Objects.equals(id, encargoDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "EncargoDTO{" +
            "id=" + id +
            ", importeTotal='" + importeTotal + "'" +
            ", fechaEncargo='" + fechaEncargo + "'" +
            ", fechaEntrega='" + fechaEntrega + "'" +
            ", detalleVestido='" + detalleVestido + "'" +
            ", estado='" + estado + "'" +
            ", tipoEncargo='" + tipoEncargo + "'" +
            '}';
    }
}
