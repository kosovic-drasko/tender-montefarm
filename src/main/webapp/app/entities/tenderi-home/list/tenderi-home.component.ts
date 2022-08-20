import { Component, OnInit } from '@angular/core';
import { ITenderiHome } from '../tenderi-home.model';
import { TenderiHomeService } from '../service/tenderi-home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-tenderi-home',
  templateUrl: './tenderi-home.component.html',
})
export class TenderiHomeComponent implements OnInit {
  tenderiHomes?: ITenderiHome[];
  isLoading = false;
  parameterValue?: number;
  constructor(protected tenderiHomeService: TenderiHomeService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parameter => {
      this.parameterValue = parameter.id;
    });
  }
}
