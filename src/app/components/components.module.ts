import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, TranslateModule],
  exports: [MapComponent],
})
export class ComponentsModule {}
