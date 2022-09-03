import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPostupci } from '../postupci.model';
import { PostupciService } from '../service/postupci.service';
import { PostupciDeleteDialogComponent } from '../delete/postupci-delete-dialog.component';
import dayjs from 'dayjs/esm';
import { PostupciUpdateComponent } from '../update/postupci-update.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'jhi-postupci',
  templateUrl: './postupci.component.html',
  styleUrls: ['./postupci.component.scss'],
})
export class PostupciComponent implements OnInit, AfterViewInit {
  postupcis?: HttpResponse<IPostupci[]>;
  isLoading = false;
  public displayedColumns = [
    'sifra postupka',
    'opis postupka',
    'vrsta postupka',
    'datum objave',
    'datum otvaranja',
    'broj tendera',
    'kriterijum cijena',
    'drugi kriterijum',
    'action',
  ];
  public dataSource = new MatTableDataSource<IPostupci>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    protected postupciService: PostupciService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  loadPage(): void {
    this.isLoading = true;
    this.postupciService.query().subscribe({
      next: (res: HttpResponse<IPostupci[]>) => {
        this.isLoading = false;
        this.dataSource.data = res.body ?? [];
        this.postupcis = res;
      },
      error: () => {
        this.isLoading = false;
        this.onError();
      },
    });
  }

  ngOnInit(): void {
    this.loadPage();
  }

  delete(postupci: IPostupci): void {
    const modalRef = this.modalService.open(PostupciDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.postupci = postupci;
    // unsubscribe not needed because closed completes on modal close
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
    brojTendera?: string | null,
    opisPostupka?: string,
    vrstaPostupka?: string,
    datumObjave?: dayjs.Dayjs | null,
    datumOtvaranja?: dayjs.Dayjs | null,
    kriterijumCijena?: number,
    drugiKriterijum?: number
  ): void {
    const modalRef = this.modalService.open(PostupciUpdateComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.sifraPostupka = sifraPostupka;
    modalRef.componentInstance.brojTendera = brojTendera;
    modalRef.componentInstance.opisPostupka = opisPostupka;
    modalRef.componentInstance.vrstaPostupka = vrstaPostupka;

    modalRef.componentInstance.datumObjave = datumObjave;
    modalRef.componentInstance.datumOtvaranja = datumOtvaranja;
    modalRef.componentInstance.kriterijumCijena = kriterijumCijena;
    modalRef.componentInstance.drugiKriterijum = drugiKriterijum;

    modalRef.closed.subscribe(() => {
      this.loadPage();
    });
  }

  add(): void {
    const modalRef = this.modalService.open(PostupciUpdateComponent, { size: 'lg', backdrop: 'static' });
    modalRef.closed.subscribe(() => {
      this.loadPage();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
