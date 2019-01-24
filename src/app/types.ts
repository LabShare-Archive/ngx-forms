import { FormGroup } from '@angular/forms';
import { FieldConfig } from './types';
import { InjectionToken } from '@angular/core';

export interface ILookup {
    name: string; // Name of lookup from lookup payload
    extract?: string; // Extract one field from lookup item when lookup is an object
}

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
    lookup?: string | ILookup; // Array of a lookup array inside lookup payload
    // lookups?: (string | ILookup)[]; // Array of a lookup array inside lookup payload
    settings?: any; // Free format object for storing custom form inputs settings
}

export interface Field {
    field: FieldConfig;
    group: FormGroup;
    model?: Object;
}

export type Type<T> = new (...args: any[]) => T;

export interface FieldDictionary { [key: string]: Type<Field>; }

export const FIELD_DICT_TOKEN = new InjectionToken<FieldDictionary>('fields');

export const enum ConditionType {
    And = 'and',
    Or = 'or'
}

export interface FormConfig {
    form: PanelGroup[];
}

export interface ConditionRule {
    field: string;
    equals: any[] | any;
}

export interface EnableWhenConfig {
    type?: ConditionType;
    rules: ConditionRule[];
}

export interface PanelConfig {
    label?: string;
    fields?: FieldConfig[];
    enableWhen?: any;
}

export interface PanelGroup {
    label?: string;
    fields?: FieldConfig[];
    panels?: PanelConfig[];
    enableWhen?: EnableWhenConfig;
}
