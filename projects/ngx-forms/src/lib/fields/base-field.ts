import { FormGroup } from '@angular/forms';
import { FieldConfig, Field } from '../types';

export class BaseFieldComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
    model?: any;
}
