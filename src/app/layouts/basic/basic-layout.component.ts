import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig } from '../../../types'; // todo: move specific types here

@Component({
    selector: 'layout-basic',
    template: require('./basic-layout.component.html')
})
export class BasicLayoutComponent {
    @Input() formConfig: FormConfig;
    @Input() model: any;
    @Input() lookups: object;
    @Input() form: FormGroup;
}
