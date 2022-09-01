import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { observable, Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPonude, getPonudeIdentifier } from '../ponude.model';

export type EntityResponseType = HttpResponse<IPonude>;
export type EntityArrayResponseType = HttpResponse<IPonude[]>;

@Injectable({ providedIn: 'root' })
export class PonudeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ponudes');
  protected resourceUrlPonudePonudjaci = this.applicationConfigService.getEndpointFor('api/ponude-ponudjaci');
  protected resourceUrlPonudePostupci = this.applicationConfigService.getEndpointFor('api/ponude-postupci');
  protected resourceUrlPostupciSifra = this.applicationConfigService.getEndpointFor('api/sifra-postupka');
  public resourceUrlExcelUpload = SERVER_API_URL + 'api/upload';

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ponude: IPonude): Observable<EntityResponseType> {
    return this.http.post<IPonude>(this.resourceUrl, ponude, { observe: 'response' });
  }

  update(ponude: IPonude): Observable<EntityResponseType> {
    return this.http.put<IPonude>(`${this.resourceUrl}/${getPonudeIdentifier(ponude) as number}`, ponude, { observe: 'response' });
  }

  partialUpdate(ponude: IPonude): Observable<EntityResponseType> {
    return this.http.patch<IPonude>(`${this.resourceUrl}/${getPonudeIdentifier(ponude) as number}`, ponude, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPonude>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  ponudePonudjaci(sifraPostupka: number): Observable<IPonude> {
    return this.http.get<IPonude>(`${this.resourceUrlPonudePonudjaci}/${sifraPostupka}`);
  }

  ponudePostupci(sifraPostupka: number | undefined, sifraPonude: null | undefined): Observable<EntityArrayResponseType> {
    return this.http.get<IPonude[]>(`${this.resourceUrlPonudePostupci}/${sifraPostupka}/${sifraPonude}`, { observe: 'response' });
  }

  ponudePostupciSifra(sifraPostupka: number | undefined): Observable<EntityArrayResponseType> {
    return this.http.get<IPonude[]>(`${this.resourceUrlPostupciSifra}/${sifraPostupka}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPonude[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPonudeToCollectionIfMissing(ponudeCollection: IPonude[], ...ponudesToCheck: (IPonude | null | undefined)[]): IPonude[] {
    const ponudes: IPonude[] = ponudesToCheck.filter(isPresent);
    if (ponudes.length > 0) {
      const ponudeCollectionIdentifiers = ponudeCollection.map(ponudeItem => getPonudeIdentifier(ponudeItem)!);
      const ponudesToAdd = ponudes.filter(ponudeItem => {
        const ponudeIdentifier = getPonudeIdentifier(ponudeItem);
        if (ponudeIdentifier == null || ponudeCollectionIdentifiers.includes(ponudeIdentifier)) {
          return false;
        }
        ponudeCollectionIdentifiers.push(ponudeIdentifier);
        return true;
      });
      return [...ponudesToAdd, ...ponudeCollection];
    }
    return ponudeCollection;
  }

  UploadExcel(formData: FormData): any {
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(this.resourceUrlExcelUpload, formData, { headers });
  }
}
