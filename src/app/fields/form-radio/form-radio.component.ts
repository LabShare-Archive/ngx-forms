import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';

@Component({
    selector: 'form-radio',
    template: require('./form-radio.component.html')
})

export class FormRadioComponent extends BaseFieldComponent { }
