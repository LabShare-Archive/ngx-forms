import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig, Layout } from './types';

export class BaseLayout implements Layout {
    @Input() formConfig: FormConfig;
    @Input() model: any;
    @Input() group: FormGroup;
}
