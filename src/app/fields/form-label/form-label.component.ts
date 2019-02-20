import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';

@Component({
    selector: 'form-label',
    template: require('./form-label.component.html')
})
export class FormLabelComponent extends BaseFieldComponent { }