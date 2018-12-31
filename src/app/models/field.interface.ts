import { FormGroup } from '@angular/forms';
import { IFieldConfig } from './field-config.interface';

export interface Field {
  field: IFieldConfig;
  group: FormGroup;
}
