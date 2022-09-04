import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISpecifikacije } from '../specifikacije.model';
import { SpecifikacijeService } from '../service/specifikacije.service';
import { SpecifikacijeDeleteDialogComponent } from '../delete/specifikacije-delete-dialog.component';
import { SpecifikacijeUpdateComponent } from '../update/specifikacije-update.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'jhi-specifikacije',
  templateUrl: './specifikacije.component.html',
  styleUrls: ['./specifikacije.scss'],
})
export class SpecifikacijeComponent implements OnInit {
  specifikacijes?: HttpResponse<ISpecifikacije[]>;
  isLoading = false;
  brojObrazac?: number = 0;
  ukupno?: number;

  public displayedColumns = [
    'sifra postupka',
    'broj partije',
    'atc',
    'inn',
    'farmaceutski oblik',
    'jacina lijeka',
    'trazena kolicina',
    'pakovanje',
    'jedinica mjere',
    'procijenjena vrijednost',
    'action',
  ];

  public dataSource = new MatTableDataSource<ISpecifikacije>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('fileInput') fileInput: any;
  @Input() postupak: any;
  message: string | undefined;
  public resourceUrlExcelDownload = SERVER_API_URL + 'api/specifikacije/file';
  constructor(
    protected specifikacijeService: SpecifikacijeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  loadPage(): void {
    this.isLoading = true;
    this.specifikacijeService.query().subscribe({
      next: (res: HttpResponse<ISpecifikacije[]>) => {
        this.isLoading = false;
        this.dataSource.data = res.body ?? [];
        this.specifikacijes = res;
        this.ukupno = res.body?.reduce((acc, ponude) => acc + ponude.procijenjenaVrijednost!, 0);
      },
      error: () => {
        this.isLoading = false;
        this.onError();
      },
    });
  }
  loadPageSifra(): void {
    this.isLoading = true;
    this.specifikacijeService
      .query({
        'sifraPostupka.in': this.postupak,
      })
      .subscribe({
        next: (res: HttpResponse<ISpecifikacije[]>) => {
          this.isLoading = false;
          this.dataSource.data = res.body ?? [];
          this.specifikacijes = res;
          this.ukupno = res.body?.reduce((acc, ponude) => acc + ponude.procijenjenaVrijednost!, 0);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  ngOnInit(): void {
    if (this.postupak !== undefined) {
      this.loadPageSifra();
    } else {
      this.loadPage();
    }
  }

  delete(specifikacije: ISpecifikacije): void {
    const modalRef = this.modalService.open(SpecifikacijeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.specifikacije = specifikacije;
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }

  protected onError(): void {
    console.log('Greska');
  }
  update(
    id?: number,
    sifraPostupka?: number,
    brojPartije?: number,
    atc?: string | null,
    inn?: string | null,
    farmaceutskiOblikLijeka?: string | null,
    jacinaLijeka?: string | null,
    trazenaKolicina?: number | null,
    pakovanje?: string | null,
    jedinicaMjere?: string | null,
    procijenjenaVrijednost?: number
  ): void {
    const modalRef = this.modalService.open(SpecifikacijeUpdateComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.sifraPostupka = sifraPostupka;
    modalRef.componentInstance.brojPartije = brojPartije;
    modalRef.componentInstance.atc = atc;
    modalRef.componentInstance.inn = inn;
    modalRef.componentInstance.farmaceutskiOblikLijeka = farmaceutskiOblikLijeka;
    modalRef.componentInstance.jacinaLijeka = jacinaLijeka;
    modalRef.componentInstance.trazenaKolicina = trazenaKolicina;
    modalRef.componentInstance.pakovanje = pakovanje;
    modalRef.componentInstance.jedinicaMjere = jedinicaMjere;
    modalRef.componentInstance.procijenjenaVrijednost = procijenjenaVrijednost;

    modalRef.closed.subscribe(() => {
      this.loadPage();
    });
  }
  add(): void {
    const modalRef = this.modalService.open(SpecifikacijeUpdateComponent, { size: 'lg', backdrop: 'static' });
    modalRef.closed.subscribe(() => {
      this.loadPage();
    });
  }

  uploadFile(): any {
    const formData = new FormData();
    formData.append('files', this.fileInput.nativeElement.files[0]);

    this.specifikacijeService.UploadExcel(formData).subscribe((result: { toString: () => string | undefined }) => {
      this.message = result.toString();
      this.loadPage();
    });
  }

  obrazacExcelPostupak(sifra: number): void {
    window.location.href = `${this.resourceUrlExcelDownload}/${sifra}`;
  }

  obrazacExcel(): void {
    window.location.href = `${this.resourceUrlExcelDownload}/${this.brojObrazac}`;
  }
}
