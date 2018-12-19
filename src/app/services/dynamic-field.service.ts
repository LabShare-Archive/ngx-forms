import { Injectable, Type } from '@angular/core';

@Injectable()
export class DynamicFieldService {

    components = {};

    addField(name: string, component: any) {
        if (!name || !name.length) { throw new Error('Failed to add new component. Type is incorrent, Type value: ' + name); }
        if (!component) { throw new Error('Failed to add new component. Component is undefined'); }
        this.components[name] = component;
    }

    getField(name: string) {
        if (!this.components[name]) {
            const supportedTypes = Object.keys(this.components).join(', ');
            throw new Error(`Trying to use an unsupported field type "${name}". Supported types: ${supportedTypes}`);
        }
        return this.components[name];
    }
}
