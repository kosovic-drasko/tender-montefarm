import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPonude } from '../ponude.model';
import { PonudeService } from '../service/ponude.service';
import { PonudeDeleteDialogComponent } from '../delete/ponude-delete-dialog.component';
import { PonudeUpdateComponent } from '../update/ponude-update.component';
import { IPonudjaci } from '../../ponudjaci/ponudjaci.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'jhi-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.scss'],
})
export class PonudeComponent implements AfterViewInit, OnInit {
  ponudjaci?: IPonudjaci[] = [];
  ponudes?: HttpResponse<IPonude[]>;
  ponudjaciPostupak?: any;
  brPonude?: null;
  isLoading = false;
  ukupno?: number;
  brojObrazac?: number = 0;

  public displayedColumns = [
    'sifra postupka',
    'sifraPonude',
    'brojPartije',
    'naziv proizvodjaca',
    'ponudjac',
    'zasticeni naziv',
    'ponudjena vrijednost',
    'sifra ponudjaca',
    'jedinicna cijena',
    'rok isporuke',
    'selected',
    'action',
  ];
  public dataSource = new MatTableDataSource<IPonude>();
  @ViewChild('fileInput') fileInput: any;
  @Input() postupak: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  resourceUrlExcelDownloadPostupak = SERVER_API_URL + 'api/ponude/file/';

  constructor(
    protected ponudeService: PonudeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadPage(): void {
    this.isLoading = true;
    this.ponudeService.query().subscribe({
      next: (res: HttpResponse<IPonude[]>) => {
        this.isLoading = false;
        this.dataSource.data = res.body ?? [];
        this.ponudes = res;
        this.ukupno = res.body?.reduce((acc, ponude) => acc + ponude.ponudjenaVrijednost!, 0);
      },
      error: () => {
        this.isLoading = false;
        this.onError();
      },
    });
  }

  loadPageSifra(): void {
    this.isLoading = true;
    this.ponudeService
      .query({
        'sifraPostupka.in': this.postupak,
      })
      .subscribe({
        next: (res: HttpResponse<IPonude[]>) => {
          this.isLoading = false;
          this.dataSource.data = res.body ?? [];
          this.ponudes = res;
          this.ukupno = res.body?.reduce((acc, ponude) => acc + ponude.ponudjenaVrijednost!, 0);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  loadPageSifraPonude(): void {
    this.isLoading = true;
    this.ponudeService
      .query({
        'sifraPonude.in': this.brPonude,
      })
      .subscribe({
        next: (res: HttpResponse<IPonude[]>) => {
          this.isLoading = false;
          this.dataSource.data = res.body ?? [];
          this.ponudes = res;
          this.ukupno = res.body?.reduce((acc, ponudes) => acc + ponudes.ponudjenaVrijednost!, 0);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  loadSifraPonudesifraPostupka(): void {
    this.isLoading = true;
    this.ponudeService
      .query({
        'sifraPostupka.in': this.postupak,
        'sifraPonude.in': this.brPonude,
      })
      .subscribe({
        next: (res: HttpResponse<IPonude[]>) => {
          this.isLoading = false;
          this.dataSource.data = res.body ?? [];
          this.ponudes = res;
          this.ukupno = res.body?.reduce((acc, ponudes) => acc + ponudes.ponudjenaVrijednost!, 0);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  loadPonudePonudjaci(sifraPostupka: number): void {
    this.ponudeService.ponudePonudjaci(sifraPostupka).subscribe({
      next: res => {
        this.ponudjaciPostupak = res;
      },
    });
  }

  ponisti(): void {
    if (this.postupak !== undefined) {
      this.brPonude = null;
      this.loadPageSifra();
      console.log(this.postupak);
    } else {
      this.brPonude = null;
      this.loadPage();
    }
  }

  nadji(): void {
    if (this.postupak !== undefined) {
      this.loadSifraPonudesifraPostupka();
    } else {
      this.loadPageSifraPonude();
    }
  }

  ngOnInit(): void {
    if (this.postupak !== undefined) {
      this.loadPonudePonudjaci(this.postupak);
      this.loadPageSifra();
    } else {
      this.loadPage();
    }
  }

  delete(ponude: IPonude): void {
    const modalRef = this.modalService.open(PonudeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ponude = ponude;
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
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
      if (this.postupak !== undefined) {
        this.loadPageSifra();
      } else {
        this.loadPage();
      }
    });
  }

  add(): void {
    const modalRef = this.modalService.open(PonudeUpdateComponent, { size: 'lg', backdrop: 'static' });
    modalRef.closed.subscribe(() => {
      this.loadPage();
    });
  }
  obrazacExcel(): void {
    window.location.href = `${this.resourceUrlExcelDownloadPostupak}/${this.brojObrazac}`;
  }
  uploadFile(): any {
    const formData = new FormData();
    formData.append('files', this.fileInput.nativeElement.files[0]);
    this.ponudeService.UploadExcel(formData).subscribe(() => {
      this.loadPage();
    });
  }

  obrazacExcelPostupak(): void {
    window.location.href = `${this.resourceUrlExcelDownloadPostupak}/${this.postupak}`;
  }

  protected onError(): void {
    console.log('Greska');
  }
}
