import {
    Injectable,
    Inject
} from '@angular/core';

@Injectable()
export class DynamicFieldService {

    components = {};

    addField(type, component) {
        if (!type || !type.length) throw new Error('Failed to add new component. Type is incorrent, Type value: ' + type);
        if (!component) throw new Error('Failed to add new component. Component is undefined');
        this.components[type] = component;
    }

    getField(type) {
        if (!this.components[type]) {
            const supportedTypes = Object.keys(this.components).join(', ');
            throw new Error(
                `Trying to use an unsupported field type "${type}".
                  Supported types: ${supportedTypes}`
            );
        }
        return this.components[type];
    }

}
