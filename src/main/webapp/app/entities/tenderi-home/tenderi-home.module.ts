import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TenderiHomeComponent } from './list/tenderi-home.component';
import { TenderiHomeDetailComponent } from './detail/tenderi-home-detail.component';
import { TenderiHomeRoutingModule } from './route/tenderi-home-routing.module';
import { PostupciModule } from '../postupci/postupci.module';
import { PonudjaciModule } from '../ponudjaci/ponudjaci.module';

@NgModule({
  imports: [SharedModule, TenderiHomeRoutingModule, PostupciModule, PonudjaciModule],
  declarations: [TenderiHomeComponent, TenderiHomeDetailComponent],
})
export class TenderiHomeModule {}
