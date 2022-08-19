import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IVrednovanje } from '../vrednovanje.model';

import { VrednovanjeService } from './vrednovanje.service';

describe('Vrednovanje Service', () => {
  let service: VrednovanjeService;
  let httpMock: HttpTestingController;
  let elemDefault: IVrednovanje;
  let expectedResult: IVrednovanje | IVrednovanje[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VrednovanjeService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      sifraPostupka: 0,
      sifraPonude: 0,
      brojPartije: 0,
      nazivProizvodjaca: 'AAAAAAA',
      zasticeniNaziv: 'AAAAAAA',
      ponudjenaVrijednost: 0,
      rokIsporuke: 0,
      jedinicnaCijena: 0,
      nazivPonudjaca: 'AAAAAAA',
      atc: 'AAAAAAA',
      trazenaKolicina: 0,
      procijenjenaVrijednost: 0,
      vrstaPostupka: 'AAAAAAA',
      bodCijena: 0,
      bodRok: 0,
      bodUkupno: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should return a list of Vrednovanje', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sifraPostupka: 1,
          sifraPonude: 1,
          brojPartije: 1,
          nazivProizvodjaca: 'BBBBBB',
          zasticeniNaziv: 'BBBBBB',
          ponudjenaVrijednost: 1,
          rokIsporuke: 1,
          jedinicnaCijena: 1,
          nazivPonudjaca: 'BBBBBB',
          atc: 'BBBBBB',
          trazenaKolicina: 1,
          procijenjenaVrijednost: 1,
          vrstaPostupka: 'BBBBBB',
          bodCijena: 1,
          bodRok: 1,
          bodUkupno: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    describe('addVrednovanjeToCollectionIfMissing', () => {
      it('should add a Vrednovanje to an empty array', () => {
        const vrednovanje: IVrednovanje = { id: 123 };
        expectedResult = service.addVrednovanjeToCollectionIfMissing([], vrednovanje);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vrednovanje);
      });

      it('should not add a Vrednovanje to an array that contains it', () => {
        const vrednovanje: IVrednovanje = { id: 123 };
        const vrednovanjeCollection: IVrednovanje[] = [
          {
            ...vrednovanje,
          },
          { id: 456 },
        ];
        expectedResult = service.addVrednovanjeToCollectionIfMissing(vrednovanjeCollection, vrednovanje);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Vrednovanje to an array that doesn't contain it", () => {
        const vrednovanje: IVrednovanje = { id: 123 };
        const vrednovanjeCollection: IVrednovanje[] = [{ id: 456 }];
        expectedResult = service.addVrednovanjeToCollectionIfMissing(vrednovanjeCollection, vrednovanje);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vrednovanje);
      });

      it('should add only unique Vrednovanje to an array', () => {
        const vrednovanjeArray: IVrednovanje[] = [{ id: 123 }, { id: 456 }, { id: 25886 }];
        const vrednovanjeCollection: IVrednovanje[] = [{ id: 123 }];
        expectedResult = service.addVrednovanjeToCollectionIfMissing(vrednovanjeCollection, ...vrednovanjeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const vrednovanje: IVrednovanje = { id: 123 };
        const vrednovanje2: IVrednovanje = { id: 456 };
        expectedResult = service.addVrednovanjeToCollectionIfMissing([], vrednovanje, vrednovanje2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vrednovanje);
        expect(expectedResult).toContain(vrednovanje2);
      });

      it('should accept null and undefined values', () => {
        const vrednovanje: IVrednovanje = { id: 123 };
        expectedResult = service.addVrednovanjeToCollectionIfMissing([], null, vrednovanje, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vrednovanje);
      });

      it('should return initial array if no Vrednovanje is added', () => {
        const vrednovanjeCollection: IVrednovanje[] = [{ id: 123 }];
        expectedResult = service.addVrednovanjeToCollectionIfMissing(vrednovanjeCollection, undefined, null);
        expect(expectedResult).toEqual(vrednovanjeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
