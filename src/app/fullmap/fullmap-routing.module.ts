import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { FullmapComponent } from './fullmap.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'map',
      component: FullmapComponent,
      data: { title: marker('Map') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class FullmapRoutingModule {}
