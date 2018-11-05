import { Injectable, Type } from '@angular/core';
import { Field } from '../models/field.interface';
import { FormComponentType } from '../models/enums';

@Injectable()
export class DynamicFieldService {

    components = {};
    types = {};

    addField(name: string, component: new (...args: any[]) => Field, type: FormComponentType = FormComponentType.Field) {
        if (!name || !name.length) throw new Error('Failed to add new component. Type is incorrent, Type value: ' + name);
        if (!component) throw new Error('Failed to add new component. Component is undefined');
        this.components[name] = component;
        this.types[name] = type;
    }

    getField(name: string) {
        if (!this.components[name]) {
            const supportedTypes = Object.keys(this.components).join(', ');
            throw new Error(
                `Trying to use an unsupported field type "${name}".
                  Supported types: ${supportedTypes}`
            );
        }
        return this.components[name];
    }

    getType(name: string) {
        return this.types[name];
    }

}
