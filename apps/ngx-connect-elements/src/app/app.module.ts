import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SvgModule } from '@ngx-connect-elements/svg';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SvgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
