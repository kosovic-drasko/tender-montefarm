import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPonudjaci } from '../ponudjaci.model';
import { PonudjaciService } from '../service/ponudjaci.service';
import { PonudjaciDeleteDialogComponent } from '../delete/ponudjaci-delete-dialog.component';
import { PonudjaciUpdateComponent } from '../update/ponudjaci-update.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'jhi-ponudjaci',
  templateUrl: './ponudjaci.component.html',
  styleUrls: ['./ponudjaci.scss'],
})
export class PonudjaciComponent implements OnInit, AfterViewInit {
  ponudjacis?: HttpResponse<IPonudjaci[]>;
  isLoading = false;
  public displayedColumns = ['id', 'naziv ponudjaca', 'odgovorno lice', 'adresa ponudjaca', 'banka racun', 'action'];

  public dataSource = new MatTableDataSource<IPonudjaci>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    protected ponudjaciService: PonudjaciService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  loadPage(): void {
    this.isLoading = true;
    this.ponudjaciService.query().subscribe({
      next: (res: HttpResponse<IPonudjaci[]>) => {
        this.isLoading = false;
        this.dataSource.data = res.body ?? [];
        this.ponudjacis = res;
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
  protected onError(): void {
    console.log('Greska');
  }
  delete(ponudjaci: IPonudjaci): void {
    const modalRef = this.modalService.open(PonudjaciDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ponudjaci = ponudjaci;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }
  update(
    id?: number,
    nazivPonudjaca?: string | null,
    odgovornoLice?: string | null,
    adresaPonudjaca?: string | null,
    bankaRacun?: string | null
  ): void {
    const modalRef = this.modalService.open(PonudjaciUpdateComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.nazivPonudjaca = nazivPonudjaca;
    modalRef.componentInstance.odgovornoLice = odgovornoLice;
    modalRef.componentInstance.adresaPonudjaca = adresaPonudjaca;
    modalRef.componentInstance.bankaRacun = bankaRacun;

    modalRef.closed.subscribe(() => {
      this.loadPage();
    });
  }
  add(): void {
    const modalRef = this.modalService.open(PonudjaciUpdateComponent, { size: 'lg', backdrop: 'static' });
    modalRef.closed.subscribe(() => {
      this.loadPage();
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
