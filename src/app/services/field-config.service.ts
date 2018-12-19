import { Injectable } from '@angular/core';
import { IFieldConfig } from '../models/field-config.interface';

interface IFieldConfigDictionary {
    [email: string]: IFieldConfig;
}

@Injectable()
export class FieldConfigService {

    private fields: IFieldConfigDictionary = {};

    getField(fieldName: string): IFieldConfig {
        if (!this.fields.hasOwnProperty(fieldName)) {
            throw new Error(`Can\'t find field name: ${fieldName}, please check config file!`);
        }
        return this.fields[fieldName];
    }

    addFields(fields: IFieldConfig[]): void {
        fields.forEach(field => this.fields[field.name] = field);
    }

}
