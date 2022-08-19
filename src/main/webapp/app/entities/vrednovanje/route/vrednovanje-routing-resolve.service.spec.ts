import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IVrednovanje, Vrednovanje } from '../vrednovanje.model';
import { VrednovanjeService } from '../service/vrednovanje.service';

import { VrednovanjeRoutingResolveService } from './vrednovanje-routing-resolve.service';

describe('Vrednovanje routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: VrednovanjeRoutingResolveService;
  let service: VrednovanjeService;
  let resultVrednovanje: IVrednovanje | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(VrednovanjeRoutingResolveService);
    service = TestBed.inject(VrednovanjeService);
    resultVrednovanje = undefined;
  });

  describe('resolve', () => {
    it('should return IVrednovanje returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVrednovanje = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVrednovanje).toEqual({ id: 123 });
    });

    it('should return new IVrednovanje if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVrednovanje = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultVrednovanje).toEqual(new Vrednovanje());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Vrednovanje })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVrednovanje = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVrednovanje).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
