import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';

@Component({
    selector: 'form-json',
    template: require('./form-json.component.html')
})

export class FormJsonComponent extends BaseFieldComponent { }
