import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHvalePonude } from '../hvale-ponude.model';

export type EntityResponseType = HttpResponse<IHvalePonude>;
export type EntityArrayResponseType = HttpResponse<IHvalePonude[]>;

@Injectable({ providedIn: 'root' })
export class HvalePonudeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/hvale-ponudes');
  public resourceUrlHvali = this.applicationConfigService.getEndpointFor('api/hvale');
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  hvali(sifra: number): any {
    return this.http.get(`${this.resourceUrlHvali}/${sifra}`);
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHvalePonude>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHvalePonude[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
