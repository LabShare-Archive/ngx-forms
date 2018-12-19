import { Component, Input } from '@angular/core';
import { IFieldConfig } from '../../models/field-config.interface';
import { FieldConfigService } from '../../services/field-config.service';

@Component({
    selector: 'dynamic-panel',
    template: require('./dynamic-panel.component.html'),
    styles: [require('./dynamic-panel.component.scss').toString()]
})

export class DynamicPanelComponent {
    @Input() public panelConfig;
    @Input() public group;
    @Input() public model: any;

    constructor(private fcs: FieldConfigService) {
    }

    public getFieldConfig(fieldName: string): IFieldConfig {
        return this.fcs.getField(fieldName);
    }
}
