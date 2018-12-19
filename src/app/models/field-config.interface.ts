import { FormComponentType } from './enums';

export interface IFieldConfig {
    disabled?: boolean;
    hidden?: boolean;
    label?: string;
    name: string;
    options?: any[];
    settings?: any;
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
    nullValidator?: any;
    provider?: string;
    providerMethod?: string;
    lookup?: string; // Name of a lookup array inside lookup payload
    extract?: string; // Extract one field from lookup item when lookup is an object
}
