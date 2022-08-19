import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPrvorangirani } from '../prvorangirani.model';

import { PrvorangiraniService } from './prvorangirani.service';

describe('Prvorangirani Service', () => {
  let service: PrvorangiraniService;
  let httpMock: HttpTestingController;
  let elemDefault: IPrvorangirani;
  let expectedResult: IPrvorangirani | IPrvorangirani[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PrvorangiraniService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      sifraPostupka: 0,
      nazivPonudjaca: 'AAAAAAA',
      sifraPonude: 0,
      brojPartije: 0,
      atc: 'AAAAAAA',
      trazenaKolicina: 0,
      procijenjenaVrijednost: 0,
      nazivProizvodjaca: 'AAAAAAA',
      zasticeniNaziv: 'AAAAAAA',
      jedinicnaCijena: 0,
      ponudjenaVrijednost: 0,
      rokIsporuke: 0,
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

    it('should return a list of Prvorangirani', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sifraPostupka: 1,
          nazivPonudjaca: 'BBBBBB',
          sifraPonude: 1,
          brojPartije: 1,
          atc: 'BBBBBB',
          trazenaKolicina: 1,
          procijenjenaVrijednost: 1,
          nazivProizvodjaca: 'BBBBBB',
          zasticeniNaziv: 'BBBBBB',
          jedinicnaCijena: 1,
          ponudjenaVrijednost: 1,
          rokIsporuke: 1,
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

    describe('addPrvorangiraniToCollectionIfMissing', () => {
      it('should add a Prvorangirani to an empty array', () => {
        const prvorangirani: IPrvorangirani = { id: 123 };
        expectedResult = service.addPrvorangiraniToCollectionIfMissing([], prvorangirani);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prvorangirani);
      });

      it('should not add a Prvorangirani to an array that contains it', () => {
        const prvorangirani: IPrvorangirani = { id: 123 };
        const prvorangiraniCollection: IPrvorangirani[] = [
          {
            ...prvorangirani,
          },
          { id: 456 },
        ];
        expectedResult = service.addPrvorangiraniToCollectionIfMissing(prvorangiraniCollection, prvorangirani);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Prvorangirani to an array that doesn't contain it", () => {
        const prvorangirani: IPrvorangirani = { id: 123 };
        const prvorangiraniCollection: IPrvorangirani[] = [{ id: 456 }];
        expectedResult = service.addPrvorangiraniToCollectionIfMissing(prvorangiraniCollection, prvorangirani);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prvorangirani);
      });

      it('should add only unique Prvorangirani to an array', () => {
        const prvorangiraniArray: IPrvorangirani[] = [{ id: 123 }, { id: 456 }, { id: 31224 }];
        const prvorangiraniCollection: IPrvorangirani[] = [{ id: 123 }];
        expectedResult = service.addPrvorangiraniToCollectionIfMissing(prvorangiraniCollection, ...prvorangiraniArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const prvorangirani: IPrvorangirani = { id: 123 };
        const prvorangirani2: IPrvorangirani = { id: 456 };
        expectedResult = service.addPrvorangiraniToCollectionIfMissing([], prvorangirani, prvorangirani2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(prvorangirani);
        expect(expectedResult).toContain(prvorangirani2);
      });

      it('should accept null and undefined values', () => {
        const prvorangirani: IPrvorangirani = { id: 123 };
        expectedResult = service.addPrvorangiraniToCollectionIfMissing([], null, prvorangirani, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(prvorangirani);
      });

      it('should return initial array if no Prvorangirani is added', () => {
        const prvorangiraniCollection: IPrvorangirani[] = [{ id: 123 }];
        expectedResult = service.addPrvorangiraniToCollectionIfMissing(prvorangiraniCollection, undefined, null);
        expect(expectedResult).toEqual(prvorangiraniCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
