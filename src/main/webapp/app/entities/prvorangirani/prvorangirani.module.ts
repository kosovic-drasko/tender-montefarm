import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PrvorangiraniComponent } from './list/prvorangirani.component';
import { PrvorangiraniDetailComponent } from './detail/prvorangirani-detail.component';
import { PrvorangiraniRoutingModule } from './route/prvorangirani-routing.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [SharedModule, PrvorangiraniRoutingModule, MatTableExporterModule, MatSortModule],
  declarations: [PrvorangiraniComponent, PrvorangiraniDetailComponent],
  exports: [PrvorangiraniComponent],
})
export class PrvorangiraniModule {}
