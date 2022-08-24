import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TenderiHomeComponent } from './list/tenderi-home.component';
import { TenderiHomeDetailComponent } from './detail/tenderi-home-detail.component';
import { TenderiHomeRoutingModule } from './route/tenderi-home-routing.module';
import { PonudeModule } from '../ponude/ponude.module';
import { SpecifikacijeModule } from '../specifikacije/specifikacije.module';
import { VrednovanjeModule } from '../vrednovanje/vrednovanje.module';
import { PrvorangiraniModule } from '../prvorangirani/prvorangirani.module';
import { HvalePonudeModule } from '../hvale-ponude/hvale-ponude.module';

@NgModule({
  imports: [
    SharedModule,
    TenderiHomeRoutingModule,
    PonudeModule,
    SpecifikacijeModule,
    VrednovanjeModule,
    PrvorangiraniModule,
    HvalePonudeModule,
  ],
  declarations: [TenderiHomeComponent, TenderiHomeDetailComponent],
})
export class TenderiHomeModule {}
