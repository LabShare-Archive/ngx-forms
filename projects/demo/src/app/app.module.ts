import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxFormsModule } from 'projects/ngx-forms/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
