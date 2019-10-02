import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxFormsModule } from 'projects/ngx-forms/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormDirective } from 'projects/ngx-forms/src/lib/dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxFormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
