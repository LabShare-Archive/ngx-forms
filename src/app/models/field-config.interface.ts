export interface IFieldConfig {
    disabled?: boolean;
    hidden?: boolean;
    label?: string;
    name: string;
    options?: any[];
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
    lookup?: string; // Name of a lookup array inside lookup payload
    extract?: string; // Extract one field from lookup item when lookup is an object
    settings?: object; // Free format object for storing custom form inputs settings
}
