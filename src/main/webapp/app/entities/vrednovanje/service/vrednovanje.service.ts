import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVrednovanje, getVrednovanjeIdentifier } from '../vrednovanje.model';

export type EntityResponseType = HttpResponse<IVrednovanje>;
export type EntityArrayResponseType = HttpResponse<IVrednovanje[]>;

@Injectable({ providedIn: 'root' })
export class VrednovanjeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/vrednovanjes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVrednovanje>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVrednovanje[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  addVrednovanjeToCollectionIfMissing(
    vrednovanjeCollection: IVrednovanje[],
    ...vrednovanjesToCheck: (IVrednovanje | null | undefined)[]
  ): IVrednovanje[] {
    const vrednovanjes: IVrednovanje[] = vrednovanjesToCheck.filter(isPresent);
    if (vrednovanjes.length > 0) {
      const vrednovanjeCollectionIdentifiers = vrednovanjeCollection.map(vrednovanjeItem => getVrednovanjeIdentifier(vrednovanjeItem)!);
      const vrednovanjesToAdd = vrednovanjes.filter(vrednovanjeItem => {
        const vrednovanjeIdentifier = getVrednovanjeIdentifier(vrednovanjeItem);
        if (vrednovanjeIdentifier == null || vrednovanjeCollectionIdentifiers.includes(vrednovanjeIdentifier)) {
          return false;
        }
        vrednovanjeCollectionIdentifiers.push(vrednovanjeIdentifier);
        return true;
      });
      return [...vrednovanjesToAdd, ...vrednovanjeCollection];
    }
    return vrednovanjeCollection;
  }
}
