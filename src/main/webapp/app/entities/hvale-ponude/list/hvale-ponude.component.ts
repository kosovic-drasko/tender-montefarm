import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IHvalePonude } from '../hvale-ponude.model';
import { HvalePonudeService } from '../service/hvale-ponude.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'jhi-hvale-ponude',
  templateUrl: './hvale-ponude.component.html',
  styleUrls: ['./hvale-ponude.component.scss'],
})
export class HvalePonudeComponent implements AfterViewInit, OnInit {
  hvalePonudes?: HttpResponse<IHvalePonude[]>;
  isLoading = false;
  ukupnaProcijenjena?: number;
  sifraPonude?: any;
  public displayedColumns = [
    'sifra postupka',
    'broj partije',
    'inn',
    'farmaceutski oblik',
    'pakovanje',
    'kolicina',
    'procijenjena vrijednost',
  ];

  public dataSource = new MatTableDataSource<IHvalePonude>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;
  constructor(protected hvaleService: HvalePonudeService, protected activatedRoute: ActivatedRoute, protected router: Router) {}

  public getSifraPostupka(): void {
    this.hvaleService.hvali(this.postupak).subscribe((res: HttpResponse<IHvalePonude[]>) => {
      this.dataSource.data = res.body ?? [];
      this.hvalePonudes = res;
      console.log('=========================================>', this.hvalePonudes);
      this.ukupnaProcijenjena = res.body?.reduce((acc, ponude) => acc + ponude.procijenjenaVrijednost!, 0);
    });
  }

  ngOnInit(): void {
    this.getSifraPostupka();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  nadjiPoSifriPonude(): void {
    this.isLoading = true;
    this.hvaleService
      .query({
        'sifraPonude.in': this.sifraPonude,
      })
      .subscribe({
        next: (res: HttpResponse<IHvalePonude[]>) => {
          this.isLoading = false;
          this.dataSource.data = res.body ?? [];
          this.ukupnaProcijenjena = res.body?.reduce((acc, ponude) => acc + ponude.procijenjenaVrijednost!, 0);
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
  sifraPonudeNull(): void {
    this.sifraPonude = null;
    this.sifraPonude = '';
    this.getSifraPostupka();
  }
}
