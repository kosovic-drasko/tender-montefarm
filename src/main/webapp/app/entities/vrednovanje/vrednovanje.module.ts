import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VrednovanjeComponent } from './list/vrednovanje.component';
import { VrednovanjeDetailComponent } from './detail/vrednovanje-detail.component';
import { VrednovanjeRoutingModule } from './route/vrednovanje-routing.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [SharedModule, VrednovanjeRoutingModule, MatTableExporterModule, MatSortModule, MatSidenavModule],
  declarations: [VrednovanjeComponent, VrednovanjeDetailComponent],
  exports: [VrednovanjeComponent],
})
export class VrednovanjeModule {}
