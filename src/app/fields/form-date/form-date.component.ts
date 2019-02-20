import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';

@Component({
    selector: 'form-date',
    template: require('./form-date.component.html')
})
export class FormDateComponent extends BaseFieldComponent {}