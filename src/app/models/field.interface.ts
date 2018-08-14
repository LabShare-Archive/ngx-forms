import { FormGroup } from '@angular/forms';
import { FieldConfig } from './field-config.interface';

export interface Field {
  field: FieldConfig,
  group: FormGroup
}
