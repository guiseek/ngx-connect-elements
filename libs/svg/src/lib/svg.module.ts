import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectService } from './services/connect.service';
import { ConnectPathDirective } from './directives/connect-path.directive';

@NgModule({
  imports: [CommonModule],
  providers: [
    ConnectService
  ],
  declarations: [ConnectPathDirective],
  exports: [ConnectPathDirective]
})
export class SvgModule {}
