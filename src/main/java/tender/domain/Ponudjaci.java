package tender.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ponudjaci.
 */
@Entity
@Table(name = "ponudjaci")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Ponudjaci implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "naziv_ponudjaca")
    private String nazivPonudjaca;

    @Column(name = "odgovorno_lice")
    private String odgovornoLice;

    @Column(name = "adresa_ponudjaca")
    private String adresaPonudjaca;

    @Column(name = "banka_racun")
    private String bankaRacun;

    @OneToMany(mappedBy = "ponudjaci")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "ponudjaci" }, allowSetters = true)
    private Set<Ponude> ponudes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ponudjaci id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazivPonudjaca() {
        return this.nazivPonudjaca;
    }

    public Ponudjaci nazivPonudjaca(String nazivPonudjaca) {
        this.setNazivPonudjaca(nazivPonudjaca);
        return this;
    }

    public void setNazivPonudjaca(String nazivPonudjaca) {
        this.nazivPonudjaca = nazivPonudjaca;
    }

    public String getOdgovornoLice() {
        return this.odgovornoLice;
    }

    public Ponudjaci odgovornoLice(String odgovornoLice) {
        this.setOdgovornoLice(odgovornoLice);
        return this;
    }

    public void setOdgovornoLice(String odgovornoLice) {
        this.odgovornoLice = odgovornoLice;
    }

    public String getAdresaPonudjaca() {
        return this.adresaPonudjaca;
    }

    public Ponudjaci adresaPonudjaca(String adresaPonudjaca) {
        this.setAdresaPonudjaca(adresaPonudjaca);
        return this;
    }

    public void setAdresaPonudjaca(String adresaPonudjaca) {
        this.adresaPonudjaca = adresaPonudjaca;
    }

    public String getBankaRacun() {
        return this.bankaRacun;
    }

    public Ponudjaci bankaRacun(String bankaRacun) {
        this.setBankaRacun(bankaRacun);
        return this;
    }

    public void setBankaRacun(String bankaRacun) {
        this.bankaRacun = bankaRacun;
    }

    public Set<Ponude> getPonudes() {
        return this.ponudes;
    }

    public void setPonudes(Set<Ponude> ponudes) {
        if (this.ponudes != null) {
            this.ponudes.forEach(i -> i.setPonudjaci(null));
        }
        if (ponudes != null) {
            ponudes.forEach(i -> i.setPonudjaci(this));
        }
        this.ponudes = ponudes;
    }

    public Ponudjaci ponudes(Set<Ponude> ponudes) {
        this.setPonudes(ponudes);
        return this;
    }

    public Ponudjaci addPonude(Ponude ponude) {
        this.ponudes.add(ponude);
        ponude.setPonudjaci(this);
        return this;
    }

    public Ponudjaci removePonude(Ponude ponude) {
        this.ponudes.remove(ponude);
        ponude.setPonudjaci(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ponudjaci)) {
            return false;
        }
        return id != null && id.equals(((Ponudjaci) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ponudjaci{" +
            "id=" + getId() +
            ", nazivPonudjaca='" + getNazivPonudjaca() + "'" +
            ", odgovornoLice='" + getOdgovornoLice() + "'" +
            ", adresaPonudjaca='" + getAdresaPonudjaca() + "'" +
            ", bankaRacun='" + getBankaRacun() + "'" +
            "}";
    }
}
