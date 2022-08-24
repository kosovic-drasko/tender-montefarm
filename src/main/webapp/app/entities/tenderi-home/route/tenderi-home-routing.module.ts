import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TenderiHomeComponent } from '../list/tenderi-home.component';
import { TenderiHomeDetailComponent } from '../detail/tenderi-home-detail.component';
import { TenderiHomeRoutingResolveService } from './tenderi-home-routing-resolve.service';
import { PonudeComponent } from '../../ponude/list/ponude.component';
import { SpecifikacijeComponent } from '../../specifikacije/list/specifikacije.component';

const tenderiHomeRoute: Routes = [
  {
    path: '',
    component: TenderiHomeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
    children: [
      {
        path: 'ponude',
        component: PonudeComponent,
      },
      {
        path: 'specifikacije',
        component: SpecifikacijeComponent,
      },
    ],
  },
  {
    path: ':id',
    component: TenderiHomeComponent,
    data: {
      title: 'Settings',
    },
  },
  {
    path: ':id/view',
    component: TenderiHomeDetailComponent,
    resolve: {
      tenderiHome: TenderiHomeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tenderiHomeRoute)],
  exports: [RouterModule],
})
export class TenderiHomeRoutingModule {}
