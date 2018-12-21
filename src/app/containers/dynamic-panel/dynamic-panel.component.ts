import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { IFieldConfig } from '../../models/field-config.interface';
import { FieldConfigService } from '../../services/field-config.service';
import {FormNavService} from '../../../nav/services/form-nav.service';
import {Constants} from '../../models/enums';

@Component({
    selector: 'dynamic-panel',
    template: require('./dynamic-panel.component.html'),
    styles: [require('./dynamic-panel.component.scss').toString()]
})

export class DynamicPanelComponent implements OnInit {
    @Input() public panelConfig;
    @Input() public group;
    @Input() public model: any;
    private isValid: boolean;
    private selectionArray: any;

    constructor(private fcs: FieldConfigService, private navigationService: FormNavService) {
    }

    public getFieldConfig(fieldName: string): IFieldConfig {
        return this.fcs.getField(fieldName);
    }

  ngOnInit(): void {
    this.getValidArrays();
    this.onChanges();

  }

  private getValidArrays() {
    this.selectionArray = this.navigationService.createStatusKeyArray(this.group);
  }

  onChanges(): void {
      this.group.valueChanges.subscribe( () => {
        this.getValidArrays();
        if (this.navigationService.isSubSet(this.panelConfig.fields, this.selectionArray)) {
          this.panelConfig.isValid = true;
        } else {
          this.panelConfig.isValid = false;
        }
    });
  }
}
