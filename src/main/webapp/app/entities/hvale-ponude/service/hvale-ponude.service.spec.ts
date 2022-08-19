import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHvalePonude } from '../hvale-ponude.model';

import { HvalePonudeService } from './hvale-ponude.service';

describe('HvalePonude Service', () => {
  let service: HvalePonudeService;
  let httpMock: HttpTestingController;
  let elemDefault: IHvalePonude;
  let expectedResult: IHvalePonude | IHvalePonude[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HvalePonudeService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      sifraPostupka: 0,
      brojPartije: 0,
      inn: 'AAAAAAA',
      farmaceutskiOblikLijeka: 'AAAAAAA',
      pakovanje: 'AAAAAAA',
      trazenaKolicina: 0,
      procijenjenaVrijednost: 0,
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

    it('should return a list of HvalePonude', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sifraPostupka: 1,
          brojPartije: 1,
          inn: 'BBBBBB',
          farmaceutskiOblikLijeka: 'BBBBBB',
          pakovanje: 'BBBBBB',
          trazenaKolicina: 1,
          procijenjenaVrijednost: 1,
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

    describe('addHvalePonudeToCollectionIfMissing', () => {
      it('should add a HvalePonude to an empty array', () => {
        const hvalePonude: IHvalePonude = { id: 123 };
        expectedResult = service.addHvalePonudeToCollectionIfMissing([], hvalePonude);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hvalePonude);
      });

      it('should not add a HvalePonude to an array that contains it', () => {
        const hvalePonude: IHvalePonude = { id: 123 };
        const hvalePonudeCollection: IHvalePonude[] = [
          {
            ...hvalePonude,
          },
          { id: 456 },
        ];
        expectedResult = service.addHvalePonudeToCollectionIfMissing(hvalePonudeCollection, hvalePonude);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HvalePonude to an array that doesn't contain it", () => {
        const hvalePonude: IHvalePonude = { id: 123 };
        const hvalePonudeCollection: IHvalePonude[] = [{ id: 456 }];
        expectedResult = service.addHvalePonudeToCollectionIfMissing(hvalePonudeCollection, hvalePonude);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hvalePonude);
      });

      it('should add only unique HvalePonude to an array', () => {
        const hvalePonudeArray: IHvalePonude[] = [{ id: 123 }, { id: 456 }, { id: 43361 }];
        const hvalePonudeCollection: IHvalePonude[] = [{ id: 123 }];
        expectedResult = service.addHvalePonudeToCollectionIfMissing(hvalePonudeCollection, ...hvalePonudeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const hvalePonude: IHvalePonude = { id: 123 };
        const hvalePonude2: IHvalePonude = { id: 456 };
        expectedResult = service.addHvalePonudeToCollectionIfMissing([], hvalePonude, hvalePonude2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hvalePonude);
        expect(expectedResult).toContain(hvalePonude2);
      });

      it('should accept null and undefined values', () => {
        const hvalePonude: IHvalePonude = { id: 123 };
        expectedResult = service.addHvalePonudeToCollectionIfMissing([], null, hvalePonude, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hvalePonude);
      });

      it('should return initial array if no HvalePonude is added', () => {
        const hvalePonudeCollection: IHvalePonude[] = [{ id: 123 }];
        expectedResult = service.addHvalePonudeToCollectionIfMissing(hvalePonudeCollection, undefined, null);
        expect(expectedResult).toEqual(hvalePonudeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
