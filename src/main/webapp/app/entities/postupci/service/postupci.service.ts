import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPostupci, getPostupciIdentifier } from '../postupci.model';

export type EntityResponseType = HttpResponse<IPostupci>;
export type EntityArrayResponseType = HttpResponse<IPostupci[]>;

@Injectable({ providedIn: 'root' })
export class PostupciService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/postupcis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(postupci: IPostupci): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(postupci);
    return this.http
      .post<IPostupci>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(postupci: IPostupci): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(postupci);
    return this.http
      .put<IPostupci>(`${this.resourceUrl}/${getPostupciIdentifier(postupci) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(postupci: IPostupci): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(postupci);
    return this.http
      .patch<IPostupci>(`${this.resourceUrl}/${getPostupciIdentifier(postupci) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPostupci>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPostupci[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPostupciToCollectionIfMissing(postupciCollection: IPostupci[], ...postupcisToCheck: (IPostupci | null | undefined)[]): IPostupci[] {
    const postupcis: IPostupci[] = postupcisToCheck.filter(isPresent);
    if (postupcis.length > 0) {
      const postupciCollectionIdentifiers = postupciCollection.map(postupciItem => getPostupciIdentifier(postupciItem)!);
      const postupcisToAdd = postupcis.filter(postupciItem => {
        const postupciIdentifier = getPostupciIdentifier(postupciItem);
        if (postupciIdentifier == null || postupciCollectionIdentifiers.includes(postupciIdentifier)) {
          return false;
        }
        postupciCollectionIdentifiers.push(postupciIdentifier);
        return true;
      });
      return [...postupcisToAdd, ...postupciCollection];
    }
    return postupciCollection;
  }

  protected convertDateFromClient(postupci: IPostupci): IPostupci {
    return Object.assign({}, postupci, {
      datumObjave: postupci.datumObjave?.isValid() ? postupci.datumObjave.format(DATE_FORMAT) : undefined,
      datumOtvaranja: postupci.datumOtvaranja?.isValid() ? postupci.datumOtvaranja.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datumObjave = res.body.datumObjave ? dayjs(res.body.datumObjave) : undefined;
      res.body.datumOtvaranja = res.body.datumOtvaranja ? dayjs(res.body.datumOtvaranja) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((postupci: IPostupci) => {
        postupci.datumObjave = postupci.datumObjave ? dayjs(postupci.datumObjave) : undefined;
        postupci.datumOtvaranja = postupci.datumOtvaranja ? dayjs(postupci.datumOtvaranja) : undefined;
      });
    }
    return res;
  }
}
