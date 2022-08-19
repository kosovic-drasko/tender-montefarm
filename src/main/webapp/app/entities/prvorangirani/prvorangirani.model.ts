export interface IPrvorangirani {
  id?: number;
  sifraPostupka?: number | null;
  nazivPonudjaca?: string | null;
  sifraPonude?: number | null;
  brojPartije?: number | null;
  atc?: string | null;
  trazenaKolicina?: number | null;
  procijenjenaVrijednost?: number | null;
  nazivProizvodjaca?: string | null;
  zasticeniNaziv?: string | null;
  jedinicnaCijena?: number | null;
  ponudjenaVrijednost?: number | null;
  rokIsporuke?: number | null;
  vrstaPostupka?: string | null;
  bodCijena?: number | null;
  bodRok?: number | null;
  bodUkupno?: number | null;
}

export class Prvorangirani implements IPrvorangirani {
  constructor(
    public id?: number,
    public sifraPostupka?: number | null,
    public nazivPonudjaca?: string | null,
    public sifraPonude?: number | null,
    public brojPartije?: number | null,
    public atc?: string | null,
    public trazenaKolicina?: number | null,
    public procijenjenaVrijednost?: number | null,
    public nazivProizvodjaca?: string | null,
    public zasticeniNaziv?: string | null,
    public jedinicnaCijena?: number | null,
    public ponudjenaVrijednost?: number | null,
    public rokIsporuke?: number | null,
    public vrstaPostupka?: string | null,
    public bodCijena?: number | null,
    public bodRok?: number | null,
    public bodUkupno?: number | null
  ) {}
}

export function getPrvorangiraniIdentifier(prvorangirani: IPrvorangirani): number | undefined {
  return prvorangirani.id;
}
