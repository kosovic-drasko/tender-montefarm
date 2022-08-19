package tender.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Prvorangirani.
 */
@Entity
@Table(name = "view_prvorangirani")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Prvorangirani implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "sifra_postupka")
    private Integer sifraPostupka;

    @Column(name = "sifra_ponude")
    private Integer sifraPonude;

    @Column(name = "broj_partije")
    private Integer brojPartije;

    @Column(name = "atc")
    private String atc;

    @Column(name = "zasticeni_naziv")
    private String zasticeniNaziv;

    @Column(name = "trazena_kolicina")
    private Integer trazenaKolicina;

    @Column(name = "procijenjena_vrijednost")
    private Double procijenjenaVrijednost;

    @Column(name = "ponudjena_vrijednost")
    private Double ponudjenaVrijednost;

    @Column(name = "rok_isporuke")
    private Integer rokIsporuke;

    @Column(name = "sifra_ponudjaca")
    private String sifraPonudjaca;

    @Column(name = "naziv_ponudjaca")
    private String nazivPonudjaca;

    @Column(name = "naziv_proizvodjaca")
    private String nazivProizvodjaca;

    public void setSifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
    }

    public void setSifraPonude(Integer sifraPonude) {
        this.sifraPonude = sifraPonude;
    }

    public void setBrojPartije(Integer brojPartije) {
        this.brojPartije = brojPartije;
    }

    public void setAtc(String atc) {
        this.atc = atc;
    }

    public void setZasticeniNaziv(String zasticeniNaziv) {
        this.zasticeniNaziv = zasticeniNaziv;
    }

    public void setTrazenaKolicina(Integer trazenaKolicina) {
        this.trazenaKolicina = trazenaKolicina;
    }

    public void setProcijenjenaVrijednost(Double procijenjenaVrijednost) {
        this.procijenjenaVrijednost = procijenjenaVrijednost;
    }

    public void setPonudjenaVrijednost(Double ponudjenaVrijednost) {
        this.ponudjenaVrijednost = ponudjenaVrijednost;
    }

    public void setRokIsporuke(Integer rokIsporuke) {
        this.rokIsporuke = rokIsporuke;
    }

    public void setSifraPonudjaca(String sifraPonudjaca) {
        this.sifraPonudjaca = sifraPonudjaca;
    }

    public void setNazivPonudjaca(String nazivPonudjaca) {
        this.nazivPonudjaca = nazivPonudjaca;
    }

    public void setNazivProizvodjaca(String nazivProizvodjaca) {
        this.nazivProizvodjaca = nazivProizvodjaca;
    }

    public Long getId() {
        return id;
    }

    public Integer getSifraPostupka() {
        return sifraPostupka;
    }

    public Integer getSifraPonude() {
        return sifraPonude;
    }

    public Integer getBrojPartije() {
        return brojPartije;
    }

    public String getAtc() {
        return atc;
    }

    public String getZasticeniNaziv() {
        return zasticeniNaziv;
    }

    public Integer getTrazenaKolicina() {
        return trazenaKolicina;
    }

    public Double getProcijenjenaVrijednost() {
        return procijenjenaVrijednost;
    }

    public Double getPonudjenaVrijednost() {
        return ponudjenaVrijednost;
    }

    public Integer getRokIsporuke() {
        return rokIsporuke;
    }

    public String getSifraPonudjaca() {
        return sifraPonudjaca;
    }

    public String getNazivPonudjaca() {
        return nazivPonudjaca;
    }

    public String getNazivProizvodjaca() {
        return nazivProizvodjaca;
    }

    @Override
    public String toString() {
        return (
            "Prvorangirani [atc=" +
            atc +
            ", brojPartije=" +
            brojPartije +
            ", id=" +
            id +
            ", nazivPonudjaca=" +
            nazivPonudjaca +
            ", nazivProizvodjaca=" +
            nazivProizvodjaca +
            ", ponudjenaVrijednost=" +
            ponudjenaVrijednost +
            ", procijenjenaVrijednost=" +
            procijenjenaVrijednost +
            ", rokIsporuke=" +
            rokIsporuke +
            ", sifraPonude=" +
            sifraPonude +
            ", sifraPonudjaca=" +
            sifraPonudjaca +
            ", sifraPostupka=" +
            sifraPostupka +
            ", trazenaKolicina=" +
            trazenaKolicina +
            ", zasticeniNaziv=" +
            zasticeniNaziv +
            "]"
        );
    }

    public Prvorangirani() {}
}
