import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPonude } from '../ponude.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { PonudeService } from '../service/ponude.service';
import { PonudeDeleteDialogComponent } from '../delete/ponude-delete-dialog.component';
import { PonudeUpdateComponent } from '../update/ponude-update.component';
import { IPonudjaci } from '../../ponudjaci/ponudjaci.model';
import { PonudjaciService } from '../../ponudjaci/service/ponudjaci.service';

@Component({
  selector: 'jhi-ponude',
  templateUrl: './ponude.component.html',
})
export class PonudeComponent implements OnInit {
  ponudjaci?: IPonudjaci[] = [];
  ponudes?: IPonude[];
  brPonude?: null;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  ukupno?: number;
  ucesnici?: (string | null | undefined)[] | undefined;
  public parameterValue?: number;
  @ViewChild('fileInput') fileInput: any;
  @Input() postupak: any;

  resourceUrlExcelDownloadPostupak = SERVER_API_URL + 'api/ponude/file/';
  constructor(
    protected ponudeService: PonudeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected ponudjaciService: PonudjaciService,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.ponudeService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IPonude[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          this.ukupno = res.body?.reduce((acc, ponude) => acc + ponude.ponudjenaVrijednost!, 0);
          // this.ucesnici = res.body?.map(val => val.ponudjaci?.nazivPonudjaca);
          const unique = [...new Set(res.body?.map(item => item.ponudjaci?.nazivPonudjaca))]; // [ 'A', 'B']
          this.ucesnici = unique;
          // console.log('To je ================>',unique);

          console.log('================>', this.ucesnici);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  loadPageSifra(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.ponudeService
      .query({
        'sifraPostupka.in': this.postupak,
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IPonude[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          this.ukupno = res.body?.reduce((acc, ponude) => acc + ponude.ponudjenaVrijednost!, 0);
          const unique = [...new Set(res.body?.map(item => item.ponudjaci?.nazivPonudjaca))]; // [ 'A', 'B']
          this.ucesnici = unique;
          // this.ucesnici = res.body?.map(val => val.ponudjaci?.nazivPonudjaca)
          // console.log('===================>',res.body?.pop()?.ponudjaci?.nazivPonudjaca?.toUpperCase()) ;
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  loadPageSifraPonude(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.ponudeService
      .query({
        // 'sifraPostupka.in': this.postupak,
        'sifraPonude.in': this.brPonude,

        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IPonude[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          this.ukupno = res.body?.reduce((acc, ponude) => acc + ponude.ponudjenaVrijednost!, 0);
          const unique = [...new Set(res.body?.map(item => item.ponudjaci?.nazivPonudjaca))]; // [ 'A', 'B']
          this.ucesnici = unique;
          // this.ucesnici = res.body?.map(val => val.ponudjaci?.nazivPonudjaca)
          // console.log('===================>',res.body?.pop()?.ponudjaci?.nazivPonudjaca?.toUpperCase()) ;
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }
  brPonudeNull(): void {
    this.brPonude = null;
    this.loadPage();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parameter => {
      this.parameterValue = parameter.id;
    });
    if (this.postupak !== undefined) {
      this.handleNavigationSifra();
    } else {
      this.handleNavigation();
    }
  }

  trackId(_index: number, item: IPonude): number {
    return item.id!;
  }

  delete(ponude: IPonude): void {
    const modalRef = this.modalService.open(PonudeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ponude = ponude;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected handleNavigationSifra(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPageSifra(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: IPonude[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/ponude'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.ponudes = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  update(
    id?: number,
    sifraPostupka?: number,
    sifraPonude?: number,
    brojPartije?: number,
    sifraPonudjaca?: number | null,
    nazivProizvodjaca?: string | null,
    zasticeniNaziv?: string | null,
    ponudjenaVrijednost?: number,
    jedinicnaCijena?: number | null,
    selected?: boolean | null,
    rokIsporuke?: number
  ): void {
    const modalRef = this.modalService.open(PonudeUpdateComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.sifraPostupka = sifraPostupka;
    modalRef.componentInstance.sifraPonude = sifraPonude;
    modalRef.componentInstance.brojPartije = brojPartije;
    modalRef.componentInstance.sifraPonudjaca = sifraPonudjaca;
    modalRef.componentInstance.nazivProizvodjaca = nazivProizvodjaca;
    modalRef.componentInstance.zasticeniNaziv = zasticeniNaziv;
    modalRef.componentInstance.ponudjenaVrijednost = ponudjenaVrijednost;
    modalRef.componentInstance.jedinicnaCijena = jedinicnaCijena;
    modalRef.componentInstance.selected = selected;
    modalRef.componentInstance.rokIsporuke = rokIsporuke;

    modalRef.closed.subscribe(() => {
      this.loadPage();
    });
  }

  add(): void {
    const modalRef = this.modalService.open(PonudeUpdateComponent, { size: 'lg', backdrop: 'static' });
    modalRef.closed.subscribe(() => {
      this.loadPage();
    });
  }

  uploadFile(): any {
    const formData = new FormData();
    formData.append('files', this.fileInput.nativeElement.files[0]);
    this.ponudeService.UploadExcel(formData).subscribe(() => {
      this.loadPage();
    });
  }
  obrazacExcelPostupak(sifra: number): void {
    window.location.href = `${this.resourceUrlExcelDownloadPostupak}/${sifra}`;
  }
}
