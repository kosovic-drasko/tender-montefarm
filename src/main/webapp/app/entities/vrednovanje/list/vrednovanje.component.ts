import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IVrednovanje } from '../vrednovanje.model';
import { VrednovanjeService } from '../service/vrednovanje.service';

@Component({
  selector: 'jhi-vrednovanje',
  templateUrl: './vrednovanje.component.html',
})
export class VrednovanjeComponent implements OnInit {
  vrednovanjes?: IVrednovanje[];
  isLoading = false;

  constructor(protected vrednovanjeService: VrednovanjeService) {}

  loadAll(): void {
    this.isLoading = true;

    this.vrednovanjeService.query().subscribe({
      next: (res: HttpResponse<IVrednovanje[]>) => {
        this.isLoading = false;
        this.vrednovanjes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IVrednovanje): number {
    return item.id!;
  }
}
