import { IPonudjaci } from 'app/entities/ponudjaci/ponudjaci.model';

export interface IPonude {
  id?: number;
  sifraPostupka?: number;
  sifraPonude?: number;
  brojPartije?: number;
  nazivProizvodjaca?: string | null;
  zasticeniNaziv?: string | null;
  ponudjenaVrijednost?: number;
  rokIsporuke?: number | null;
  jedinicnaCijena?: number | null;
  selected?: boolean | null;
  sifraPonudjaca?: number | null;
  ponudjaci?: IPonudjaci | null;
}

export class Ponude implements IPonude {
  constructor(
    public id?: number,
    public sifraPostupka?: number,
    public sifraPonude?: number,
    public brojPartije?: number,
    public nazivProizvodjaca?: string | null,
    public zasticeniNaziv?: string | null,
    public ponudjenaVrijednost?: number,
    public rokIsporuke?: number | null,
    public jedinicnaCijena?: number | null,
    public selected?: boolean | null,
    public sifraPonudjaca?: number | null,
    public ponudjaci?: IPonudjaci | null
  ) {
    this.selected = this.selected ?? false;
  }
}

export function getPonudeIdentifier(ponude: IPonude): number | undefined {
  return ponude.id;
}
