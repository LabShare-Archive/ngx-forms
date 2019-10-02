import { FormGroup } from '@angular/forms';
import { FieldConfig } from './types';

export interface FieldConfig {
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
    settings?: any; // Free format object for storing custom form inputs settings
    requiredTrue?: boolean;
}

export interface Field {
    field: FieldConfig;
    group: FormGroup;
    model?: Object;
}

export type Type<T> = new (...args: any[]) => T;

export interface FieldDictionary { [key: string]: Type<Field>; }

export interface LayoutDictionary { [key: string]: Type<Layout>; }

export const FIELD_DICT_TOKEN = 'FIELD_DICT_TOKEN';
export const LAYOUTS_TOKEN = 'LAYOUTS_TOKEN';

export interface Layout {
    group: FormGroup;
    formConfig: any;
    model: any;
}

export interface FormConfig {
    layout?: any;
    title?: string;
    fields?: FieldConfig[];
}

export interface FormsExtensions {
    fieldDictionary?: FieldDictionary;
    layoutDictionary?: LayoutDictionary;
}


