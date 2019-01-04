import { FormGroup } from '@angular/forms';
import { IFieldConfig } from './types';

export interface ILookup {
    name: string; // Name of lookup from lookup payload
    extract?: string; // Extract one field from lookup item when lookup is an object
}

export interface IFieldConfig {
    disabled?: boolean;
    hidden?: boolean;
    label?: string;
    name: string;
    options?: any[] | any;
    placeholder?: string;
    type: string;
    value?: any;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    lookup?: string | ILookup; // Array of a lookup array inside lookup payload
    // lookups?: (string | ILookup)[]; // Array of a lookup array inside lookup payload
    settings?: any; // Free format object for storing custom form inputs settings
}

export interface Field {
    field: IFieldConfig;
    group: FormGroup;
}
