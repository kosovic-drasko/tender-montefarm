import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PostupciComponent } from './list/postupci.component';
import { PostupciDetailComponent } from './detail/postupci-detail.component';
import { PostupciUpdateComponent } from './update/postupci-update.component';
import { PostupciDeleteDialogComponent } from './delete/postupci-delete-dialog.component';
import { PostupciRoutingModule } from './route/postupci-routing.module';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [SharedModule, PostupciRoutingModule, MatSortModule],
  declarations: [PostupciComponent, PostupciDetailComponent, PostupciUpdateComponent, PostupciDeleteDialogComponent],
  entryComponents: [PostupciDeleteDialogComponent],
  exports: [PostupciComponent],
})
export class PostupciModule {}
