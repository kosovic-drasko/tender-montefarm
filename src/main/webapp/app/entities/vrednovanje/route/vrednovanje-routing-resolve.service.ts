import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVrednovanje, Vrednovanje } from '../vrednovanje.model';
import { VrednovanjeService } from '../service/vrednovanje.service';

@Injectable({ providedIn: 'root' })
export class VrednovanjeRoutingResolveService implements Resolve<IVrednovanje> {
  constructor(protected service: VrednovanjeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVrednovanje> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((vrednovanje: HttpResponse<Vrednovanje>) => {
          if (vrednovanje.body) {
            return of(vrednovanje.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Vrednovanje());
  }
}
