import { DynamicFieldService } from './dynamic-field.service';
import { FormControl, Validators } from '@angular/forms';

describe('DynamicFieldService', () => {
    let service: DynamicFieldService;
    let group = { hidden: false };

    beforeEach(() => {
        service = new DynamicFieldService();
    });

    it('should throw error when no name is provided', () => {
        expect(() => { service.addField(null, null) }).toThrowError("Failed to add new component. Type is incorrent, Type value: null")
    });

    it('should throw error when no component is provided', () => {
        expect(() => { service.addField('text', undefined) }).toThrowError("Failed to add new component. Component is undefined")
    });

});