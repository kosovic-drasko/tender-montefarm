import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHvalePonude, getHvalePonudeIdentifier } from '../hvale-ponude.model';

export type EntityResponseType = HttpResponse<IHvalePonude>;
export type EntityArrayResponseType = HttpResponse<IHvalePonude[]>;

@Injectable({ providedIn: 'root' })
export class HvalePonudeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/hvale-ponudes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHvalePonude>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHvalePonude[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  addHvalePonudeToCollectionIfMissing(
    hvalePonudeCollection: IHvalePonude[],
    ...hvalePonudesToCheck: (IHvalePonude | null | undefined)[]
  ): IHvalePonude[] {
    const hvalePonudes: IHvalePonude[] = hvalePonudesToCheck.filter(isPresent);
    if (hvalePonudes.length > 0) {
      const hvalePonudeCollectionIdentifiers = hvalePonudeCollection.map(hvalePonudeItem => getHvalePonudeIdentifier(hvalePonudeItem)!);
      const hvalePonudesToAdd = hvalePonudes.filter(hvalePonudeItem => {
        const hvalePonudeIdentifier = getHvalePonudeIdentifier(hvalePonudeItem);
        if (hvalePonudeIdentifier == null || hvalePonudeCollectionIdentifiers.includes(hvalePonudeIdentifier)) {
          return false;
        }
        hvalePonudeCollectionIdentifiers.push(hvalePonudeIdentifier);
        return true;
      });
      return [...hvalePonudesToAdd, ...hvalePonudeCollection];
    }
    return hvalePonudeCollection;
  }
}
