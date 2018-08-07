import { Component, Input } from "@angular/core";
import * as _ from 'lodash';

@Component({
  selector: 'dynamic-panel',
  template: require('./dynamic-panel.component.html'),
  styles: [require('./dynamic-panel.component.scss').toString()]
})

export class DynamicPanelComponent {
   @Input() public panelConfig;
   @Input() public group;
   @Input() public fieldsConfig;

   public getFieldConfig(fieldName) {
      let fieldObj =  _.find(this.fieldsConfig, {name: fieldName});
      if (!fieldObj) {
        throw new Error(`Can\'t find field name: ${fieldName}, please check config file!`);
      } else {
        return fieldObj;
      }
   }
}
