package tender.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

@ParameterObject
public class PrvorangiraniCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private IntegerFilter sifraPostupka;

    private IntegerFilter sifraPonude;

    private IntegerFilter brojPartije;

    private StringFilter atc;

    private StringFilter inn;

    private StringFilter zasticeniNaziv;

    private StringFilter farmaceutskiOblikLijeka;

    private StringFilter jacinaLijeka;

    private StringFilter pakovanje;

    private IntegerFilter trazenaKolicina;

    private DoubleFilter procijenjenaVrijednost;

    private DoubleFilter ponudjenaVrijednost;

    private IntegerFilter rokIsporuke;

    private StringFilter sifraPonudjaca;

    private StringFilter nazivProizvodjaca;

    private Boolean distinct;

    public PrvorangiraniCriteria() {}

    public PrvorangiraniCriteria(PrvorangiraniCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.sifraPostupka = other.sifraPostupka == null ? null : other.sifraPostupka.copy();
        this.sifraPonude = other.sifraPonude == null ? null : other.sifraPonude.copy();
        this.brojPartije = other.brojPartije == null ? null : other.brojPartije.copy();
        this.atc = other.atc == null ? null : other.atc.copy();
        this.zasticeniNaziv = other.zasticeniNaziv == null ? null : other.zasticeniNaziv.copy();
        this.trazenaKolicina = other.trazenaKolicina == null ? null : other.trazenaKolicina.copy();
        this.procijenjenaVrijednost = other.procijenjenaVrijednost == null ? null : other.procijenjenaVrijednost.copy();
        this.ponudjenaVrijednost = other.ponudjenaVrijednost == null ? null : other.ponudjenaVrijednost.copy();
        this.rokIsporuke = other.rokIsporuke == null ? null : other.rokIsporuke.copy();
        this.sifraPonudjaca = other.sifraPonudjaca == null ? null : other.sifraPonudjaca.copy();
        this.nazivProizvodjaca = other.nazivProizvodjaca == null ? null : other.nazivProizvodjaca.copy();

        this.distinct = other.distinct;
    }

    @Override
    public PrvorangiraniCriteria copy() {
        return new PrvorangiraniCriteria(this);
    }

    public StringFilter getSifraPonudjaca() {
        return sifraPonudjaca;
    }

    public void setSifraPonudjaca(StringFilter sifraPonudjaca) {
        this.sifraPonudjaca = sifraPonudjaca;
    }

    public StringFilter getNazivProizvodjaca() {
        return nazivProizvodjaca;
    }

    public void setNazivProizvodjaca(StringFilter nazivProizvodjaca) {
        this.nazivProizvodjaca = nazivProizvodjaca;
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public IntegerFilter getSifraPostupka() {
        return sifraPostupka;
    }

    public IntegerFilter sifraPostupka() {
        if (sifraPostupka == null) {
            sifraPostupka = new IntegerFilter();
        }
        return sifraPostupka;
    }

    public void setSifraPostupka(IntegerFilter sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
    }

    public IntegerFilter getSifraPonude() {
        return sifraPonude;
    }

    public IntegerFilter sifraPonude() {
        if (sifraPonude == null) {
            sifraPonude = new IntegerFilter();
        }
        return sifraPonude;
    }

    public void setSifraPonude(IntegerFilter sifraPonude) {
        this.sifraPonude = sifraPonude;
    }

    public IntegerFilter getBrojPartije() {
        return brojPartije;
    }

    public IntegerFilter brojPartije() {
        if (brojPartije == null) {
            brojPartije = new IntegerFilter();
        }
        return brojPartije;
    }

    public void setBrojPartije(IntegerFilter brojPartije) {
        this.brojPartije = brojPartije;
    }

    public StringFilter getAtc() {
        return atc;
    }

    public StringFilter atc() {
        if (atc == null) {
            atc = new StringFilter();
        }
        return atc;
    }

    public void setAtc(StringFilter atc) {
        this.atc = atc;
    }

    public StringFilter getInn() {
        return inn;
    }

    public StringFilter inn() {
        if (inn == null) {
            inn = new StringFilter();
        }
        return inn;
    }

    public void setInn(StringFilter inn) {
        this.inn = inn;
    }

    public StringFilter getZasticeniNaziv() {
        return zasticeniNaziv;
    }

    public StringFilter zasticeniNaziv() {
        if (zasticeniNaziv == null) {
            zasticeniNaziv = new StringFilter();
        }
        return zasticeniNaziv;
    }

    public void setZasticeniNaziv(StringFilter zasticeniNaziv) {
        this.zasticeniNaziv = zasticeniNaziv;
    }

    public StringFilter getFarmaceutskiOblikLijeka() {
        return farmaceutskiOblikLijeka;
    }

    public StringFilter farmaceutskiOblikLijeka() {
        if (farmaceutskiOblikLijeka == null) {
            farmaceutskiOblikLijeka = new StringFilter();
        }
        return farmaceutskiOblikLijeka;
    }

    public void setFarmaceutskiOblikLijeka(StringFilter farmaceutskiOblikLijeka) {
        this.farmaceutskiOblikLijeka = farmaceutskiOblikLijeka;
    }

    public StringFilter getJacinaLijeka() {
        return jacinaLijeka;
    }

    public StringFilter jacinaLijeka() {
        if (jacinaLijeka == null) {
            jacinaLijeka = new StringFilter();
        }
        return jacinaLijeka;
    }

    public void setJacinaLijeka(StringFilter jacinaLijeka) {
        this.jacinaLijeka = jacinaLijeka;
    }

    public StringFilter getPakovanje() {
        return pakovanje;
    }

    public StringFilter pakovanje() {
        if (pakovanje == null) {
            pakovanje = new StringFilter();
        }
        return pakovanje;
    }

    public void setPakovanje(StringFilter pakovanje) {
        this.pakovanje = pakovanje;
    }

    public IntegerFilter getTrazenaKolicina() {
        return trazenaKolicina;
    }

    public IntegerFilter trazenaKolicina() {
        if (trazenaKolicina == null) {
            trazenaKolicina = new IntegerFilter();
        }
        return trazenaKolicina;
    }

    public void setTrazenaKolicina(IntegerFilter trazenaKolicina) {
        this.trazenaKolicina = trazenaKolicina;
    }

    public DoubleFilter getProcijenjenaVrijednost() {
        return procijenjenaVrijednost;
    }

    public DoubleFilter procijenjenaVrijednost() {
        if (procijenjenaVrijednost == null) {
            procijenjenaVrijednost = new DoubleFilter();
        }
        return procijenjenaVrijednost;
    }

    public void setProcijenjenaVrijednost(DoubleFilter procijenjenaVrijednost) {
        this.procijenjenaVrijednost = procijenjenaVrijednost;
    }

    public DoubleFilter getPonudjenaVrijednost() {
        return ponudjenaVrijednost;
    }

    public DoubleFilter ponudjenaVrijednost() {
        if (ponudjenaVrijednost == null) {
            ponudjenaVrijednost = new DoubleFilter();
        }
        return ponudjenaVrijednost;
    }

    public void setPonudjenaVrijednost(DoubleFilter ponudjenaVrijednost) {
        this.ponudjenaVrijednost = ponudjenaVrijednost;
    }

    public IntegerFilter getRokIsporuke() {
        return rokIsporuke;
    }

    public IntegerFilter rokIsporuke() {
        if (rokIsporuke == null) {
            rokIsporuke = new IntegerFilter();
        }
        return rokIsporuke;
    }

    public void setRokIsporuke(IntegerFilter rokIsporuke) {
        this.rokIsporuke = rokIsporuke;
    }

    public StringFilter getsifraPonudjaca() {
        return sifraPonudjaca;
    }

    public StringFilter sifraPonudjaca() {
        if (sifraPonudjaca == null) {
            sifraPonudjaca = new StringFilter();
        }
        return sifraPonudjaca;
    }

    public void setsifraPonudjaca(StringFilter sifraPonudjaca) {
        this.sifraPonudjaca = sifraPonudjaca;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PrvorangiraniCriteria that = (PrvorangiraniCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(sifraPostupka, that.sifraPostupka) &&
            Objects.equals(sifraPonude, that.sifraPonude) &&
            Objects.equals(brojPartije, that.brojPartije) &&
            Objects.equals(atc, that.atc) &&
            Objects.equals(inn, that.inn) &&
            Objects.equals(zasticeniNaziv, that.zasticeniNaziv) &&
            Objects.equals(farmaceutskiOblikLijeka, that.farmaceutskiOblikLijeka) &&
            Objects.equals(jacinaLijeka, that.jacinaLijeka) &&
            Objects.equals(pakovanje, that.pakovanje) &&
            Objects.equals(trazenaKolicina, that.trazenaKolicina) &&
            Objects.equals(procijenjenaVrijednost, that.procijenjenaVrijednost) &&
            Objects.equals(ponudjenaVrijednost, that.ponudjenaVrijednost) &&
            Objects.equals(rokIsporuke, that.rokIsporuke) &&
            Objects.equals(sifraPonudjaca, that.sifraPonudjaca) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            sifraPostupka,
            sifraPonude,
            brojPartije,
            atc,
            inn,
            zasticeniNaziv,
            farmaceutskiOblikLijeka,
            jacinaLijeka,
            pakovanje,
            trazenaKolicina,
            procijenjenaVrijednost,
            ponudjenaVrijednost,
            rokIsporuke,
            sifraPonudjaca,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PrvorangiraniCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (sifraPostupka != null ? "sifraPostupka=" + sifraPostupka + ", " : "") +
            (sifraPonude != null ? "sifraPonude=" + sifraPonude + ", " : "") +
            (brojPartije != null ? "brojPartije=" + brojPartije + ", " : "") +
            (atc != null ? "atc=" + atc + ", " : "") +
            (inn != null ? "inn=" + inn + ", " : "") +
            (zasticeniNaziv != null ? "zasticeniNaziv=" + zasticeniNaziv + ", " : "") +
            (farmaceutskiOblikLijeka != null ? "farmaceutskiOblikLijeka=" + farmaceutskiOblikLijeka + ", " : "") +
            (jacinaLijeka != null ? "jacinaLijeka=" + jacinaLijeka + ", " : "") +
            (pakovanje != null ? "pakovanje=" + pakovanje + ", " : "") +
            (trazenaKolicina != null ? "trazenaKolicina=" + trazenaKolicina + ", " : "") +
            (procijenjenaVrijednost != null ? "procijenjenaVrijednost=" + procijenjenaVrijednost + ", " : "") +
            (ponudjenaVrijednost != null ? "ponudjenaVrijednost=" + ponudjenaVrijednost + ", " : "") +
            (rokIsporuke != null ? "rokIsporuke=" + rokIsporuke + ", " : "") +
            (sifraPonudjaca != null ? "sifraPonudjaca=" + sifraPonudjaca + ", " : "") +

            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
