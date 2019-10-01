import { Component, ViewChild } from '@angular/core';
import { DynamicFormDirective } from 'ngx-forms/lib/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  @ViewChild('form', { static: false }) public form: DynamicFormDirective;

  public config = {
    layout: 'basic',
    fields: [
      { type: 'text', label: 'Title', name: 'title' },
      { type: 'text', label: 'Project Name', name: 'projectName', placeholder: 'Enter project name', minLength: 2, maxLength: 5 },
    ]
  };
}
