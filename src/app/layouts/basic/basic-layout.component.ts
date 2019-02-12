import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig, Layout } from '../../../types'; // todo: move specific types here

@Component({
    selector: 'layout-basic',
    template: require('./basic-layout.component.html')
})
export class BasicLayoutComponent implements Layout {
    @Input() formConfig: FormConfig;
    @Input() model: any;
    @Input() lookups: object;
    @Input() formGroup: FormGroup;
}
