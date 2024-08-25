import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { FullmapComponent } from './fullmap.component';
import { FullmapRoutingModule } from './fullmap-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    FullmapRoutingModule,
    FormsModule,
    RouterModule
  ],
  declarations: [FullmapComponent],
})
export class FullmapModule {}
