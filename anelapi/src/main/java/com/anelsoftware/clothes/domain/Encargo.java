package com.anelsoftware.clothes.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.anelsoftware.clothes.domain.enumeration.Estado;

import com.anelsoftware.clothes.domain.enumeration.TipoEncargo;

/**
 * A Encargo.
 */
@Entity
@Table(name = "encargo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Encargo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "importe_total", nullable = false)
    private Double importeTotal;

    @NotNull
    @Column(name = "fecha_encargo", nullable = false)
    private LocalDate fechaEncargo;

    @Column(name = "fecha_entrega")
    private LocalDate fechaEntrega;

    @NotNull
    @Column(name = "detalle_vestido", nullable = false)
    private String detalleVestido;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private Estado estado;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_encargo")
    private TipoEncargo tipoEncargo;

    @OneToMany(mappedBy = "encargo")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Pago> pagos = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private Cliente cliente;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getImporteTotal() {
        return importeTotal;
    }

    public Encargo importeTotal(Double importeTotal) {
        this.importeTotal = importeTotal;
        return this;
    }

    public void setImporteTotal(Double importeTotal) {
        this.importeTotal = importeTotal;
    }

    public LocalDate getFechaEncargo() {
        return fechaEncargo;
    }

    public Encargo fechaEncargo(LocalDate fechaEncargo) {
        this.fechaEncargo = fechaEncargo;
        return this;
    }

    public void setFechaEncargo(LocalDate fechaEncargo) {
        this.fechaEncargo = fechaEncargo;
    }

    public LocalDate getFechaEntrega() {
        return fechaEntrega;
    }

    public Encargo fechaEntrega(LocalDate fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
        return this;
    }

    public void setFechaEntrega(LocalDate fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public String getDetalleVestido() {
        return detalleVestido;
    }

    public Encargo detalleVestido(String detalleVestido) {
        this.detalleVestido = detalleVestido;
        return this;
    }

    public void setDetalleVestido(String detalleVestido) {
        this.detalleVestido = detalleVestido;
    }

    public Estado getEstado() {
        return estado;
    }

    public Encargo estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public TipoEncargo getTipoEncargo() {
        return tipoEncargo;
    }

    public Encargo tipoEncargo(TipoEncargo tipoEncargo) {
        this.tipoEncargo = tipoEncargo;
        return this;
    }

    public void setTipoEncargo(TipoEncargo tipoEncargo) {
        this.tipoEncargo = tipoEncargo;
    }

    public Set<Pago> getPagos() {
        return pagos;
    }

    public Encargo pagos(Set<Pago> pagos) {
        this.pagos = pagos;
        return this;
    }

    public Encargo addPago(Pago pago) {
        this.pagos.add(pago);
        pago.setEncargo(this);
        return this;
    }

    public Encargo removePago(Pago pago) {
        this.pagos.remove(pago);
        pago.setEncargo(null);
        return this;
    }

    public void setPagos(Set<Pago> pagos) {
        this.pagos = pagos;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Encargo cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Encargo encargo = (Encargo) o;
        if (encargo.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, encargo.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Encargo{" +
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
